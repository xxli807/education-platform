import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { User } from '../types';

const USER_QUERY_KEY = ['currentUser'] as const;
const USER_STORAGE_KEY = 'user';

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
    mutationFn: async ({ username }: { username: string }) => {
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
