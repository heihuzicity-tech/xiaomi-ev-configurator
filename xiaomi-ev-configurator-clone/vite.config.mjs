import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { buildOfficialCartResponse } from "./worker/official-cart-response.js";

const officialCartMiddleware = () => {
  const handleCartRequest = async (request, response, next) => {
    const requestUrl = new URL(request.url, "http://127.0.0.1");
    if (
      requestUrl.pathname !== "/official-api/cart-add" ||
      request.method !== "POST"
    ) {
      next();
      return;
    }

    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const rawBody = Buffer.concat(chunks).toString("utf8");
    const apiRoot = path.resolve("public", "official-api");
    const [template, configMeta] = await Promise.all([
      readFile(path.join(apiRoot, "cart-add.json"), "utf8").then(JSON.parse),
      readFile(path.join(apiRoot, "cart-config-meta.json"), "utf8").then(
        JSON.parse,
      ),
    ]);
    const result = buildOfficialCartResponse(
      template,
      configMeta,
      rawBody,
    );

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.end(JSON.stringify(result));
  };

  return {
    name: "official-cart-response",
    configureServer(server) {
      server.middlewares.use(handleCartRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleCartRequest);
    },
  };
};

export default defineConfig({
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [officialCartMiddleware(), react()],
});
