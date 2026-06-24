import { developerTexts } from "./data/developer";
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
