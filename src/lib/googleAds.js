"use client";

export const GOOGLE_ADS_ID = "AW-18343375825";
export const CONVERSION_LABELS = {
  CONTACT_LEAD: "6g7JCLnhsNocENHn5qpE",
  PAGE_VIEW: "6g7JCLnhsNocENHn5qpE",
  PURCHASE: "nUzNCLie4dkcENHn5qpE",
};

export function trackConversion(options = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  const {
    sendTo,
    value = 1.0,
    currency = "USD",
    transactionId,
    ...rest
  } = options;

  if (!sendTo) return;

  const payload = {
    send_to: sendTo,
    value,
    currency,
    ...rest,
  };

  if (transactionId) {
    payload.transaction_id = transactionId;
  }

  try {
    window.gtag("event", "conversion", payload);
  } catch (err) {
    console.error("Google Ads conversion error:", err);
  }
}

export function trackPageViewConversion(options = {}) {
  trackConversion({
    sendTo: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.PAGE_VIEW}`,
    ...options,
  });
}

export function trackContactFormConversion(options = {}) {
  trackConversion({
    sendTo: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.CONTACT_LEAD}`,
    value: 1.0,
    currency: "USD",
    ...options,
  });
}

export function trackPurchaseConversion(options = {}) {
  const {
    value = 1.0,
    currency = "USD",
    transactionId,
    newCustomer,
    ...rest
  } = options;

  const payload = {
    sendTo: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.PURCHASE}`,
    value,
    currency,
    ...rest,
  };

  if (transactionId) {
    payload.transactionId = transactionId;
  }
  if (typeof newCustomer === "boolean") {
    payload.new_customer = newCustomer;
  }

  trackConversion(payload);
}

export function buildTransactionId(prefix = "txn") {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${ts}_${rand}`;
}
