# DEPLOY.md — installing target-mena.com (for Target's developer)

The website is **plain static files**. The server only serves them: no Node,
no PHP, no database. Building happens on GitHub.

## 1. What to install

| Where | What |
| --- | --- |
| `deploy` branch of this repository | Only the built site (`index.html`, `assets/`, `photos/`, `404.html`, sitemaps, `.htaccess`). Updated by GitHub Actions on every push to `main` and every night at 03:00 Baghdad time. |
| Actions → a CI run → artifact `site-dist` | The same files as a zip, for each build. |

Never build on the server and never copy the `main` branch: it is the source code.

## 2. Server setup (once)

1. A **separate site / vhost** for `target-mena.com` and `www.target-mena.com`.
   Never inside the inventory app's folder or vhost.
2. Document root = a checkout of the `deploy` branch, for example
   `/var/www/target-mena.com`:
   ```bash
   git clone --branch deploy --single-branch https://github.com/ahmad122fks-cmyk/target-mena-website.git /var/www/target-mena.com
   ```
3. HTTPS certificate for `target-mena.com` and `www.target-mena.com` (Let's Encrypt).
4. Apache **or** Nginx rules below (tell Ahmad which one the server uses).

## 3. Staging first

Before launch, serve the same files on a staging host (for example
`new.target-mena.com`) with a password and `noindex`, so Google never sees it:

- Apache: add to the staging `.htaccess` (or vhost):
  ```apache
  AuthType Basic
  AuthName "Target staging"
  AuthUserFile /etc/apache2/.htpasswd-target-staging
  Require valid-user
  Header always set X-Robots-Tag "noindex, nofollow"
  ```
- Nginx: inside the staging `server { }`:
  ```nginx
  auth_basic "Target staging";
  auth_basic_user_file /etc/nginx/.htpasswd-target-staging;
  add_header X-Robots-Tag "noindex, nofollow" always;
  ```

The staging DNS record (GoDaddy) is added by Ahmad.

## 4. Apache

The `.htaccess` in the site root already has every rule. The vhost needs
`AllowOverride All` and the modules `rewrite`, `headers` and `deflate`.

## 5. Nginx (same rules as the `.htaccess`)

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name target-mena.com www.target-mena.com;
  return 301 https://target-mena.com$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name www.target-mena.com;
  ssl_certificate     /etc/letsencrypt/live/target-mena.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/target-mena.com/privkey.pem;
  return 301 https://target-mena.com$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name target-mena.com;
  ssl_certificate     /etc/letsencrypt/live/target-mena.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/target-mena.com/privkey.pem;

  root /var/www/target-mena.com;
  index index.html;
  error_page 404 /404.html;

  gzip on;
  charset utf-8;
  gzip_types text/css text/plain text/javascript application/javascript application/json application/xml image/svg+xml;

  # Old cache folders: forbidden. Old product pages: gone.
  location ~ ^/target-[^/]*-cache(/|$) { return 403; }
  location ~ ^/product(/.*)?$ { return 410 "This page no longer exists.\n"; }

  # Old site addresses -> new pages (301)
  rewrite ^/services/?$  /en/          permanent;
  rewrite ^/locations/?$ /en/network/  permanent;
  rewrite ^/panels/?$    /en/network/  permanent;
  rewrite ^/tv/?$        /en/alrabiaa/ permanent;
  rewrite ^/products(/.*)?$ /en/boards/ permanent;
  rewrite ^/projects/?$  /en/work/     permanent;
  rewrite ^/project/.*$  /en/work/     permanent;
  rewrite ^/plan/.*$     /en/alrabiaa/ permanent;
  rewrite ^/country/.*$  /en/network/  permanent;

  # Nginx drops server-level add_header inside a location that has its own,
  # so the security headers are repeated in each block.
  location /assets/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
    add_header X-Content-Type-Options nosniff always;
    try_files $uri =404;
  }
  location ~* \.(avif|webp|jpg|png|svg|woff2)$ {
    add_header Cache-Control "public, max-age=604800";
    add_header X-Content-Type-Options nosniff always;
    try_files $uri =404;
  }
  location / {
    add_header Cache-Control "no-cache";
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    try_files $uri $uri/ =404;
  }
  location = /404.html { internal; }
}
```

`/about` and `/contact` are **not** redirected (the old brief sent them to
English): they are now the Arabic About and Contact pages, and each page links
to its English version under `/en/`.

## 6. Updating the site

Nothing to build. Pull the newest `deploy` branch:

```bash
cd /var/www/target-mena.com && git fetch origin deploy && git reset --hard origin/deploy
```

A cron job can run this every night after 03:30 Baghdad time.

## 7. Checks after each install

```bash
curl -sI https://target-mena.com/ | head -1                      # 200
curl -sI http://www.target-mena.com/boards/ | grep -i location   # https://target-mena.com/boards/
curl -sI https://target-mena.com/no-such-page/ | head -1         # 404
curl -sI https://target-mena.com/product/1 | head -1             # 410
curl -sI https://target-mena.com/tv | grep -i location           # /en/alrabiaa/
curl -s  https://target-mena.com/robots.txt                      # has the Sitemap line
```

## 8. Launch (only on Ahmad's yes)

1. In GoDaddy, point the website records only (`target-mena.com` and `www`) to
   the server. **Do not touch** the email records (MX, SPF, DKIM, DMARC).
2. Submit `https://target-mena.com/sitemap-index.xml` in Google Search Console.
3. Log every change on the live server in Target's server change log, with the
   backup location and how to undo it.

## 9. Later: the leads endpoint

Forms send by WhatsApp or email until
`https://admin.target-mena.cloud/api/public/leads` exists. When it does:

1. Allow `https://target-mena.com` in its CORS settings (POST, JSON).
2. Set `LEADS_ENDPOINT` in `src/lib/site.ts` and push; the site rebuilds itself.
3. Update the privacy page ("How it reaches us").

## Never touch from this project

Company email, DNS other than the two website records, `qi.target-mena.com`,
`cms.target-mena.com` (until its retirement step), `admin.target-mena.cloud`.
