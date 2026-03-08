type ProfileField = "nick" | "mail" | "link";

type CachedProfile = {
  nick: string;
  mail: string;
  link: string;
  updatedAt: number;
};

const DEFAULT_STORAGE_KEY = "xb:twikoo:profile";

const FIELD_SELECTORS: Record<ProfileField, string[]> = {
  nick: [
    'input[name="nick"]',
    'input.tk-input[name="nick"]',
    'input[placeholder*="昵称"]',
    'input[aria-label*="昵称"]',
  ],
  mail: [
    'input[name="mail"]',
    'input[type="email"]',
    'input[placeholder*="邮箱"]',
    'input[placeholder*="email" i]',
    'input[aria-label*="邮箱"]',
  ],
  link: [
    'input[name="link"]',
    'input[type="url"]',
    'input[placeholder*="网址"]',
    'input[placeholder*="网站"]',
    'input[placeholder*="url" i]',
    'input[aria-label*="网址"]',
  ],
};

function isInput(el: Element | null): el is HTMLInputElement {
  return !!el && el instanceof HTMLInputElement;
}

function findInput(root: ParentNode, field: ProfileField): HTMLInputElement | null {
  for (const selector of FIELD_SELECTORS[field]) {
    const found = root.querySelector(selector);
    if (isInput(found)) return found;
  }
  return null;
}

function sanitize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function readCache(storageKey: string): CachedProfile | null {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CachedProfile>;
    return {
      nick: typeof parsed.nick === "string" ? parsed.nick : "",
      mail: typeof parsed.mail === "string" ? parsed.mail : "",
      link: typeof parsed.link === "string" ? parsed.link : "",
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
    };
  } catch {
    return null;
  }
}

function writeCache(storageKey: string, value: CachedProfile): void {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    // Ignore write failures caused by browser privacy mode/quota.
  }
}

function dispatchValueEvents(input: HTMLInputElement): void {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function hydrateFromCache(root: ParentNode, cache: CachedProfile): void {
  const nickInput = findInput(root, "nick");
  const mailInput = findInput(root, "mail");
  const linkInput = findInput(root, "link");

  if (nickInput && !sanitize(nickInput.value) && cache.nick) {
    nickInput.value = cache.nick;
    dispatchValueEvents(nickInput);
  }
  if (mailInput && !sanitize(mailInput.value) && cache.mail) {
    mailInput.value = cache.mail;
    dispatchValueEvents(mailInput);
  }
  if (linkInput && !sanitize(linkInput.value) && cache.link) {
    linkInput.value = cache.link;
    dispatchValueEvents(linkInput);
  }
}

function readCurrentProfile(root: ParentNode): Omit<CachedProfile, "updatedAt"> {
  return {
    nick: sanitize(findInput(root, "nick")?.value || ""),
    mail: sanitize(findInput(root, "mail")?.value || ""),
    link: sanitize(findInput(root, "link")?.value || ""),
  };
}

function bindInput(root: ParentNode, field: ProfileField, onPersist: () => void): void {
  const input = findInput(root, field);
  if (!input || input.dataset.xbCacheBound === "1") return;

  input.dataset.xbCacheBound = "1";
  input.addEventListener("blur", onPersist);
  input.addEventListener("change", onPersist);
  input.addEventListener("input", onPersist);
}

function persistProfile(storageKey: string, root: ParentNode): void {
  const current = readCurrentProfile(root);
  const previous = readCache(storageKey);
  const profile: CachedProfile = {
    nick: current.nick || previous?.nick || "",
    mail: current.mail || previous?.mail || "",
    link: current.link || previous?.link || "",
    updatedAt: Date.now(),
  };

  writeCache(storageKey, profile);
}

function initProfileCache(root: ParentNode, storageKey: string): void {
  const cached = readCache(storageKey);
  if (cached) hydrateFromCache(root, cached);

  const onPersist = () => {
    persistProfile(storageKey, root);
  };

  bindInput(root, "nick", onPersist);
  bindInput(root, "mail", onPersist);
  bindInput(root, "link", onPersist);
}

export function setupTwikooProfileCache(
  container: HTMLElement,
  storageKey = DEFAULT_STORAGE_KEY
): () => void {
  if (typeof window === "undefined") return () => {};

  let rafId = 0;
  const rerender = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = 0;
      initProfileCache(container, storageKey);
    });
  };

  rerender();
  const observer = new MutationObserver(() => rerender());
  observer.observe(container, { childList: true, subtree: true });

  return () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    observer.disconnect();
  };
}
