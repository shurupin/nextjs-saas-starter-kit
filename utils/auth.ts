import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';
import { getUser } from './supabase/queries';

// Helper function to check authentication and redirect if authenticated
export async function checkUserAndRedirect() {
  const supabase = createClient();
  const [user] = await Promise.all([getUser(supabase)]);

  if (user) {
    return redirect('/dashboard');
  }

  return null;
}
