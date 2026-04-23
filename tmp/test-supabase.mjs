import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = readFileSync('.env.local', 'utf8');
const vars = {};
env.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && trimmed[0] !== '#') {
    const idx = trimmed.indexOf('=');
    if (idx > -1) {
      vars[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  }
});

const sb = createClient(vars.NEXT_PUBLIC_SUPABASE_URL, vars.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const { error } = await sb.from('_test').select('*');

if (error && error.code === '42P01') {
  console.log('✓ Supabase connected — no tables yet, ready for Sprint 2');
} else if (error) {
  console.log('✗ Error:', error.message);
} else {
  console.log('✓ Supabase connected');
}
