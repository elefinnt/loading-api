import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { developerMessages } from "./generate-messages/content/developer.mjs";
import { funnyMessages } from "./generate-messages/content/funny.mjs";
import { fantasyMessages } from "./generate-messages/content/fantasy.mjs";
import { animalsMessages } from "./generate-messages/content/animals.mjs";
import { sciFiMessages } from "./generate-messages/content/sci-fi.mjs";
import { validateAllMessages } from "./generate-messages/validate.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "lib", "messages", "data");

const categoryOrder = ["developer", "funny", "fantasy", "animals", "sci-fi"];
const sourceMessages = {
  developer: developerMessages,
  funny: funnyMessages,
  fantasy: fantasyMessages,
  animals: animalsMessages,
  "sci-fi": sciFiMessages,
};

const validationErrors = validateAllMessages(sourceMessages);

if (validationErrors.length > 0) {
  console.error("Message validation failed:\n");
  for (const error of validationErrors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const exportNames = {
  developer: "developerTexts",
  funny: "funnyTexts",
  fantasy: "fantasyTexts",
  animals: "animalsTexts",
  "sci-fi": "sciFiTexts",
};

for (const category of categoryOrder) {
  const texts = sourceMessages[category];
  const exportName = exportNames[category];
  const fileName = category === "sci-fi" ? "sci-fi.ts" : `${category}.ts`;
  const content = `export const ${exportName} = ${JSON.stringify(texts, null, 2)} as const;\n`;
  writeFileSync(join(outDir, fileName), content, "utf8");
  console.log(`${category}: ${texts.length} messages`);
}

const indexContent = `import { developerTexts } from "./data/developer";
import { funnyTexts } from "./data/funny";
import { fantasyTexts } from "./data/fantasy";
import { animalsTexts } from "./data/animals";
import { sciFiTexts } from "./data/sci-fi";
import type { Message } from "@/types/message";

const categoryTexts: { category: string; texts: readonly string[] }[] = [
  { category: "developer", texts: developerTexts },
  { category: "funny", texts: funnyTexts },
  { category: "fantasy", texts: fantasyTexts },
  { category: "animals", texts: animalsTexts },
  { category: "sci-fi", texts: sciFiTexts },
];

export const messages: Message[] = categoryTexts.flatMap(({ category, texts }) =>
  texts.map((message) => ({
    id: 0,
    message,
    category,
  })),
).map((message, index) => ({
  ...message,
  id: index + 1,
}));
`;

writeFileSync(join(outDir, "..", "index.ts"), indexContent, "utf8");
console.log(`Total: ${categoryOrder.length * 100} messages`);
