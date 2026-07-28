(() => {
  const officialStaticPrefix =
    "https://s1.xiaomiev.com/activity-outer-assets";
  const localizeOfficialStaticUrl = (value) =>
    typeof value === "string"
      ? value.replaceAll(
          officialStaticPrefix,
          "/activity-outer-assets",
        )
      : value;

  for (const property of ["src", "srcset"]) {
    const descriptor = Object.getOwnPropertyDescriptor(
      HTMLImageElement.prototype,
      property,
    );
    if (!descriptor?.set || !descriptor.get) continue;
    Object.defineProperty(HTMLImageElement.prototype, property, {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      get: descriptor.get,
      set(value) {
        descriptor.set.call(this, localizeOfficialStaticUrl(value));
      },
    });
  }

  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function setAttribute(name, value) {
    const nextValue =
      this instanceof HTMLImageElement &&
      ["src", "srcset"].includes(String(name).toLowerCase())
        ? localizeOfficialStaticUrl(value)
        : value;
    return originalSetAttribute.call(this, name, nextValue);
  };

  const defaultSearch =
    "?goodsId=900002858&itemId=500010402&ssuId=600024175&type=3d";
  if (!window.location.search) {
    window.history.replaceState(
      {},
      "",
      `/configurator/select${defaultSearch}`,
    );
  }

  const apiRoutes = [
    [
      "/mtop/guidemarketing/product/car-configurator/get",
      "/official-api/localized-car-configurator-get.json",
    ],
    [
      "/mtop/guidemarketing/tree/bundle",
      "/official-api/localized-tree-bundle.json",
    ],
    [
      "/mtop/guidemarketing/product/materialV2",
      "/official-api/localized-materialV2.json",
    ],
    [
      "/mtop/carlife/point/bookDrive/check3DEntrance",
      "/official-api/localized-check3DEntrance.json",
    ],
    ["/mtop/user/userinfo", "/official-api/localized-userinfo.json"],
    ["/mtop/carshop/cart/add", "/official-api/cart-add"],
  ];

  const mapRequest = (input) => {
    try {
      const url = new URL(String(input), window.location.href);
      const route = apiRoutes.find(([pathname]) => url.pathname === pathname);
      return {
        url: route?.[1] ?? String(input),
        isLocal: Boolean(route),
        preserveRequest:
          route?.[0] === "/mtop/carshop/cart/add",
      };
    } catch {
      return {
        url: String(input),
        isLocal: false,
        preserveRequest: false,
      };
    }
  };

  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const inputUrl = input instanceof Request ? input.url : String(input);
    try {
      if (new URL(inputUrl, window.location.href).hostname ===
        "sentry.d.xiaomi.net") {
        return Promise.resolve(new Response(null, { status: 204 }));
      }
    } catch {}

    const mapped = mapRequest(
      inputUrl,
    );
    if (mapped.isLocal) {
      return originalFetch(mapped.url, mapped.preserveRequest
        ? init
        : { ...init, method: "GET", body: undefined });
    }
    return originalFetch(input, init);
  };

  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function open(method, url, ...rest) {
    const mapped = mapRequest(url);
    this.__xiaomiOfficialLocalRequest = mapped.isLocal;
    this.__xiaomiOfficialPreserveRequest = mapped.preserveRequest;
    return originalOpen.call(
      this,
      this.__xiaomiOfficialLocalRequest &&
        !this.__xiaomiOfficialPreserveRequest
        ? "GET"
        : method,
      mapped.url,
      ...rest,
    );
  };

  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function send(body) {
    return originalSend.call(
      this,
      this.__xiaomiOfficialLocalRequest &&
        !this.__xiaomiOfficialPreserveRequest
        ? null
        : body,
    );
  };

  window.onetrack = () => {};
})();
