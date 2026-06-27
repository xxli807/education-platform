// Generates a salted PBKDF2-SHA256 hash for the login password and prints the
// JSON to paste into public/auth.json. The plaintext password is never stored.
//
// Usage:
//   node scripts/hash-password.mjs 'your-strong-password'
//
// Then copy the printed JSON into public/auth.json and commit to main.

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs 'your-password'");
  process.exit(1);
}

const ITERATIONS = 200_000; // higher = slower to brute-force (and slower to log in)
const salt = crypto.getRandomValues(new Uint8Array(16));

const keyMaterial = await crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(password),
  'PBKDF2',
  false,
  ['deriveBits']
);
const bits = await crypto.subtle.deriveBits(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  keyMaterial,
  256
);

const hex = buf =>
  Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

console.log(
  JSON.stringify(
    {
      algo: 'PBKDF2-SHA256',
      iterations: ITERATIONS,
      saltHex: hex(salt),
      hashHex: hex(bits),
    },
    null,
    2
  )
);
