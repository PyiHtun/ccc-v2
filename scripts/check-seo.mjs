import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { services, siteUrl } from "../src/seo/services.js";
import en from "../src/i18n/en.js";

const sitemap = readFileSync("docs/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, services.length + 1);
const titles = new Set();
for (const url of urls) {
  assert.ok(url.startsWith(`${siteUrl}/`), `Incorrect canonical host: ${url}`);
  const pathname = new URL(url).pathname;
  const html = readFileSync(`docs${pathname}index.html`, "utf8");
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `Missing canonical: ${url}`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Expected one main heading: ${url}`);
  assert.ok(html.includes('name="description" content="'), `Missing description: ${url}`);
  assert.ok(!html.includes("https://www.cozycornercare.com"), `Mixed hosts: ${url}`);
  assert.ok(!html.includes("Based in Enfield and London,"), `Office location confused with service coverage: ${url}`);
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!titles.has(title), `Duplicate title: ${title}`);
  titles.add(title);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert.ok(schemas.length > 0, `Missing structured data: ${url}`);
  if (pathname === "/") {
    const business = schemas[0]["@graph"].find((item) => item["@id"] === `${siteUrl}/#business`);
    assert.equal(business.address.addressLocality, "Enfield");
    assert.ok(business.areaServed.includes("London"), "Missing homepage London coverage");
    const faq = schemas[0]["@graph"].find((item) => item["@type"] === "FAQPage");
    assert.deepEqual(faq.mainEntity.map((item) => item.name), en.faq.items.map((item) => item.label));
  } else {
    const service = schemas[0]["@graph"].find((item) => item["@type"] === "Service");
    assert.ok(service.name.includes("Enfield and London"), `Incorrect service coverage title: ${url}`);
    assert.ok(service.areaServed.some((area) => area.name === "London"), `Missing London coverage: ${url}`);
    assert.ok(!service.serviceType.includes("Enfield"), `Location leaked into service type: ${url}`);
  }
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const path = match[1];
    if (path === "/") continue;
    assert.ok(existsSync(`docs${path.endsWith("/") ? `${path}index.html` : path}`), `Broken internal asset/link: ${path}`);
  }
}
assert.equal(readFileSync("docs/CNAME", "utf8").trim(), new URL(siteUrl).hostname);
assert.ok(readFileSync("docs/robots.txt", "utf8").includes(`Sitemap: ${siteUrl}/sitemap.xml`));
assert.ok(readFileSync("docs/404.html", "utf8").includes('name="robots" content="noindex,follow"'));
console.log(`SEO checks passed: ${urls.length} pages, unique titles, canonical URLs, schema, internal links, sitemap and 404.`);
