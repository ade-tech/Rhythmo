/**
 * supabase module
 *
 * Initializes and exports the Supabase client for database and authentication operations.
 *
 * Usage:
 * - Used throughout the app for interacting with Supabase services.
 */
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
