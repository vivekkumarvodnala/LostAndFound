# Lost & Found Application - Security Implementation Guide

This document acts as a comprehensive record and implementation guide for all security enhancements applied to the MERN Stack Lost & Found application to bring it to production-grade security standards.

---

## Phase 1: Security Enhancements

### 1. Helmet Security Headers

#### Overview
Helmet helps secure Express apps by setting various HTTP response headers. By implementing Helmet, we prevent common web vulnerabilities like clickjacking, MIME-sniffing, cross-site scripting (XSS), and data injection.

#### Problem
Without Helmet, the Express server sends default headers or lacks crucial headers. For example:
- The `X-Powered-By: Express` header is returned, exposing the backend technology stack to attackers.
- No `Content-Security-Policy` (CSP) is set, allowing browsers to execute unauthorized inline scripts or load assets from arbitrary domains.
- No `X-Frame-Options` is present, leaving pages vulnerable to Clickjacking attacks.
- No `Strict-Transport-Security` (HSTS) is configured, making connection downgrades (HTTP to HTTPS hijacking) possible.
- Files served by the server could be interpreted differently by browsers due to MIME-sniffing.

#### Attack Scenario
1. **Clickjacking**: An attacker embeds the Lost & Found website inside an transparent `<iframe>` on a malicious website, overlaying a fake button on top of a legitimate button (e.g., "Delete Post"). When the user clicks the innocent-looking button, they are actually clicking the hidden delete button inside the iframe.
2. **MIME Sniffing**: An attacker uploads a file named `image.png` which actually contains JavaScript executable code. If the browser does not receive `X-Content-Type-Options: nosniff`, it might inspect the file's content, detect JavaScript, and execute it in the context of the site.
3. **HTTP Downgrade**: A man-in-the-middle attacker intercepts traffic and downgrades connection from HTTPS to HTTP, allowing eavesdropping. Without HSTS, the browser doesn't force HTTPS.

#### Implementation
Helmet is integrated into the Express entrypoint file (`backend/server.js`) early in the middleware stack to ensure all responses (including static files and API endpoints) are served with secure headers.

#### Architecture Diagram
```
Client Request
      ↓
 [Helmet Middleware] ──(Adds: CSP, HSTS, CORP, X-Frame-Options, X-Content-Type-Options, etc.)
      ↓
[CORS Middleware]
      ↓
[Static Routes / uploads]
      ↓
[API Routes / Controllers]
      ↓
Database / Response
```

#### Files Modified
- `backend/package.json`: Added `helmet` dependency.
- `backend/server.js`: Imported and registered `helmet` middleware.

#### Code Explanation
Here is the production-grade Helmet configuration applied in `backend/server.js`:

```javascript
app.use(
  helmet({
    // Content Security Policy: Restricts source of content execution
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"], // Prevents embedding inside frames (Clickjacking defense)
        imgSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com"], // Cloudinary images
        objectSrc: ["'none'"],
        scriptSrc: ["'self'"],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        upgradeInsecureRequests: [], // Upgrades HTTP requests to HTTPS
      },
    },
    // X-Frame-Options: Set to DENY to block framing completely
    frameguard: {
      action: "deny",
    },
    // X-Content-Type-Options: Set to nosniff to prevent MIME sniffing
    noSniff: true,
    // Referrer-Policy: Limit referrer info sent in headers
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin",
    },
    // Strict-Transport-Security (HSTS): Force HTTPS
    hsts: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    },
    // Cross-Origin Resource Policy: Allow cross-origin requests for static images (needed for MERN frontend)
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);
```

#### Testing
1. **Verification Method**: Check HTTP response headers of any API route (e.g. `GET http://localhost:9000/`) using `curl` or Postman.
2. **Expected Response Headers**:
   - `Content-Security-Policy`: Should match the custom policy defined.
   - `X-Frame-Options`: `DENY`
   - `X-Content-Type-Options`: `nosniff`
   - `Referrer-Policy`: `strict-origin-when-cross-origin`
   - `Strict-Transport-Security`: `max-age=31536000; includeSubDomains; preload`
   - `Cross-Origin-Resource-Policy`: `cross-origin`
   - `X-Powered-By` header should be **removed**.

#### Interview Questions
- **Q: What is Helmet and why do we use it in Express?**
  *A: Helmet is a collection of middleware functions that set HTTP response headers to protect Express applications from well-known web vulnerabilities. It is used to quickly apply secure defaults, such as disabling the `X-Powered-By` header, enforcing HTTPS via HSTS, blocking clickjacking via `X-Frame-Options`, and preventing MIME-sniffing.*
- **Q: Why do we need Content Security Policy (CSP)?**
  *A: CSP is a security layer that helps detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection. It allows us to restrict the domains from which scripts, stylesheets, images, and other resources can be loaded.*

#### Best Practices
- **Never expose technical stack**: Always remove headers like `X-Powered-By`.
- **Set CSP correctly**: Do not use broad wildcards like `*` or allow `'unsafe-inline'` unless absolutely necessary (and if so, use nonces/hashes).
- **Enable HSTS**: Always enforce HSTS in production to prevent SSL strip/downgrade attacks. Ensure `preload: true` is included for browser-level hardcoding.

---
