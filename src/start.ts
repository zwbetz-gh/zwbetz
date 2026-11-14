import { createMiddleware, createStart } from "@tanstack/react-start";
import redirects from "./legacy-redirects.json";

const destinations: Record<string, string> = redirects;
const legacyRedirects = createMiddleware().server(({ request, next }) => {
  const url = new URL(request.url);
  const destination = destinations[url.pathname.replace(/\/$/, "")];
  if ((request.method === "GET" || request.method === "HEAD") && destination) {
    return new Response(null, {
      status: 301,
      headers: { Location: destination + url.search },
    });
  }
  return next();
});
export const startInstance = createStart(() => ({
  requestMiddleware: [legacyRedirects],
}));
