import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import {setupURLPolyfill} from 'react-native-url-polyfill';

setupURLPolyfill();

const supabase = createClient(
  'https://lbfnyxljjlwywykykjoo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZm55eGxqamx3eXd5a3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzNTUwMDMsImV4cCI6MjAyNjkzMTAwM30.-AI0RLTErL_NpZxaZLcYjdWEIqqYjPSolKyQ10JD72o',
  {
    auth: {
      detectSessionInUrl: false,
      storage: AsyncStorage,
    },
  },
);

export default supabase;
