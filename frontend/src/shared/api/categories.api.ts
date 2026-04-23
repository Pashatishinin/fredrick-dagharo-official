import groq from "groq";
import { client } from "../client";
import type { Category } from "../types/base.types";

export async function getCategories(): Promise<Category[]> {
	const query = groq`*[_type == "category"]{ 
  title, 
  "slug":slug.current }`;
	return await client.fetch(query);
}
