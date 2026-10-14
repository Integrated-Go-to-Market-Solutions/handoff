import { socialLinks } from "@/lib/content";

function SocialMark({ platform }: { platform: "youtube" | "linkedin" | "instagram" }) {
  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#0A66C2" />
        <circle cx="10.3" cy="11.1" r="1.6" fill="#ffffff" />
        <path d="M8.9 13.5h2.8v9.6H8.9z" fill="#ffffff" />
        <path
          d="M13.4 13.5h2.7v1.3h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.5 2 3.5 4.5v5.3h-2.8V18.5c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.7h-2.8z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
        <defs>
          <linearGradient id="ig" x1="0" y1="32" x2="32" y2="0">
            <stop offset="0%" stopColor="#FEDA75" />
            <stop offset="35%" stopColor="#FA7E1E" />
            <stop offset="65%" stopColor="#D62976" />
            <stop offset="100%" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="16" fill="url(#ig)" />
        <rect x="9" y="9" width="14" height="14" rx="4" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <circle cx="16" cy="16" r="3.4" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <circle cx="21.2" cy="10.8" r="1.2" fill="#ffffff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#FF0000" />
      <path d="M12 10.3h8c2 0 3.4 1.4 3.4 3.4v4.6c0 2-1.4 3.4-3.4 3.4h-8c-2 0-3.4-1.4-3.4-3.4v-4.6c0-2 1.4-3.4 3.4-3.4z" fill="#ffffff" />
      <path d="M14.4 13.3l5.2 2.7-5.2 2.7z" fill="#FF0000" />
    </svg>
  );
}

export function SocialLinks() {
  return (
    <nav aria-label="Handoff social media" className="mt-8 flex flex-wrap gap-4">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          title={social.label}
          className="group grid h-18 w-18 place-items-center rounded-full transition-transform duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal md:h-20 md:w-20"
        >
          <span className="grid h-full w-full place-items-center">
            <span className="scale-[1.8] md:scale-[2]">
              <SocialMark platform={social.platform} />
            </span>
          </span>
        </a>
      ))}
    </nav>
  );
}
