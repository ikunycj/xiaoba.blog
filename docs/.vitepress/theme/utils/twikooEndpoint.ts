const probeCache = new Map<string, Promise<void>>();

function normalizeEnvId(envId: string): string {
  const trimmed = envId.trim();
  return trimmed.replace(/\/+$/, "");
}

function buildProbeMessage(status: number, envId: string): string {
  if (status === 404 || status === 405) {
    return `评论服务地址不可用（HTTP ${status}）。当前 envId 指向的地址很可能是静态站点而非 Twikoo 云函数：${envId}`;
  }
  return `评论服务请求失败（HTTP ${status}），请检查 Twikoo 后端部署状态：${envId}`;
}

export async function ensureTwikooEndpointReady(envId: string): Promise<void> {
  if (typeof window === "undefined") return;

  const normalized = normalizeEnvId(envId);
  if (!normalized) {
    throw new Error("缺少评论配置：请在 themeConfig.twikoo.envId 中设置 Twikoo 云函数地址。");
  }

  if (probeCache.has(normalized)) {
    await probeCache.get(normalized);
    return;
  }

  const probeTask = (async () => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 6_000);

    try {
      const response = await fetch(normalized, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "getRecentComments",
          pageSize: 1,
          includeReply: false,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(buildProbeMessage(response.status, normalized));
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`评论服务连接超时，请检查网络或服务状态：${normalized}`);
      }

      if (error instanceof Error && error.message) {
        throw error;
      }

      throw new Error(`无法连接评论服务，请确认 Twikoo 后端地址正确：${normalized}`);
    } finally {
      window.clearTimeout(timer);
    }
  })();

  probeCache.set(normalized, probeTask);

  try {
    await probeTask;
  } catch (error) {
    probeCache.delete(normalized);
    throw error;
  }
}
