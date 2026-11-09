import type { JsonLdNode } from "@/lib/seo";

interface JsonLdProps {
  /** One node, or several rendered together as a single @graph. */
  data: JsonLdNode | JsonLdNode[];
}

/**
 * Renders schema.org structured data as a <script type="application/ld+json">.
 * Server component: the JSON ships in the HTML so crawlers read it without JS.
 * "<" is escaped so no string in the data can close the script tag.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
