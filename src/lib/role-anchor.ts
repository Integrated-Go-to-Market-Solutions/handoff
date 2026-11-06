/**
 * The id of a role's card on its department page, so the Roles menu can link
 * straight to it: "Automation/Prompt Engineer" -> "automation-prompt-engineer".
 */
export function roleAnchor(role: string) {
  return role
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
