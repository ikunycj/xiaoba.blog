export function formatTwikooError(error: unknown, envId = ""): string {
  const raw = error instanceof Error ? error.message : String(error || "");
  const normalized = envId.trim();

  if (/failed to fetch/i.test(raw) || /networkerror/i.test(raw)) {
    return normalized
      ? `评论服务连接失败（Failed to fetch）。请确认 envId 是可访问的 Twikoo 云函数地址，而不是静态站地址：${normalized}`
      : "评论服务连接失败（Failed to fetch）。请先配置可访问的 Twikoo 云函数地址。";
  }

  if (raw.trim().length > 0) {
    return raw;
  }

  return "评论服务请求失败，请稍后重试。";
}
