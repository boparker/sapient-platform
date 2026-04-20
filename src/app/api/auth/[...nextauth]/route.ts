import NextAuth from 'next-auth'
export const dynamic = 'force-dynamic'
import { getPrisma } from '@/lib/prisma'

const handler = NextAuth({
  // No adapter at build time — we use JWT strategy which doesn't require DB at session level
  // PrismaAdapter can be added later when we need database-backed sessions
  providers: [
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
        
        const prisma = getPrisma()
        const magicLink = await prisma.magicLink.findUnique({
          where: { token: credentials.token },
          include: { user: true },
        })
        
        if (!magicLink || magicLink.usedAt || magicLink.expiresAt < new Date()) {
          return null
        }
        
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
