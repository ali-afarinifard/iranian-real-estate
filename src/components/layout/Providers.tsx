"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { I18nProvider } from "./I18nProvider";
import { ThemeProvider } from "@/styles/ThemeProvider";
import { NotificationStack } from "@/components/shared/NotificationStack";

async function initMSW(): Promise<void> {
  if (typeof window === "undefined") return;
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.NEXT_PUBLIC_USE_MSW !== "true"
  )
    return;

  try {
    const { worker } = await import("@/mock/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: { url: "/mockServiceWorker.js" },
    });
    console.log("[MSW] ✅ Ready");
  } catch (err) {
    console.warn("[MSW] Failed to start:", err);
  }
}

let mswPromise: Promise<void> | null = null;

function getMSWPromise() {
  if (!mswPromise) {
    mswPromise = initMSW();
  }
  return mswPromise;
}

function MSWWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getMSWPromise().then(() => setReady(true));
  }, []);

  if (!ready) {
    // Show a minimal full-page loader while MSW boots
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          color: "#64748B",
        }}
      >
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <MSWWrapper>
        <I18nProvider>
          <ThemeProvider>
            {children}
            <NotificationStack />
          </ThemeProvider>
        </I18nProvider>
      </MSWWrapper>
    </Provider>
  );
}
