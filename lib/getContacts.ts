import { Contact } from "@/app/types/types";
import { readFile } from "fs/promises";
import path from "path";

export async function getContacts(): Promise<Contact[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "test-json-data",
    "mock_db.json"
  );
  const fileContents = await readFile(filePath, "utf8");
  return JSON.parse(fileContents) as Contact[];
}
