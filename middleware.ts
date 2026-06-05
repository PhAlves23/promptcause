import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Detects the locale (cookie → Accept-Language → default) and rewrites/redirects.
export default createMiddleware(routing);

export const config = {
  // Run on all paths except API, Next internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
