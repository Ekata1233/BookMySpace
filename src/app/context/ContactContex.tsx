"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

// Define Contact Type
interface Contact {
  name: string;
  email: string;
  company?: string;
  phone: string;
  requirement: string;
  inquiry: string;
}

interface ApiResponse {
  success: boolean;
  data?: Contact;
  error?: string;
}

interface ContactContextType {
  contacts: Contact[];
  addContact: (newContact: Contact) => Promise<void>;
  refreshContacts: () => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      // const response = await axios.get<{ data: Contact[] }>("/api/contact");
      // setContacts(response.data.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Add Contact
  const addContact = async (newContact: Contact) => {
    try {
      const response = await axios.post<{ data: Contact }>("/api/contact", newContact);
      setContacts((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, addContact, refreshContacts: fetchContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};
