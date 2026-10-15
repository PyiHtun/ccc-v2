import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { services, siteUrl } from "../src/seo/services.js";

const logoSource = new URL("../src/img/ccc_main_2.png", import.meta.url);
const logo = readFileSync(logoSource);
const logoWidth = logo.readUInt32BE(16);
const logoHeight = logo.readUInt32BE(20);
copyFileSync(logoSource, "public/ccc-main-logo.png");

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));
const links = services.map((service) => `<li><a href="/services/${service.slug}/">${escapeHtml(service.displayTitle)}</a></li>`).join("\n");
for (const service of services) {
  const url = `${siteUrl}/services/${service.slug}/`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${url}#service`, name: service.title, description: service.description,
        url, serviceType: service.title.replace(/ in .+$/, ""),
        provider: { "@id": `${siteUrl}/#business` },
        areaServed: ["Enfield", "London", "Hertfordshire"].map((name) => ({ "@type": "AdministrativeArea", name })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: service.title, item: url },
      ] },
      { "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: service.question,
        acceptedAnswer: { "@type": "Answer", text: service.answer } }] },
    ],
  };
  const html = `<!doctype html>
<html lang="en-GB"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(service.title)} | Cozy Corner Care</title>
<meta name="description" content="${escapeHtml(service.description)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}"><link rel="icon" href="/ccc.svg" type="image/svg+xml"><link rel="stylesheet" href="/service-pages.css">
<meta property="og:type" content="website"><meta property="og:site_name" content="Cozy Corner Care"><meta property="og:locale" content="en_GB">
<meta property="og:title" content="${escapeHtml(service.title)} | Cozy Corner Care"><meta property="og:description" content="${escapeHtml(service.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${siteUrl}/social-preview.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(service.title)} | Cozy Corner Care"><meta name="twitter:description" content="${escapeHtml(service.description)}"><meta name="twitter:image" content="${siteUrl}/social-preview.png">
<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>
</head><body>
<header><a class="brand" href="/" aria-label="Cozy Corner Care home"><img src="/ccc-main-logo.png" alt="Cozy Corner Care" width="${logoWidth}" height="${logoHeight}" decoding="async"></a><nav aria-label="Main navigation"><a href="/#services">Our services</a><a href="/#areas">Areas We Cover</a><a href="/#contact-form">Contact us</a></nav></header>
<main>
<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / ${escapeHtml(service.displayTitle)}</nav>
<p class="eyebrow">Nurse-led care, planned around you</p><h1>${escapeHtml(service.displayTitle)}</h1>
<p class="intro">${escapeHtml(service.intro)}</p><a class="cta" href="/#contact-form">Arrange a care consultation</a>
<section><h2>${escapeHtml(service.heading)}</h2><ul>${service.support.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}</ul></section>
<section><h2>How we arrange your care</h2><p>${escapeHtml(service.planning)}</p><p>Our service is managed by experienced NHS nurses. <a href="https://www.cqc.org.uk/location/1-26179879651">View our Care Quality Commission registration</a>, or <a href="/#about">meet our team</a>.</p></section>
<section><h2>Areas we cover</h2><p>Based in Enfield, Cozy Corner Care supports clients across Greater London, including north and south London, and Hertfordshire. We plan care around your needs and confirm availability for your location. If your area is not mentioned, please call us anyway - we may be able to arrange support. Tell us your postcode so we can discuss availability.</p></section>
<section><h2>Your questions</h2><details><summary>${escapeHtml(service.question)}</summary><p>${escapeHtml(service.answer)}</p></details><details><summary>How much will care cost?</summary><p>Costs depend on the support required and the agreed schedule. Contact us to discuss your circumstances and receive information about suitable arrangements and pricing.</p></details></section>
<section><h2>Explore our other care services</h2><ul class="related">${links}</ul></section>
<section class="contact"><h2>Talk to Cozy Corner Care</h2><p>Call <a href="tel:02039243451">0203 924 3451</a> or email <a href="mailto:info@cozycornercare.com">info@cozycornercare.com</a>.</p><a class="cta" href="/#contact-form">Send a care enquiry</a></section>
</main><footer><p>Cozy Corner Care Ltd. &middot; Suite 49, The Wenta Business Centre, Innova Business Park, Electric Ave, Enfield, EN3 7XU</p><a href="/#policy">Our policies</a> &middot; <a href="/">Back to home</a></footer>
</body></html>
`;
  const directory = `public/services/${service.slug}`;
  mkdirSync(directory, { recursive: true });
  writeFileSync(`${directory}/index.html`, html);
}
writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[`${siteUrl}/`, ...services.map((service) => `${siteUrl}/services/${service.slug}/`)].map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>
`);
console.log(`Generated ${services.length} static service pages, sitemap and robots.txt.`);
