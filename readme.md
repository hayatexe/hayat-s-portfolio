# <hayat's Portfolio>


A fast, modern, multi‑page personal website to showcase projects, skills, experience, and provide easy contact. Built with semantic HTML, modern CSS, vanilla JS, and tasteful GSAP animations. Optimized for SEO, clean URLs, and privacy‑friendly analytics.

Live: https://hayatexe.com
Author: Hayat (hayatexe.com)

Features
Multi‑page site
Home, About, Projects, Skills, Experience, Contact
Clean URLs (no .html), HTTPS + non‑www redirect
Dark/Light theme toggle
Smooth scroll animations (GSAP + ScrollTrigger) and canvas particle hero
Animated counters, section reveals, interactive cards
Contact form via EmailJS (no backend required)
SEO‑ready
Per‑page meta tags, canonical links
Open Graph + Twitter cards
JSON‑LD Person schema
Favicons + Web App Manifest
External link hardening (rel="noopener noreferrer nofollow")
Privacy‑friendly analytics (Plausible)
Optional: inline Web Vitals mini widget (LCP/CLS/INP)
Tech Stack
HTML5, CSS3 (custom properties, Grid, Flexbox), Vanilla JavaScript
GSAP 3 + ScrollTrigger
EmailJS (contact form)
Plausible (analytics)
Apache/LiteSpeed (.htaccess rewrites for clean URLs)
Project Structure
text

.
├── index.html
├── about.html
├── projects.html
├── skills.html
├── experience.html
├── contact.html
├── css/
│   ├── theme.css
│   ├── style.css
│   └── animations.css
├── js/
│   ├── theme.js
│   ├── main.js
│   ├── animations.js
│   └── contact.js
├── assets/
│   ├── profile.jpg           # add your photo
│   └── favicon/
│       ├── favicon.ico
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       ├── android-chrome-192x192.png
│       └── android-chrome-512x512.png
├── site.webmanifest
└── .htaccess                 # on hosting (see below)
Getting Started (Local)
Because the site uses clean URLs (/about instead of about.html), you should use a local server (not file://).

Open the folder in VS Code
Install the “Live Server” extension
Right‑click index.html → “Open with Live Server”
Visit http://127.0.0.1:5500/

Hosting & Clean URLs
For cPanel/Apache/LiteSpeed, put this .htaccess in the document root (public_html):

apache

# Clean URLs for hayatexe.com (no .html)
# HTTPS + non‑www + hide /index.html

Options -MultiViews
DirectoryIndex index.html

RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Force non‑www
RewriteCond %{HTTP_HOST} ^www\.hayatexe\.com$ [NC]
RewriteRule ^ https://hayatexe.com%{REQUEST_URI} [L,R=301]

# /index.html -> /
RewriteCond %{THE_REQUEST} \s/+index\.html[\s?] [NC]
RewriteRule ^index\.html$ / [R=301,L]

# .html -> extensionless (canonicalize)
RewriteCond %{THE_REQUEST} \s/+(.+?)\.html[\s?] [NC]
RewriteRule ^ %1 [R=301,L]

# Do not rewrite existing files/dirs
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Skip static assets
RewriteCond %{REQUEST_URI} \.(css|js|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|mp4|webm|ogg|pdf|txt|xml|json|webmanifest|map)$ [NC]
RewriteRule ^ - [L]

# Map extensionless to .html internally
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^(.+)$ $1.html [L]

# Charset header (optional)
AddDefaultCharset utf-8
AddType "text/html; charset=UTF-8" .html .htm
Netlify

Enable Post processing → Pretty URLs, or add netlify.toml
Vercel

vercel.json:
JSON

{
  "cleanUrls": true,
  "trailingSlash": false
}
Cloudflare Pages

Clean URLs: Enable in project settings.
GitHub Pages

Native rewrites aren’t supported; use folder/index.html structure or a single‑page fallback.
EmailJS (Contact Form)
Add EmailJS script (already in contact.html):
HTML

<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
Configure js/contact.js:
Initialize with your PUBLIC KEY:
JavaScript

emailjs.init("YOUR_PUBLIC_KEY");
Update service and template IDs:
JavaScript

emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
  from_name: formData.name,
  from_email: formData.email,
  subject: formData.subject,
  message: formData.message,
  reply_to: formData.email
});
EmailJS template variables:
{{from_name}}, {{from_email}}, {{subject}}, {{message}}, {{reply_to}}
Analytics (Plausible)
Add to <head> on all pages:

HTML

<script defer data-domain="hayatexe.com" src="https://plausible.io/js/script.js"></script>



This project is dual-licensed. You may choose either:

- GNU General Public License v3.0 or later (GPL-3.0-or-later)
  - Commercial use is permitted under the GPL, provided you comply with its copyleft terms (e.g., provide source when distributing binaries).
  - Full text: see `LICENSE.md` or https://www.gnu.org/licenses/gpl-3.0.html

- Hayat Commercial License
  - For closed-source/proprietary use with no GPL copyleft obligations.
  - Contact: hayatexeler@gmail.com
  - Terms: see `COMMERCIAL-LICENSE.md`

Unless you have a separate commercial agreement, your use of this software is under the GPL.

## SPDX header for source files

Add this header to each source file: