import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogin";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const user = await userLogIn(credentials.email, credentials.password);
        if (user?.success) {
          const response = await fetch(
            "https://final-project-vi-backend.vercel.app/api/v1/auth/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.token}`,
                Accept: "application/json",
              },
            }
          );

          if (response?.ok) {
            const data = await response.json();
            console.log(data.data);
            return {
              token: user.token,
              ...data.data,
            };
          }
        } else {
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/signIn",
  },
};
