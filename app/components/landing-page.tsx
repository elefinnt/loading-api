"use client";

import { useSyncExternalStore } from "react";
import { LandingPageAnimated } from "@/app/components/landing/landing-page-animated";
import { LandingPageStatic } from "@/app/components/landing/landing-page-static";
import type { LandingPageProps } from "@/app/components/landing/shared";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function useIsClient() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

export function LandingPage(props: LandingPageProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return <LandingPageStatic {...props} />;
  }

  return <LandingPageAnimated {...props} />;
}

export type { LandingPageProps };
