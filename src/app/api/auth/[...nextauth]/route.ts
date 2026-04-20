import NextAuth from 'next-auth'
export const dynamic = 'force-dynamic'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Magic link provider will be added here
    // For now, we'll use a credentials provider for testing
    {
      id: 'magic-link',
      name: 'Magic Link',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.token) return null
        
        // Verify magic link token
        const magicLink = await prisma.magicLink.findUnique({
          where: { token: credentials.token },
          include: { user: true },
        })
        
        if (!magicLink || magicLink.usedAt || magicLink.expiresAt < new Date()) {
          return null
        }
        
        // Mark token as used
        await prisma.magicLink.update({
          where: { id: magicLink.id },
          data: { usedAt: new Date() },
        })
        
        return {
          id: magicLink.user.id,
          email: magicLink.user.email,
          name: magicLink.user.name,
        }
      },
    },
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})

export { handler as GET, handler as POST }