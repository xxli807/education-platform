import { lazy, Suspense } from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
  createHashHistory,
  Outlet,
} from '@tanstack/react-router';

const USER_STORAGE_KEY = 'user';

function getStoredUser() {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

// Auth guard for protected routes
const authGuard = () => {
  if (!getStoredUser()) {
    throw redirect({ to: '/login' });
  }
};

// Guard for login route (redirect away if already authed)
const loginGuard = () => {
  if (getStoredUser()) {
    throw redirect({ to: '/' });
  }
};

// Lazy load components to reduce bundle size
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const MathSection = lazy(() => import('./components/MathSection'));
const EnglishSection = lazy(() => import('./components/EnglishSection'));
const ScienceSection = lazy(() => import('./components/ScienceSection'));
const ThinkingSection = lazy(() => import('./components/ThinkingSection'));
const HolidayTodoSection = lazy(
  () => import('./components/HolidayTodoSection')
);
const PlayZoneSection = lazy(() => import('./components/PlayZoneSection'));
const MathsOlympiadSection = lazy(
  () => import('./components/MathsOlympiadSection')
);
const TestsSection = lazy(() => import('./components/TestsSection'));

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  ),
});

// Public route - login
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: loginGuard,
  component: Login,
});

// Protected routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: authGuard,
  component: Dashboard,
});

const mathRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/math',
  beforeLoad: authGuard,
  component: MathSection,
});

const englishRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/english',
  beforeLoad: authGuard,
  component: EnglishSection,
});

const scienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/science',
  beforeLoad: authGuard,
  component: ScienceSection,
});

const thinkingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/thinking',
  beforeLoad: authGuard,
  component: ThinkingSection,
});

const holidayTodoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/holiday-todo',
  beforeLoad: authGuard,
  component: HolidayTodoSection,
});

const playRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/play',
  beforeLoad: authGuard,
  component: PlayZoneSection,
});

const olympiadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/olympiad',
  beforeLoad: authGuard,
  component: MathsOlympiadSection,
});

const testsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tests',
  beforeLoad: authGuard,
  component: TestsSection,
});

// Build route tree
const routeTree = rootRoute.addChildren([
  loginRoute,
  indexRoute,
  mathRoute,
  englishRoute,
  scienceRoute,
  thinkingRoute,
  holidayTodoRoute,
  playRoute,
  olympiadRoute,
  testsRoute,
]);

// Create router
export const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
