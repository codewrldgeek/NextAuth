
/**
 * An array of public routes that do not require authentication.
 * These routes do not require auth
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
];
/**
 * An array of public routes that require authentication.
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
];
/**
 * The prefix for API auth routes.
 * Eoutes that start with this prefix are used for API auth purposes
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";
/**
 * The default redirect path after logging in
 * @type {string[]}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/settings";