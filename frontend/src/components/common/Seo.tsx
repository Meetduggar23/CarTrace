import { useEffect } from "react";
import { SITE } from "@/lib/constants";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Lightweight SEO helper — updates title, description, canonical and OG tags. */
export function Seo({
  title,
  description = SITE.description,
  path = "/",
  type = "website",
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${SITE.name}`
      : `${SITE.name} — ${SITE.tagline}`;
    const absolutePath = `${window.location.origin}${
      path.startsWith("/") ? path : `/${path}`
    }`;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", absolutePath);
    setLink("canonical", absolutePath);
  }, [title, description, path, type]);

  return null;
}
