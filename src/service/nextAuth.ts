import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from '@/libs/prismadb'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
    }),
    // https://next-auth.js.org/providers/credentials
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter a your name',
        },
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter a your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter a your password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials\n code : AD001')
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials\n code : AD002')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials\n code : AD003')
        }
        return user
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    secret: process.env.NEXTAUTH_SECRET, // 이것도  default로 process.env.NEXTAUTH_SECRET를 사용함
  },
  session: {
    strategy: 'jwt', // jwt | database 방식으로 세션 저장
  },
  callbacks: {
    // 로그인 시 반환된 사용자 정보를 JWT에 추가할 수 있다.
    // signIn, signOut의 트리거이다.
    async jwt({ token: jwtToken, user }) {
      // user가 있으면 (로그인 시) 사용자 정보를 토큰에 추가
      // if (user) {
      return { ...jwtToken, ...user }
      // }
      // 그렇지 않으면 기존 토큰 반환
      // return jwtToken
    },
    // 세션을 체크할 때 호출되는 콜백이다. /api/session에서 세션을 가져올 때 호출된다.
    // callbacks.jwt, useSession, getSession이 사용될 때 호출된다.
    async session({ session, token: jwtToken }) {
      // session.user = jwtToken
      return session
    },
  },
}
