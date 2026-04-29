const QUOTE_REQUESTS_KEY = "tradebridge.quoteRequests";
const CONTACT_MESSAGES_KEY = "tradebridge.contactMessages";
const PORTAL_EVENTS_KEY = "tradebridge.portalEvents";

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readList(key) {
  if (!hasStorage()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeList(key, items) {
  if (!hasStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(items));
}

function createRecord(prefix, payload) {
  return {
    id: `${prefix}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...payload,
  };
}

export function saveQuoteRequest(payload) {
  const record = createRecord("quote", payload);
  const items = readList(QUOTE_REQUESTS_KEY);
  items.unshift(record);
  writeList(QUOTE_REQUESTS_KEY, items);
  console.log("[tradebridge] quote request saved locally", record);
  return record;
}

export function saveContactMessage(payload) {
  const record = createRecord("contact", payload);
  const items = readList(CONTACT_MESSAGES_KEY);
  items.unshift(record);
  writeList(CONTACT_MESSAGES_KEY, items);
  console.log("[tradebridge] contact message saved locally", record);
  return record;
}

export function savePortalEvent(type, payload = {}) {
  const record = createRecord("portal", { type, payload });
  const items = readList(PORTAL_EVENTS_KEY);
  items.unshift(record);
  writeList(PORTAL_EVENTS_KEY, items);
  console.log("[tradebridge] portal event saved locally", record);
  return record;
}

export function getLocalPrototypeState() {
  return {
    quoteRequests: readList(QUOTE_REQUESTS_KEY),
    contactMessages: readList(CONTACT_MESSAGES_KEY),
    portalEvents: readList(PORTAL_EVENTS_KEY),
  };
}
