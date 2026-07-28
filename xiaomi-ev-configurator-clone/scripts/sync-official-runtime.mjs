import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const sourceRoot = path.resolve(projectRoot, "..", "source-capture");
const publicRoot = path.join(projectRoot, "public");
const apiRoot = path.join(publicRoot, "official-api");

const OFFICIAL_PAGE_URL =
  "https://www.xiaomiev.com/configurator/select?goodsId=900002858&itemId=500010402&ssuId=600024175&type=3d";
const STATIC_ORIGIN = "https://s1.xiaomiev.com";
const STATIC_PREFIX = `${STATIC_ORIGIN}/activity-outer-assets`;
const OFFICIAL_SENTRY_DSN =
  "https://e82999a54af3468a87f23739f6e5e79f@sentry.d.xiaomi.net/1408";

const inventory = JSON.parse(
  await readFile(path.join(sourceRoot, "inventory", "page-assets.json"), "utf8"),
);

const fileExists = async (candidate) => {
  try {
    return (await stat(candidate)).isFile();
  } catch {
    return false;
  }
};

const rawPathForAsset = async (asset) => {
  const standard = path.join(
    sourceRoot,
    "raw",
    asset.kind,
    `${asset.id}_${asset.name}`,
  );
  if (await fileExists(standard)) return standard;

  const explicit = {
    ConfigTable: path.join(
      sourceRoot,
      "raw",
      "config",
      "ConfigTable.original.json",
    ),
    "wasm_crypto_bg.wasm": path.join(
      sourceRoot,
      "raw",
      "runtime",
      "wasm_crypto_bg.wasm",
    ),
    "draco_decoder.wasm": path.join(
      sourceRoot,
      "raw",
      "runtime",
      "draco_decoder.wasm",
    ),
  };

  if (asset.name === "ConfigTable.json") return explicit.ConfigTable;
  if (explicit[asset.name]) return explicit[asset.name];
  return null;
};

const localUrlForAsset = (asset) => {
  const url = new URL(asset.url);
  if (url.origin === STATIC_ORIGIN) return url.pathname;
  return `/official-external/${asset.id}-${asset.name}`;
};

const rewriteTextAsset = (text) =>
  text
    .replaceAll(STATIC_PREFIX, "/activity-outer-assets")
    .replaceAll(
      `${STATIC_ORIGIN}/website-evcar`,
      "/website-evcar",
    )
    .replaceAll(OFFICIAL_SENTRY_DSN, "");

const copiedAssets = [];
const missingAssets = [];
const sourceUrlMap = new Map();

for (const asset of inventory.assets) {
  if (!/^https?:/.test(asset.url)) continue;

  const source = await rawPathForAsset(asset);
  if (!source || !(await fileExists(source))) {
    if (!["other"].includes(asset.kind)) missingAssets.push(asset.url);
    continue;
  }

  const localUrl = localUrlForAsset(asset);
  const destination = path.join(publicRoot, localUrl.replace(/^\//, ""));
  await mkdir(path.dirname(destination), { recursive: true });

  if (asset.kind === "script" || asset.kind === "stylesheet") {
    const sourceText = await readFile(source, "utf8");
    await writeFile(destination, rewriteTextAsset(sourceText));
  } else {
    await copyFile(source, destination);
  }

  copiedAssets.push({ url: asset.url, localUrl });
  const baseUrl = asset.url.split("?")[0];
  const previous = sourceUrlMap.get(baseUrl);
  if (!previous || (!asset.url.includes("?") && previous.url.includes("?"))) {
    sourceUrlMap.set(baseUrl, { url: asset.url, localUrl });
  }
}

const bootstrapSource = await readFile(
  path.join(publicRoot, "official-bootstrap.js"),
  "utf8",
);
const reactCoreChunkPath = path.join(
  publicRoot,
  "activity-outer-assets",
  "assets",
  "_next",
  "static",
  "chunks",
  "fd9d1056-027dfa06d4d1a067.js",
);
const reactCoreChunk = await readFile(reactCoreChunkPath, "utf8");
await writeFile(
  reactCoreChunkPath,
  `${bootstrapSource}\n${reactCoreChunk}`,
);

const directCopies = [
  {
    source: path.join(sourceRoot, "raw", "3d", "assets.mi"),
    localUrl:
      "/activity-outer-assets/bundle_su7_u/PC/26_0_00/assets.mi",
  },
  {
    source: path.join(
      sourceRoot,
      "raw",
      "config",
      "ConfigTable.original.json",
    ),
    localUrl:
      "/activity-outer-assets/bundle_su7_u/PC/26_0_00/ConfigTable.json",
  },
  {
    source: path.join(
      sourceRoot,
      "raw",
      "runtime",
      "wasm_crypto_bg.wasm",
    ),
    localUrl: "/activity-outer-assets/plugin3D/decrypt/wasm_crypto_bg.wasm",
  },
  {
    source: path.join(
      sourceRoot,
      "raw",
      "runtime",
      "draco_decoder.wasm",
    ),
    localUrl:
      "/activity-outer-assets/plugin3D/loaders/libs/draco/draco_decoder.wasm",
  },
];

for (const asset of directCopies) {
  const destination = path.join(publicRoot, asset.localUrl.replace(/^\//, ""));
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(asset.source, destination);
}

const localizeUrl = (value) => {
  if (typeof value !== "string") return value;
  if (value.startsWith(STATIC_PREFIX)) {
    return value.replace(STATIC_PREFIX, "/activity-outer-assets");
  }

  if (!/^https?:/.test(value)) return value;
  const baseUrl = value.split("?")[0];
  const mapped = sourceUrlMap.get(baseUrl);
  return mapped?.localUrl ?? value;
};

const localizeJsonValue = (value) => {
  if (Array.isArray(value)) return value.map(localizeJsonValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        localizeJsonValue(child),
      ]),
    );
  }
  return localizeUrl(value);
};

for (const fileName of [
  "car-configurator-get.json",
  "materialV2.json",
  "tree-bundle.json",
  "check3DEntrance.json",
  "userinfo.json",
]) {
  const sourcePath = path.join(apiRoot, fileName);
  const parsed = JSON.parse(await readFile(sourcePath, "utf8"));
  await writeFile(
    path.join(apiRoot, `localized-${fileName}`),
    JSON.stringify(localizeJsonValue(parsed)),
  );
}

const productResponse = JSON.parse(
  await readFile(path.join(apiRoot, "localized-car-configurator-get.json"), "utf8"),
);
const carSsu = productResponse.data.carSsuDetail;
const defaultSsuIds = Object.values(
  carSsu.configurator.defaultConfigSsuInfo ?? {},
);
const configItemsBySsuId = {};
const collectConfigItems = (value) => {
  if (Array.isArray(value)) {
    value.forEach(collectConfigItems);
    return;
  }
  if (!value || typeof value !== "object") return;

  if (value.ssuId && value.itemIdentifier) {
    configItemsBySsuId[String(value.ssuId)] = {
      ssuId: String(value.ssuId),
      itemIdentifier: value.itemIdentifier,
      name: value.name ?? "",
      price: Number(value.price ?? 0) / 100,
      marketPrice: Number(value.marketPrice ?? value.price ?? 0) / 100,
    };
  }
  Object.values(value).forEach(collectConfigItems);
};
collectConfigItems(carSsu.configurator);

await writeFile(
  path.join(apiRoot, "cart-config-meta.json"),
  JSON.stringify({
    basePresentTotal: Number(carSsu.price ?? 0) / 100,
    baseOriginalTotal: Number(carSsu.marketPrice ?? carSsu.price ?? 0) / 100,
    customThreshold: 60_000,
    defaultSsuIds: defaultSsuIds.map(String),
    items: configItemsBySsuId,
  }),
);

const cartProduct = {
  ...carSsu,
  ssuId: String(carSsu.ssuId),
  activities: Array.isArray(carSsu.activities) ? carSsu.activities : [],
  extend: carSsu.extend ?? {},
  properties: {
    subProducts: defaultSsuIds.map((ssuId) => ({ ssuId: String(ssuId) })),
  },
};
const cartResponse = {
  code: 0,
  data: {
    result: [{ code: 0, msg: "ok" }],
    cart: {
      extend: {
        car_aps_week: "定制服务需选配满¥60,000，已选¥20,000",
      },
      feeDetail: {
        presentTotal: 549_900,
        originalTotal: 568_900,
      },
      groups: [
        {
          groups: [
            {
              productItems: [cartProduct],
            },
          ],
        },
      ],
    },
  },
  message: "ok",
};
await writeFile(
  path.join(apiRoot, "cart-add.json"),
  JSON.stringify(cartResponse),
);

let html = await readFile(
  path.join(sourceRoot, "raw", "page", "configurator-select.html"),
  "utf8",
);
html = rewriteTextAsset(html)
  .replaceAll(
    "connect-src https://",
    "connect-src 'self' https://",
  )
  .replaceAll(
    "//ssl-cdn.static.browser.mi-img.com/mistat-data/onetrack/onetrack.js",
    "/official-empty.js",
  )
  .replaceAll(
    "https://cdn-font.hyperos.mi.com/font/css?family=MiSans_VF:VF:Chinese_Simplify,Latin&amp;display=swap",
    "/official-font.css",
  )
  .replaceAll(
    "https://cdn-font.hyperos.mi.com/font/css?family=MiSans_VF:VF:Chinese_Simplify,Latin\\u0026display=swap",
    "/official-font.css",
  );

await writeFile(path.join(projectRoot, "index.html"), html);
await writeFile(path.join(publicRoot, "official-empty.js"), "");
await writeFile(
  path.join(publicRoot, "official-url-map.json"),
  JSON.stringify(
    {
      sourcePage: OFFICIAL_PAGE_URL,
      generatedAt: new Date().toISOString(),
      copiedAssets,
      missingAssets,
    },
    null,
    2,
  ),
);

console.log(
  JSON.stringify(
    {
      copiedAssets: copiedAssets.length,
      missingAssets: missingAssets.length,
      officialHtmlBytes: Buffer.byteLength(html),
    },
    null,
    2,
  ),
);
