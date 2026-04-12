import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Edge-safe auth config - no Node.js-only imports (mongoose, bcryptjs).
 * The Credentials provider is added in auth.ts where Node runtime is guaranteed.
 */
const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;
const hasValidGoogleAuth =
  !!googleClientId &&
  !!googleClientSecret &&
  googleClientId !== "your-google-client-id" &&
  googleClientSecret !== "your-google-client-secret";

export default {
  providers: hasValidGoogleAuth ? [Google] : [],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnHome = nextUrl.pathname === "/";
      const isOnAuth =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register") ||
        nextUrl.pathname.startsWith("/forgot-password") ||
        nextUrl.pathname.startsWith("/reset-password");
      const authError = nextUrl.searchParams.get("error");
      const isOauthAccountNotLinkedError = authError === "OAuthAccountNotLinked";

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to /login
      }

      // Preserve OAuthAccountNotLinked on auth pages so the login/register UI can display it.
      if (isOnAuth && isOauthAccountNotLinkedError) {
        return true;
      }

      // Logged-in users visiting public/auth pages are redirected to /dashboard.
      if ((isOnHome || isOnAuth) && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;