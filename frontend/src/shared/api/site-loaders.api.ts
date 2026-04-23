import groq from "groq";
import { client } from "../client";
import type { PreLoaderData, TransitionData } from "../types/base.types";

export async function getPreLoader(): Promise<PreLoaderData> {
	const query = groq`*[_type == "siteLoader"][0]{ 
  preLoader }`;
	return await client.fetch(query);
}

export async function getTransitionLoader(): Promise<TransitionData> {
	const query = groq`*[_type == "siteLoader"][0]{ 
  transitionLoader }`;
	return await client.fetch(query);
}
