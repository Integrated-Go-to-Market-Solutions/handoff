import { spawn } from "node:child_process";
import fs from "node:fs";

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || match[1].startsWith("#")) continue;
    if (process.env[match[1]] !== undefined) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

loadEnv(".env");
loadEnv(".env.local");

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;
const real = Boolean(clientId && token && clientId !== "local" && token !== "local");

if (!real) {
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||= "local";
  process.env.TINA_TOKEN ||= "local";
}

const args = real
  ? ["tinacms", "build", "-c", "next build"]
  : ["tinacms", "build", "--content=local", "--skip-cloud-checks", "-c", "next build"];

// Watchdog (10/16): Tina's "Indexing local files" step sometimes hangs
// forever. It normally takes seconds, but one Vercel preview sat there until
// the 45-minute build limit. If Tina hasn't handed off to `next build` within
// the time limit, stop it and start again, up to MAX_ATTEMPTS. Once Next.js is
// running, the watchdog never interferes.
const LIMIT_MINUTES = Number(process.env.TINA_BUILD_TIMEOUT_MINUTES) || 8;
const MAX_ATTEMPTS = 3;
const HANDOFF_MARKER = "Running web application with command";

let current = null;

function stopGroup(child) {
  try {
    process.kill(-child.pid, "SIGKILL");
  } catch {
    child.kill("SIGKILL");
  }
}

function attempt(n) {
  // Keep argv intact. shell:true concatenates arguments, so "next build" becomes two tokens and Tina rejects the command.
  // detached puts Tina and the processes it starts in their own group, so a
  // stuck attempt can be stopped as a whole.
  const child = spawn("npx", args, { stdio: ["inherit", "pipe", "pipe"], env: process.env, detached: true });
  current = child;
  let handedOff = false;
  let timedOut = false;

  const watch = (stream, out) =>
    stream.on("data", (chunk) => {
      out.write(chunk);
      if (!handedOff && chunk.toString().includes(HANDOFF_MARKER)) {
        handedOff = true;
        clearTimeout(timer);
      }
    });
  watch(child.stdout, process.stdout);
  watch(child.stderr, process.stderr);

  const timer = setTimeout(() => {
    timedOut = true;
    console.error(`\nTina did not finish within ${LIMIT_MINUTES} minutes (attempt ${n} of ${MAX_ATTEMPTS}). Stopping it.`);
    stopGroup(child);
  }, LIMIT_MINUTES * 60_000);

  child.on("exit", (code) => {
    clearTimeout(timer);
    if (timedOut && n < MAX_ATTEMPTS) {
      console.error(`Retrying the Tina build (attempt ${n + 1} of ${MAX_ATTEMPTS}).\n`);
      attempt(n + 1);
      return;
    }
    if (timedOut) {
      console.error(`Tina hung on all ${MAX_ATTEMPTS} attempts. Failing the build instead of waiting for the platform limit.`);
      process.exit(1);
    }
    process.exit(code ?? 1);
  });
}

// Stop the whole group if the build itself is cancelled.
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => {
    if (current) stopGroup(current);
    process.exit(1);
  });

attempt(1);
