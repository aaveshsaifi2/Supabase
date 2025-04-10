import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define your data types
interface User {
  id?: number;
  name: string;
  email: string;
  age?: number;
}

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Function to insert a single user
async function insertUser(user: User): Promise<void> {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select();
  
  if (error) {
    console.error('Error inserting user:', error);
    return;
  }
  
  console.log('User inserted successfully:', data);
}

// Function to insert multiple users
async function insertMultipleUsers(users: User[]): Promise<void> {
  const { data, error } = await supabase
    .from('users')
    .insert(users)
    .select();
  
  if (error) {
    console.error('Error inserting users:', error);
    return;
  }
  
  console.log('Users inserted successfully:', data);
}

// Example usage
async function main() {
  // Example single user
  const newUser: User = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  };
  
  // Example multiple users
  const multipleUsers: User[] = [
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 25
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      age: 40
    }
  ];
  
  try {
    // Insert a single user
    await insertUser(newUser);
    
    // Insert multiple users
    await insertMultipleUsers(multipleUsers);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Run the main function
main();