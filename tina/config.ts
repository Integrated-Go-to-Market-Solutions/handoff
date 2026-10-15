import { defineConfig, type Collection, type TinaField } from "tinacms";
import { bool, iconField, img, link, named, num, slugify, str, strings } from "./fields";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

function singleton(
  name: string,
  label: string,
  folder: string,
  route: string,
  fields: TinaField[],
): Collection {
  return {
    name,
    label,
    path: `content/${folder}`,
    format: "json",
    ui: {
      global: true,
      allowedActions: { create: false, delete: false },
      router: () => route,
    },
    fields,
  };
}

function lockedFiles(from: string) {
  return {
    readonly: true,
    slugify: (values: Record<string, string> | undefined) => slugify(values?.[from] || "page"),
  };
}

const pair = (before: string, accent: string): TinaField => ({
  type: "object",
  name: "headlineParts",
  label: "Headline",
  description: "Split so one word can be the colored word.",
  fields: [
    str("before", before, "The words that come before the colored word."),
    str("accent", accent, "The word or phrase shown in the brand color."),
  ],
});

const button = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [str("label", "Button label"), link()],
});

const video = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    img("src", "Video file", "The video visitors play."),
    img("poster", "Still image", "The picture shown before the video plays."),
  ],
});

const stat = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  list: true,
  ui: named("label"),
  fields: [str("value", "Number"), str("label", "Caption")],
});

const site = singleton("site", "Site", "site", "/", [
  str("name", "Site name"),
  str("tagline", "Tagline"),
  link("bookCall", "Main booking page"),
  link("bookingUrl", "Book a call link", ),
  // Shown after the contact form is sent, so the visitor can book straight away (10/15).
  link("discoveryCallUrl", "Discovery call booking page (Cal.com)"),
  link("seeTalent", "Roles page"),
  {
    type: "object",
    name: "seo",
    label: "Search result",
    description: "The title and description search engines and link previews use.",
    fields: [
      str("title", "Page title"),
      str("description", "Description", "One or two sentences about the company."),
    ],
  },
  {
    type: "object",
    name: "header",
    label: "Header buttons",
    fields: [
      str("hireLabel", "Hire button"),
      link("hireHref", "Hire button link"),
      str("joinLabel", "Join button"),
      link("joinHref", "Join button link"),
    ],
  },
  {
    type: "object",
    name: "mobileCta",
    label: "Phone button",
    fields: [str("label", "Button label", "The bar pinned to the bottom of the screen on a phone.")],
  },
  {
    type: "object",
    name: "footer",
    label: "Footer",
    fields: [
      str("talkLabel", "Talk button"),
      str("emailLabel", "Email label"),
      str("email", "Email address"),
      str("legal", "Copyright line", "Shown after the year and the site name."),
      {
        type: "object",
        name: "company",
        label: "Company links",
        list: true,
        ui: named("label"),
        fields: [str("label", "Label"), link()],
      },
    ],
  },
  str("marqueeCaption", "Logo caption", "The line above the row of client logos."),
  {
    type: "object",
    name: "navLabels",
    label: "Menu labels",
    fields: [
      str("howItWorks", "How it works"),
      str("industries", "Industries"),
      str("allIndustries", "All industries"),
      str("roles", "Roles"),
      str("allRoles", "All roles"),
      str("services", "Services"),
      str("compare", "Compare the two"),
      str("resources", "Resources"),
      str("about", "About"),
      str("soon", "Soon badge", "Shown next to menu items that are not live yet."),
    ],
  },
  {
    type: "object",
    name: "resources",
    label: "Resources menu",
    list: true,
    ui: named("label"),
    fields: [str("label", "Label"), link(), bool("soon", "Not live yet", "Shows a Soon badge instead of a link.")],
  },
  {
    type: "object",
    name: "socialLinks",
    label: "Social links",
    list: true,
    ui: named("label"),
    fields: [
      str("label", "Name"),
      {
        type: "string",
        name: "platform",
        label: "Network",
        description: "Picks the icon.",
        options: [
          { label: "YouTube", value: "youtube" },
          { label: "LinkedIn", value: "linkedin" },
          { label: "Instagram", value: "instagram" },
        ],
      },
      str("href", "Address", "The full https link."),
    ],
  },
  {
    type: "object",
    name: "cta",
    label: "Closing call to action",
    fields: [
      str("headline", "Headline"),
      pair("Words before the colored word", "Colored word"),
      str("closing", "Line under the headline", "Optional. Leave blank to show only the headline."),
      str("book", "Button"),
      str("body", "Paragraph"),
      button("primary", "Primary button"),
      button("secondary", "Secondary button"),
    ],
  },
]);

const home = singleton("home", "Homepage", "home", "/", [
  {
    type: "object",
    name: "hero",
    label: "Hero",
    fields: [
      str("eyebrow", "Small label"),
      {
        type: "object",
        name: "headlineLead",
        label: "First line",
        fields: [
          str("before", "Words before the colored word"),
          str("accent", "Colored word"),
        ],
      },
      {
        type: "object",
        name: "headlineLines",
        label: "Headline lines",
        list: true,
        ui: named("text"),
        description: "One entry per line. The first line is replaced on the page by First line above.",
        fields: [
          str("text", "Line"),
          {
            type: "string",
            name: "tone",
            label: "Color",
            description: "Leave blank for white. Cyan colors that line.",
            options: [
              { label: "White", value: "" },
              { label: "Cyan", value: "cyan" },
            ],
          },
        ],
      },
      img("image", "Background photo"),
      str("imageAlt", "Photo description", "Read aloud to someone who cannot see the photo."),
      str("body", "Paragraph"),
      button("primary", "Button"),
      button("secondary", "Second button"),
      str("note", "Line under buttons", "Shown under the main buttons across the site."),
    ],
  },
  {
    type: "object",
    name: "whyLatam",
    label: "Why LATAM",
    fields: [
      str("headline", "Headline"),
      str("subhead", "Subhead"),
      {
        type: "object",
        name: "categories",
        label: "Reasons",
        list: true,
        ui: named("title"),
        fields: [str("title", "Title"), str("tagline", "Tagline"), iconField(), strings("bullets", "Points")],
      },
    ],
  },
  {
    type: "object",
    name: "industriesStrip",
    label: "Industries intro",
    fields: [str("headline", "Headline"), str("body", "Paragraph")],
  },
  stat("credibilityStats", "Proof numbers"),
  {
    type: "object",
    name: "talentMap",
    label: "Talent map",
    fields: [
      {
        type: "object",
        name: "heading",
        label: "Heading",
        fields: [str("before", "Words before the link"), str("link", "Linked word")],
      },
      str("intro", "Introduction"),
      button("cta", "Button"),
      str("salaryLabel", "Salary label"),
      {
        type: "object",
        name: "profiles",
        label: "People on the map",
        list: true,
        ui: {
          ...named("name"),
          validate: (value: unknown) => {
            if (!Array.isArray(value) || value.length !== 8) {
              return "The map has 8 pins. Keep exactly 8 people, in pin order from top to bottom.";
            }
          },
        },
        description: "Person 1 is the top pin. Do not add or remove people; the pins are drawn in the design.",
        fields: [
          str("name", "Name"),
          str("city", "City"),
          str("country", "Country"),
          str("role", "Role"),
          str("department", "Department", "The department page name, like marketing. This is where the pin links."),
          str("salary", "Salary"),
          img("photo", "Photo"),
        ],
      },
    ],
  },
  {
    type: "object",
    name: "logos",
    label: "Client logos",
    list: true,
    ui: named("name"),
    fields: [
      str("slug", "Short name", "Used to match a logo on an industry page. Use lowercase words with dashes, like united-corporate-housing."),
      str("name", "Company"),
      img("image", "Logo"),
      bool("hasImage", "Show the image", "Turn off to show the company name as text until a logo file exists."),
      bool("stacked", "Tall logo", "Turn on when the logo stacks an icon above the name."),
    ],
  },
  {
    type: "object",
    name: "aiTrained",
    label: "Handoff Academy",
    fields: [
      str("eyebrow", "Small label"),
      {
        type: "object",
        name: "headline",
        label: "Headline",
        fields: [str("before", "Words before the highlight"), str("highlight", "Highlighted words")],
      },
      str("subhead", "Paragraph"),
      str("subheadBold", "Bold line"),
      str("toolsLabel", "Tools label"),
      {
        type: "object",
        name: "tools",
        label: "Tools",
        list: true,
        ui: named("name"),
        fields: [
          str("name", "Name"),
          img("icon", "Icon"),
          bool("mono", "Single-color icon", "Turn on for a white icon that should show as black."),
        ],
      },
      {
        type: "object",
        name: "tracks",
        label: "Courses",
        list: true,
        ui: named("title"),
        fields: [
          str("id", "Id", "A short name for this course. Do not change it after the page is live."),
          str("kicker", "Tab label"),
          str("title", "Title"),
          {
            type: "object",
            name: "details",
            label: "Details",
            fields: [
              str("hours", "Hours"),
              {
                type: "object",
                name: "facts",
                label: "Facts",
                list: true,
                ui: named("label"),
                fields: [str("label", "Label"), str("value", "Value")],
              },
              str("learnLabel", "Learn heading"),
              {
                type: "object",
                name: "learn",
                label: "What they learn",
                list: true,
                ui: named("lead"),
                fields: [str("lead", "Bold start"), str("rest", "Rest of the line")],
              },
              str("buildLabel", "Build heading"),
              strings("build", "What they build"),
            ],
          },
        ],
      },
      str("comingSoon", "Empty course line"),
    ],
  },
  {
    type: "object",
    name: "vibes",
    label: "Team videos",
    fields: [
      str("headline", "Words before the colored phrase"),
      str("headlineAccent", "Colored phrase"),
      str("headlineAfter", "Words after"),
      str("body", "Paragraph"),
      {
        type: "object",
        name: "clips",
        label: "Clips",
        list: true,
        ui: named("name"),
        fields: [
          str("slug", "Short name"),
          str("name", "Name"),
          str("caption", "Caption"),
          img("video", "Video"),
          img("poster", "Still image"),
        ],
      },
    ],
  },
  {
    type: "object",
    name: "soul",
    label: "Alma",
    fields: [
      {
        type: "object",
        name: "dictionary",
        label: "Dictionary entry",
        fields: [
          str("intro", "Lead-in"),
          str("headword", "Headword"),
          str("pronunciation", "Pronunciation"),
          str("partOfSpeech", "Part of speech"),
          str("definition", "Definition"),
        ],
      },
      video("cultureVideo", "Background video"),
      {
        type: "object",
        name: "closerParts",
        label: "Alternate Alma line",
        description: "Used only if the dictionary treatment is turned off in the design.",
        fields: [
          str("before", "Words before"),
          str("accent", "Colored word"),
          str("after", "Words after"),
          strings("sub", "Smaller lines"),
        ],
      },
    ],
  },
]);

const hiring = singleton("hiring", "Hiring process", "hiring", "/how-it-works", [
  str("pageTitle", "Page title", "The browser title for How it works."),
  str("pageDescription", "Page description"),
  {
    type: "object",
    name: "titleParts",
    label: "Section title",
    fields: [
      str("before", "Words before the swipe"),
      str("swipe", "Swipe word"),
      str("after", "Words after"),
    ],
  },
  str("body", "Introduction"),
  {
    type: "object",
    name: "steps",
    label: "Steps",
    list: true,
    ui: named("title"),
    fields: [
      str("n", "Number", "Shown as 01, 02, and so on."),
      str("title", "Title"),
      str("body", "Paragraph"),
      str("bulletsLead", "List lead-in", "Leave blank if this step has no list."),
      strings("bullets", "Checklist"),
      str("after", "Line after the list"),
    ],
  },
  {
    type: "object",
    name: "closer",
    label: "Homepage close",
    fields: [str("line", "Paragraph"), str("cta", "Button")],
  },
  {
    type: "object",
    name: "pageCloser",
    label: "How it works close",
    fields: [str("headline", "Headline"), str("line", "Paragraph"), str("cta", "Button")],
  },
  str("teaserCta", "See every step"),
  link("teaserHref", "See every step link"),
  {
    type: "object",
    name: "timeline",
    label: "Timeline",
    fields: [
      strings("labels", "Step labels"),
      {
        type: "object",
        name: "cta",
        label: "Timeline button",
        fields: [str("label", "Button"), num("step", "Which step", "0 is the first step.")],
      },
      {
        type: "object",
        name: "videos",
        label: "Step videos",
        list: true,
        ui: named("src"),
        fields: [
          img("src", "Video"),
          img("poster", "Still image"),
          str("focus", "Face position", "Where the person sits in the frame, like 50% 30%."),
          bool("vertical", "Vertical video", "Turn on for a phone-shaped clip."),
        ],
      },
    ],
  },
  {
    type: "object",
    name: "promo",
    label: "Promo video",
    fields: [
      img("src", "Video"),
      img("poster", "Still image"),
      str("label", "Accessible name", "Read aloud as the name of the video."),
    ],
  },
]);

const cell: TinaField = {
  type: "object",
  name: "values",
  label: "Cells",
  list: true,
  description: "One cell per column, in the same order as the column names.",
  fields: [
    {
      type: "string",
      name: "kind",
      label: "Cell",
      description: "A check, a dash, or words.",
      options: [
        { label: "Check", value: "check" },
        { label: "Dash", value: "dash" },
        { label: "Text", value: "text" },
      ],
    },
    str("text", "Text", "Only used when the cell is Text."),
    bool("accent", "Highlight", "Shows the text in the brand green."),
  ],
};

const pricing = singleton("pricing", "Pricing", "pricing", "/pricing", [
  str("title", "Page title"),
  {
    type: "object",
    name: "intro",
    label: "Introduction",
    fields: [
      str("headline", "Headline"),
      str("subhead", "Subhead"),
      {
        type: "object",
        name: "startingAt",
        label: "Starting price",
        fields: [str("label", "Label"), str("price", "Price")],
      },
      str("addOns", "Add-ons line"),
      str("cta", "Button"),
    ],
  },
  str("footnote", "Fee footnote", "The longer fee note under the two model cards."),
  {
    type: "object",
    name: "models",
    label: "Model cards",
    list: true,
    ui: named("name"),
    fields: [
      str("tag", "Tag"),
      str("name", "Name"),
      str("forWho", "Who it is for"),
      str("price", "Price"),
      str("terms", "Terms"),
      str("copy", "Paragraph"),
      strings("points", "Points"),
      str("extrasLabel", "Extras heading"),
      strings("extras", "Extras"),
      bool("featured", "Featured"),
    ],
  },
  {
    type: "object",
    name: "compare",
    label: "Comparison table",
    fields: [
      strings("columns", "Column names", "Keep these as the two service names."),
      num("featured", "Highlighted column", "0 is the first column. 1 is the second."),
      str("footnote", "Table footnote"),
      {
        type: "object",
        name: "rows",
        label: "Rows",
        list: true,
        ui: named("label"),
        fields: [str("label", "Row name"), str("note", "Small note"), cell],
      },
    ],
  },
]);

const faq = singleton("faq", "Questions", "faq", "/", [
  {
    type: "object",
    name: "items",
    label: "Questions",
    list: true,
    ui: named("q"),
    fields: [str("q", "Question"), str("a", "Answer")],
  },
]);

const testimonials = singleton("testimonials", "Testimonials", "testimonials", "/results", [
  str("eyebrow", "Small label"),
  str("headline", "Headline"),
  {
    type: "object",
    name: "videos",
    label: "Videos",
    list: true,
    ui: named("company"),
    fields: [
      str("company", "Company"),
      str("focus", "Face position", "Where the person sits in the frame, like 50% 55%."),
      img("poster", "Still image"),
      img("preview", "Silent preview"),
      img("full", "Full video"),
      // Optional (10/15): when set, a LinkedIn icon shows under the video,
      // as on the quote cards.
      str("person", "Person in the video", "Used to label the LinkedIn link for screen readers."),
      link("linkedin", "LinkedIn profile"),
    ],
  },
  {
    type: "object",
    name: "slots",
    label: "Quotes",
    list: true,
    ui: named("name"),
    fields: [
      str("id", "Id", "A short unique name, like quote-1."),
      str("quote", "Quote"),
      str("name", "Name"),
      str("title", "Title"),
      str("company", "Company"),
      str("linkedin", "LinkedIn", "A full https link, or leave the placeholder until you have the real profile."),
    ],
  },
]);

const about = singleton("about", "About", "about", "/about", [
  str("title", "Page title"),
  str("headline", "Headline"),
  str("lead", "Lead"),
  {
    type: "object",
    name: "gap",
    label: "Opportunity gap",
    fields: [str("headline", "Headline"), str("body", "Paragraph")],
  },
  {
    type: "object",
    name: "winWin",
    label: "Win on both sides",
    fields: [
      str("headline", "Headline"),
      {
        type: "object",
        name: "sides",
        label: "Sides",
        list: true,
        ui: named("title"),
        fields: [
          str("title", "Title"),
          str("body", "Paragraph"),
          str("bookLink", "Link to open the booking page in a new tab"),
        ],
      },
      str("closer", "Closing line"),
    ],
  },
  {
    type: "object",
    name: "founder",
    label: "Founder",
    fields: [str("headline", "Headline"), str("body", "Paragraph")],
  },
  {
    type: "object",
    name: "values",
    label: "Values",
    fields: [
      str("headline", "Headline"),
      {
        type: "object",
        name: "items",
        label: "Values",
        list: true,
        ui: named("name"),
        fields: [str("name", "Name"), str("line", "Line")],
      },
    ],
  },
  str("teamHeadline", "Team heading"),
  str("close", "Closing paragraph"),
  str("cta", "Button"),
  {
    type: "object",
    name: "valuesVideo",
    label: "Values video",
    fields: [
      img("src", "Video"),
      img("poster", "Still image"),
      str("name", "Name"),
      str("caption", "Caption"),
    ],
  },
]);

const careers = singleton("careers", "Careers", "careers", "/careers", [
  str("title", "Page title"),
  str("eyebrow", "Small label"),
  str("headline", "Headline"),
  str("subhead", "Subhead"),
  str("body", "Paragraph"),
  button("cta", "Apply button"),
  str("whyHeadline", "Why heading"),
  {
    type: "object",
    name: "why",
    label: "Reasons",
    list: true,
    ui: named("lead"),
    fields: [str("lead", "Bold start"), str("rest", "Rest of the line")],
  },
  str("lookForHeadline", "Who we look for heading"),
  str("lookFor", "Who we look for"),
  str("stepsHeadline", "Steps heading"),
  {
    type: "object",
    name: "steps",
    label: "Steps",
    list: true,
    ui: named("title"),
    fields: [str("title", "Title"), str("body", "Paragraph")],
  },
  {
    type: "object",
    name: "reels",
    label: "Videos",
    list: true,
    ui: named("name"),
    fields: [img("src", "Video"), img("poster", "Still image"), str("name", "Name"), str("caption", "Caption")],
  },
]);

const contact = singleton("contact", "Contact", "contact", "/contact", [
  str("title", "Page title"),
  str("description", "Page description"),
  str("eyebrow", "Small label"),
  str("headline", "Headline"),
  str("headlineAccent", "Colored words"),
  str("body", "Paragraph"),
  strings("expect", "What to expect"),
  {
    type: "object",
    name: "form",
    label: "Form labels",
    description: "The words on the form. What the form checks and where it sends a lead stays in the site code.",
    fields: [
      strings("steps", "Step names"),
      {
        type: "object",
        name: "role",
        label: "Role question",
        fields: [
          str("label", "Question"),
          str("placeholder", "Placeholder"),
          str("other", "Other option"),
          str("otherLabel", "Other question"),
        ],
      },
      {
        type: "object",
        name: "headcount",
        label: "Headcount",
        fields: [str("label", "Question"), strings("options", "Choices")],
      },
      {
        type: "object",
        name: "timeline",
        label: "Timeline",
        fields: [str("label", "Question"), strings("options", "Choices")],
      },
      str("name", "Name field"),
      str("email", "Email field"),
      str("company", "Company field"),
      str("message", "Message field"),
      str("next", "Next button"),
      str("back", "Back button"),
      str("submit", "Submit button"),
      str("sending", "Sending label"),
      {
        type: "object",
        name: "success",
        label: "Success message",
        fields: [str("title", "Title"), str("body", "Paragraph")],
      },
      str("error", "Error message"),
    ],
  },
]);

const results = singleton("results", "Results", "results", "/results", [
  str("title", "Page title"),
  str("description", "Page description"),
  str("eyebrow", "Small label"),
  str("headline", "Headline"),
  str("headlineAccent", "Second line"),
  str("body", "Paragraph"),
  str("storiesHeadline", "Stories heading"),
  str("storiesBody", "Stories paragraph"),
  str("readStory", "Read the story"),
  str("caseStudyLabel", "Case study label"),
  str("caseStudyKicker", "Case study kicker"),
  str("challengeHeading", "Challenge heading"),
  str("solutionHeading", "Solution heading"),
  stat("numbers", "Numbers"),
  img("heroImage", "Background photo"),
]);

const rolesPage = singleton("rolesPage", "Roles page", "roles-page", "/roles", [
  str("title", "Page title"),
  str("crumb", "Breadcrumb"),
  str("headline", "Headline"),
  str("subhead", "Subhead"),
  str("closing", "Closing line"),
  str("otherDepartments", "Other departments heading"),
  str("cta", "Button"),
]);

const industriesPage = singleton("industriesPage", "Industries page", "industries-page", "/industries", [
  str("title", "Page title"),
  str("crumb", "Breadcrumb"),
  str("eyebrow", "Small label"),
  str("headline", "Headline"),
  str("body", "Paragraph"),
  str("otherHeadline", "Other industries heading"),
  str("otherBody", "Other industries paragraph"),
  str("cta", "Button"),
]);

const servicesPage = singleton("servicesPage", "Services page", "services-page", "/services/direct-hire", [
  str("crumb", "Breadcrumb"),
  str("howHeadline", "How it works heading"),
  str("bestFitHeadline", "Best fit heading"),
]);

const industry: Collection = {
  name: "industry",
  label: "Industries",
  path: "content/industries",
  format: "json",
  ui: {
    filename: lockedFiles("name"),
    router: ({ document }) => `/industries/${document._sys.filename}`,
  },
  fields: [
    num("order", "Order", "Lower numbers appear first in the menu and on the page."),
    str("navLabel", "Menu name"),
    iconField(),
    str("name", "Name"),
    str("descriptor", "Short line", "The line on the industries overview tile."),
    {
      type: "object",
      name: "heroImage",
      label: "Header photo",
      fields: [
        img("src", "Photo"),
        str("alt", "Photo description"),
        str("focus", "Crop", "Where the photo sits, like 50% 50%."),
      ],
    },
    str("subhead", "Subhead"),
    str("problemHeadline", "Problem headline"),
    str("problemBody", "Problem paragraph"),
    strings("triggers", "Triggers"),
    str("rolesHeadline", "Roles headline"),
    {
      type: "object",
      name: "roles",
      label: "Roles",
      list: true,
      ui: named("name"),
      fields: [
        str("name", "Role"),
        str("department", "Department page", "The department's address name, like marketing. Leave blank if this role should not link."),
      ],
    },
    str("rolesCloser", "Closing line"),
    strings("proofLogos", "Client logos", "Each entry is a logo's short name from Homepage, like oasis."),
    str("caseStudy", "Case study", "The case study's address name, like global-relocation. Leave blank for none."),
  ],
};

const department: Collection = {
  name: "department",
  label: "Departments",
  path: "content/departments",
  format: "json",
  ui: {
    filename: lockedFiles("name"),
    router: ({ document }) => `/roles/${document._sys.filename}`,
  },
  fields: [
    num("order", "Order", "Lower numbers appear first in the menu."),
    str("name", "Name"),
    strings("roles", "Roles", "These are also the choices in the contact form."),
    // Role page redesign (10/15). The intro and role descriptions started as
    // AI-drafted placeholders, which Handoff approved until they replace them.
    str("intro", "Intro", "One line under the department name."),
    img("image", "Photo", "Shown in grayscale beside the intro."),
    {
      type: "object",
      name: "roleDetails",
      label: "Role descriptions",
      list: true,
      ui: named("role"),
      fields: [
        str("role", "Role", "Must match a role in the list above, word for word."),
        iconField(),
        str("text", "What they do"),
      ],
    },
    video("video", "Role video"),
  ],
};

const service: Collection = {
  name: "service",
  label: "Services",
  path: "content/services",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    filename: { readonly: true },
    router: ({ document }) => `/services/${document._sys.filename}`,
  },
  fields: [
    num("order", "Order", "Lower numbers appear first in the menu."),
    str("name", "Name"),
    str("subhead", "Subhead"),
    str("howItWorks", "How it works"),
    str("detailHeadline", "Detail heading"),
    str("detailBody", "Detail paragraph"),
    strings("detailList", "Included items"),
    str("bestFit", "Best fit"),
    {
      type: "object",
      name: "other",
      label: "Link to the other service",
      fields: [
        str("label", "Link label"),
        {
          type: "string",
          name: "slug",
          label: "Other service",
          description: "Which service this page points to.",
          options: [
            { label: "Direct Hire", value: "direct-hire" },
            { label: "Managed Staffing", value: "managed-staffing" },
          ],
        },
      ],
    },
  ],
};

const teamMember: Collection = {
  name: "teamMember",
  label: "Team",
  path: "content/team",
  format: "json",
  ui: {
    filename: lockedFiles("name"),
    router: () => "/about",
  },
  fields: [
    num("order", "Order", "Lower numbers appear first on the About page."),
    str("name", "Name"),
    str("role", "Role"),
    img("photo", "Photo"),
  ],
};

const caseStudy: Collection = {
  name: "caseStudy",
  label: "Case studies",
  path: "content/case-studies",
  format: "json",
  ui: {
    filename: lockedFiles("title"),
    router: ({ document }) => `/results#${document._sys.filename}`,
  },
  fields: [
    num("order", "Order", "Lower numbers appear first."),
    str("tag", "Tag"),
    iconField(),
    str("title", "Title"),
    str("subhead", "Subhead"),
    stat("heroStats", "Top numbers"),
    strings("challenge", "Challenge"),
    {
      type: "object",
      name: "solution",
      label: "What we did",
      list: true,
      ui: named("title"),
      fields: [str("title", "Title"), str("result", "Result")],
    },
    stat("results", "Results"),
    str("quote", "Quote"),
    str("attributionRole", "Who said it"),
  ],
};

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "",
    },
  },
  schema: {
    collections: [
      site,
      home,
      hiring,
      pricing,
      faq,
      testimonials,
      about,
      careers,
      contact,
      results,
      rolesPage,
      industriesPage,
      servicesPage,
      industry,
      department,
      service,
      teamMember,
      caseStudy,
    ],
  },
});
