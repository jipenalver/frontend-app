// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Import supabase
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://lsuibxpvxqrxhkmxcmwy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzdWlieHB2eHFyeGhrbXhjbXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIwNjUyMzQsImV4cCI6MTk5NzY0MTIzNH0.qesflUyB8fXj7PN7shZDrzo_voKwCVfCtz4YxFvHh3c"
);

export { supabase };
