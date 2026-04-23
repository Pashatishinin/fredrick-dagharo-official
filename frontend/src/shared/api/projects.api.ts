import groq from "groq";
import { client } from "../client";
import type { ProjectData } from "../types/base.types";

export async function getProjects(): Promise<ProjectData[]> {
	const query = groq`*[_type == "project"]{ 
  title, 
  subTitle,
  img, 
  isBig, 
  gifImage, 
  videoUrl, 
  description, 
  date, 
  categories[]-> {
    title,
    "slug": slug.current
  }   }`;
	return await client.fetch(query);
}
