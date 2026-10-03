import groq from "groq";
import { client } from "../../../shared/client";
import type { ContactsData } from "../model/contacts.types";

/** Контакты — синглтон, поэтому берём первый документ. */
export async function getContacts(): Promise<ContactsData | null> {
	const query = groq`*[_type == "contacts"][0] {
    whatsapp,
    phone,
    email
  }`;

	return await client.fetch(query);
}
