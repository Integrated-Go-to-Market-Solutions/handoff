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

// Keep argv intact. shell:true concatenates arguments, so "next build" becomes two tokens and Tina rejects the command.
const child = spawn("npx", args, { stdio: "inherit", env: process.env });
child.on("exit", (code) => process.exit(code ?? 1));
