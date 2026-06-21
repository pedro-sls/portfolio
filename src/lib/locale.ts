import { headers } from "next/headers";

export type Locale = "en" | "pt";

export async function getPreferredLocale(): Promise<Locale> {
  const acceptLanguage = (await headers()).get("accept-language") ?? "";
  const primaryLanguage = acceptLanguage
    .split(",")
    .map((language) => language.split(";")[0]?.trim().toLowerCase())
    .find(Boolean);

  return primaryLanguage?.startsWith("pt") ? "pt" : "en";
}

export function getHtmlLang(locale: Locale) {
  return locale === "pt" ? "pt-BR" : "en";
}
