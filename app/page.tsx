import { headers } from "next/headers";
import { LandingPage } from "@/app/components/landing-page";
import { API_VERSION } from "@/lib/api/config";
import { getCategories, getRandomMessage } from "@/lib/messages/service";

async function getBaseUrl(): Promise<string> {
  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
}

export default async function Home() {
  const baseUrl = await getBaseUrl();
  const categories = getCategories();
  const initialMessage = getRandomMessage();

  if (!initialMessage) {
    throw new Error("No messages available");
  }

  return (
    <LandingPage
      baseUrl={baseUrl}
      apiVersion={API_VERSION}
      categories={categories}
      initialMessage={initialMessage}
    />
  );
}
