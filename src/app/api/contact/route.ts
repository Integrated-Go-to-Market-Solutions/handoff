import { NextResponse } from "next/server";

/**
 * Lead intake.
 *
 * TODO (blocked on credentials): forward to HubSpot once Nicole has the API
 * key and portal ID. The 8/6 call named HubSpot as the CRM and Ashby as the
 * ATS. Until then this validates, logs server-side and returns success so the
 * form is fully wired and testable.
 *
 * When wiring HubSpot, add HUBSPOT_TOKEN to the Vercel project env and POST to
 * the Forms or CRM Objects API here. Do not put the token in client code.
 */

/** The two-step form (Change 12): the role first, then contact details. */
type Payload = {
  role?: string;
  roleOther?: string; // only when role is "Other"
  headcount?: string;
  timeline?: string;
  name?: string;
  email?: string;
  company?: string;
  message?: string; // optional
  referral?: string; // optional
  fax?: string; // honeypot
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
const text = (value: unknown, max = 200) => String(value ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend it worked so bots don't learn anything.
  if (body.fax) {
    return NextResponse.json({ ok: true });
  }

  const required: (keyof Payload)[] = ["role", "headcount", "timeline", "name", "email", "company"];
  if (body.role === "Other") required.push("roleOther");
  const missing = required.filter((key) => !text(body[key]));

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Please fill in every required field.", missing },
      { status: 400 },
    );
  }

  if (!isEmail(text(body.email))) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 },
    );
  }

  console.log("[handoff] new lead", {
    role: text(body.role),
    roleOther: body.role === "Other" ? text(body.roleOther) : null,
    headcount: text(body.headcount),
    timeline: text(body.timeline),
    name: text(body.name),
    email: text(body.email),
    company: text(body.company),
    message: text(body.message, 2000) || null,
    referral: text(body.referral) || null,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
