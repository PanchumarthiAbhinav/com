import { Account, Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('675a99b6001ebf02bec0');

export const account = new Account(client);
export const databases = new Databases(client);

export const collections = {
  orders: '675a99b6001ebf02bec0_orders',
};

export const databaseId = '675a99b6001ebf02bec0_default';