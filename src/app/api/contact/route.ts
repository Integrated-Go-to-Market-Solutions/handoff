import { NextResponse } from "next/server";

/**
 * Lead intake.
 *
 * Every submission goes to the "Website contact form" in Handoff's HubSpot
 * (11/14), so a lead is kept whether or not they go on to book the Cal.com
 * call. It uses HubSpot's form submission API, which needs only the portal ID
 * and the form's ID (HUBSPOT_PORTAL_ID and HUBSPOT_FORM_ID in Vercel), not a
 * private token. The contact properties it fills are listed in HUBSPOT_FIELDS.
 *
 * The lead is also written to the server log. If HubSpot isn't set up yet or
 * rejects the submission, the visitor still sees the booking step and the
 * log line is marked so it can be found.
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

  const lead = {
    role: body.role === "Other" ? text(body.roleOther) : text(body.role),
    headcount: text(body.headcount),
    timeline: text(body.timeline),
    name: text(body.name),
    email: text(body.email),
    company: text(body.company),
    message: text(body.message, 2000),
    referral: text(body.referral),
  };

  const hubspot = await sendToHubSpot(lead, request);
  console.log(`[handoff] new lead (hubspot: ${hubspot})`, { ...lead, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}

type Lead = { role: string; headcount: string; timeline: string; name: string; email: string; company: string; message: string; referral: string };

/** HubSpot contact property for each answer. The custom ones are created in HubSpot first. */
const HUBSPOT_FIELDS = (lead: Lead) => {
  const [firstname, ...rest] = lead.name.split(/\s+/);
  return {
    firstname,
    lastname: rest.join(" "),
    email: lead.email,
    company: lead.company,
    hiring_role: lead.role,
    hiring_headcount: lead.headcount,
    hiring_timeline: lead.timeline,
    referred_by: lead.referral,
    message: lead.message,
  };
};

/** Returns "sent", "not set up" or "failed <status>" for the log line. */
async function sendToHubSpot(lead: Lead, request: Request): Promise<string> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;
  if (!portalId || !formId) return "not set up";

  const fields = Object.entries(HUBSPOT_FIELDS(lead))
    .filter(([, value]) => value)
    .map(([name, value]) => ({ objectTypeId: "0-1", name, value }));
  // HubSpot's visitor cookie, when its tracking code is running and the
  // visitor accepted cookies, ties the submission to their page views.
  const hutk = request.headers.get("cookie")?.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];
  const pageUri = request.headers.get("referer") || undefined;

  try {
    const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: Date.now(),
        fields,
        context: { ...(hutk && { hutk }), ...(pageUri && { pageUri }), pageName: "Book a call" },
      }),
    });
    if (res.ok) return "sent";
    console.error("[handoff] hubspot rejected the lead", res.status, await res.text());
    return `failed ${res.status}`;
  } catch (error) {
    console.error("[handoff] hubspot unreachable", error);
    return "failed network";
  }
}
