import { BUN_VERSION, ELYSIA_VERSION, HANDIN_VERSION } from "./version_helper.js";

const PLACEHOLDERS = {
  BUN_VERSION: BUN_VERSION,
  ELYSIA_VERSION: ELYSIA_VERSION,
  HANDIN_VERSION: HANDIN_VERSION,
} as const;

async function placeholderHelper(content: string): Promise<string> {
  let result = content;
  for (const [key, value] of Object.entries(PLACEHOLDERS)) result = result.split("{{" + key + "}}").join(value);

  return result;
}

export { placeholderHelper };
