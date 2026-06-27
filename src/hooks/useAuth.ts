import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { User } from '../types';

const USER_QUERY_KEY = ['currentUser'] as const;
const USER_STORAGE_KEY = 'user';

// Where the expected password hash lives. By default we read public/auth.json,
// which Vite serves at /auth.json in dev AND bundles into the production build —
// so it just works everywhere with no external dependency.
//
// If you want to change the password WITHOUT redeploying, commit public/auth.json
// to main and set VITE_AUTH_URL to its GitHub raw URL, e.g.
//   VITE_AUTH_URL=https://raw.githubusercontent.com/xxli807/education-platform/main/public/auth.json
// BASE_URL accounts for the GitHub Pages base path (e.g. /education-platform/),
// so this resolves correctly in dev and in the deployed build.
const AUTH_URL =
  import.meta.env.VITE_AUTH_URL ?? `${import.meta.env.BASE_URL}auth.json`;

interface AuthConfig {
  iterations: number;
  saltHex: string;
  hashHex: string;
}

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(new ArrayBuffer(hex.length / 2));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Salted, slow (key-stretched) PBKDF2-SHA256 hash — same scheme as
// scripts/hash-password.mjs. One-way: the password can't be recovered from
// this, and the high iteration count makes brute-forcing impractical.
async function pbkdf2Hex(
  password: string,
  saltHex: string,
  iterations: number
): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: hexToBytes(saltHex),
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );
  return bytesToHex(bits);
}

async function verifyPassword(password: string): Promise<boolean> {
  // cache-bust so an updated password on GitHub is picked up promptly
  const res = await fetch(`${AUTH_URL}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not reach the login server. Try again.');
  const { iterations, saltHex, hashHex } = (await res.json()) as AuthConfig;
  if (!iterations || !saltHex || !hashHex) {
    throw new Error('Login is not set up yet.');
  }
  const entered = await pbkdf2Hex(password, saltHex, iterations);
  return entered.toLowerCase() === hashHex.toLowerCase();
}

export function useCurrentUser() {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: () => {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as User) : null;
    },
    staleTime: Infinity,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const ok = await verifyPassword(password);
      if (!ok) throw new Error('Wrong password. Try again!');
      const newUser = { username };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      return newUser;
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(USER_QUERY_KEY, newUser);
      navigate({ to: '/' });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem(USER_STORAGE_KEY);
    },
    onSuccess: () => {
      queryClient.setQueryData(USER_QUERY_KEY, null);
      navigate({ to: '/login' });
    },
  });
}
