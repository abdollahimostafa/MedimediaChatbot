// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // use the Prisma 7 singleton
interface AuthUser {
  id: string;
  phoneNumber: string;
  name?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
        melliCode: { label: "Melli Code", type: "text" },
        phoneNumber: { label: "Phone Number", type: "text" },
        mdStatus: { label: "Status", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { firstName, lastName, melliCode, phoneNumber, mdStatus, code } = credentials;

        // Find latest unused code for this phone
        const latestCode = await prisma.code.findFirst({
          where: { phone: phoneNumber, used: false },
          orderBy: { createdAt: "desc" },
        });

        if (!latestCode || latestCode.code !== code) return null;

        // Mark code as used
        await prisma.code.update({
          where: { id: latestCode.id },
          data: { used: true },
        });

        // Find or create the user
        let user = await prisma.user.findUnique({
          where: { phoneNumber },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              firstName: firstName || "",
              lastName: lastName || "",
              melliCode: melliCode || "",
              phoneNumber,
            },
          });
        }

        return {
          id: user.id,
          name: user.firstName,
          phoneNumber: user.phoneNumber,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AuthUser;
        token.id = u.id;
        token.phoneNumber = u.phoneNumber;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          phoneNumber: token.phoneNumber as string,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Correct App Router export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
