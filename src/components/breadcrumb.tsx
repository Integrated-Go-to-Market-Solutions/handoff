import Link from "next/link";

/**
 * Trail under a page hero. Links get a 36px-tall tap area; the negative
 * margin keeps the trail's spacing. The last item is the current page.
 */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-bone/60">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${item.href ?? "here"}-${item.label}`}>
            {i > 0 && (
              <span aria-hidden="true" className="mx-2">
                &rarr;
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="-my-2.5 inline-block py-2.5 transition-colors hover:text-cyan">
                {item.label}
              </Link>
            ) : (
              <span className={last ? "text-bone/85" : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
