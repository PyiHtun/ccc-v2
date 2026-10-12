import { writeFileSync } from "node:fs";
writeFileSync("docs/.nojekyll", "");
writeFileSync("docs/404.html", `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page not found | Cozy Corner Care</title><link rel="stylesheet" href="/service-pages.css"></head>
<body><main><h1>Page not found</h1><p>The page you requested could not be found.</p><p><a class="cta" href="/">Return to Cozy Corner Care</a></p><p><a href="/#services">Explore our care services</a> or <a href="/#contact">contact our team</a>.</p></main></body></html>
`);
