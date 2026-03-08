const probeCache = new Map<string, Promise<void>>();

type HealthPayload = {
  code?: number;
  message?: string;
  version?: string;
};

function normalizeEnvId(envId: string): string {
  return envId.trim().replace(/\/+$/, "");
}

function buildHttpErrorMessage(status: number, envId: string): string {
  if (status === 404 || status === 405) {
    return `评论服务地址不可用（HTTP ${status}）。当前 envId 很可能不是 Twikoo 云函数地址：${envId}`;
  }
  return `评论服务请求失败（HTTP ${status}），请检查 Twikoo 后端部署状态：${envId}`;
}

function buildInvalidPayloadMessage(envId: string): string {
  return `评论服务地址可访问，但返回的不是 Twikoo 健康信息。请确认 envId 指向 Twikoo 云函数地址：${envId}`;
}

function isHealthyPayload(payload: HealthPayload): boolean {
  if (payload.code === 100) return true;
  const message = typeof payload.message === "string" ? payload.message : "";
  return /Twikoo\s*云函数运行正常/i.test(message);
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
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(buildHttpErrorMessage(response.status, normalized));
      }

      const text = await response.text();
      let payload: HealthPayload | null = null;

      try {
        payload = JSON.parse(text) as HealthPayload;
      } catch {
        payload = null;
      }

      if (!payload || typeof payload !== "object" || !isHealthyPayload(payload)) {
        throw new Error(buildInvalidPayloadMessage(normalized));
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
