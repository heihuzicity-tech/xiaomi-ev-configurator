import { buildOfficialCartResponse } from "./official-cart-response.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (
      url.pathname === "/official-api/cart-add" &&
      request.method === "POST"
    ) {
      const templateUrl = new URL(
        "/official-api/cart-add.json",
        request.url,
      );
      const configMetaUrl = new URL(
        "/official-api/cart-config-meta.json",
        request.url,
      );
      const [template, configMeta, rawBody] = await Promise.all([
        env.ASSETS.fetch(new Request(templateUrl)).then((response) =>
          response.json()
        ),
        env.ASSETS.fetch(new Request(configMetaUrl)).then((response) =>
          response.json()
        ),
        request.text(),
      ]);
      return Response.json(
        buildOfficialCartResponse(template, configMeta, rawBody),
        {
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
