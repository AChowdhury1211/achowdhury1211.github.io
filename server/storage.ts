import { type Subscription, type InsertSubscription, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  createSubscription(sub: InsertSubscription): Promise<Subscription>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private subscriptions: Map<number, Subscription>;
  private contacts: Map<number, Contact>;
  private currentSubId: number;
  private currentContactId: number;

  constructor() {
    this.subscriptions = new Map();
    this.contacts = new Map();
    this.currentSubId = 1;
    this.currentContactId = 1;
  }

  async createSubscription(sub: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubId++;
    const subscription: Subscription = {
      ...sub,
      id,
      createdAt: new Date(),
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const submission: Contact = {
      ...contact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, submission);
    
    // Log that this would normally send an email to achowdhury1211@gmail.com in a real environment
    console.log(`Would send email to: achowdhury1211@gmail.com`);
    console.log(`From: ${contact.name} (${contact.email})`);
    console.log(`Service Tier: ${contact.serviceTier}`);
    console.log(`Message: ${contact.message}`);
    
    return submission;
  }
}

export const storage = new MemStorage();
