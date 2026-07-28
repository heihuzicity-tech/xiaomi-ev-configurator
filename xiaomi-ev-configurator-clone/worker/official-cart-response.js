const decodeRequestBody = (rawBody) => {
  let decoded = String(rawBody ?? "").replaceAll("+", " ");
  for (let pass = 0; pass < 2; pass += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  return decoded;
};

const formatAmount = (amount) =>
  String(Math.max(0, Math.round(amount))).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ",",
  );

export const buildOfficialCartResponse = (
  template,
  configMeta,
  rawBody,
) => {
  const response = structuredClone(template);
  const decodedBody = decodeRequestBody(rawBody);
  const selectedSsuIds = [];
  const seenSsuIds = new Set();
  const ssuPattern = /["']?ssuId["']?\s*[:=]\s*["']?(\d{6,})/g;

  for (const match of decodedBody.matchAll(ssuPattern)) {
    const ssuId = match[1];
    if (configMeta.items[ssuId] && !seenSsuIds.has(ssuId)) {
      seenSsuIds.add(ssuId);
      selectedSsuIds.push(ssuId);
    }
  }

  if (selectedSsuIds.length === 0) {
    for (const ssuId of configMeta.defaultSsuIds) {
      selectedSsuIds.push(String(ssuId));
    }
  }

  const selectedItems = selectedSsuIds
    .map((ssuId) => configMeta.items[ssuId])
    .filter(Boolean);
  const presentTotal =
    configMeta.basePresentTotal +
    selectedItems.reduce((sum, item) => sum + item.price, 0);
  const originalTotal =
    configMeta.baseOriginalTotal +
    selectedItems.reduce((sum, item) => sum + item.marketPrice, 0);
  const selectedOptionTotal = selectedItems.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  const cart = response.data.cart;
  const mainProduct =
    cart.groups[0].groups[0].productItems[0];
  mainProduct.properties.subProducts = selectedSsuIds.map((ssuId) => ({
    ssuId,
  }));
  cart.feeDetail = {
    presentTotal,
    originalTotal,
  };
  cart.extend = {
    ...cart.extend,
    car_aps_week:
      `定制服务需选配满¥${formatAmount(configMeta.customThreshold)}` +
      `，已选¥${formatAmount(selectedOptionTotal)}`,
  };
  response.data.result = selectedSsuIds.map(() => ({
    code: 0,
    msg: "ok",
  }));

  return response;
};
