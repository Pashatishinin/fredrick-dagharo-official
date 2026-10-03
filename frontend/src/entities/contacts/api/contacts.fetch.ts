import * as mappers from "../model/contacts.mappers";
import type { Contacts } from "../model/contacts.types";
import * as api from "./contacts.api";

export const fetchContactsData = async (): Promise<Contacts> => {
	const contacts = await api.getContacts();
	return mappers.mapContacts(contacts);
};
