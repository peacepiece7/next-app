# 작업 흐름

## 설치

`npx create-next-app@latest`

## prisma 설치

`npm i -D prisma`

- prisma 폴더 생성됨

## docker-compose.yml (postgresql 설치)

```yml
version: '3'
services:
  db:
    image: postgres:latest
    restart: always
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: 'POSTGRES_USER_FOO'
      POSTGRES_PASSWORD: 'P@SSW0RD_FOO'
    volumes:
      - ./data:/var/lib/postgresql/data
```

### 매핑 체크하기

```
# prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# .env
DATABASE_URL = postgresql://postgres:password@localhost:5432/mydb?schema=public
DATABASE_URL = postgresql://<ID>:<PASSWORD>@localhost:5432/<DB_SCHEMA>?schema=public

# docker-compose.yml
environment:
   POSTGRES_USER: 'postgres'
   POSTGRES_PASSWORD: 'password'
```

### schema 생성 및 데이터베이스 생성

- docker desktop 실행, pgAdmin 실행
- Register -> Server 생성 .env DATABASE_URL 참고하여 생성
- https://www.prisma.io/docs/orm/prisma-schema/overview 여기 참고해서 prisma/schema.prisma에 schema 작성
- `npx prisma db push` 로 데이터베이스 생성
- pgAdmin schema refresh하고 tables 확인

<img src="./public/1.png" />

## Next Auth

`npm i next-auth @prisma/client @next-auth/prisma-adapter`

`src/app/api/auth/[...nextauth]/route.ts`에 다음 코드 추가

```ts
/**
 * @note Next Auth 설정 참고 링크
 * @see {@link https://next-auth.js.org/getting-started/example}
 * @see {@link https://next-auth.js.org/providers/credentials}
 */
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter a your name',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter a your password',
        },
      },
      async authorize(credentials, req) {
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }
        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // jwt | database 로 세선 저장 전략 설정
  },
}
```

- `import { SessionProvider } from 'next-auth/react'`도 클라언트 컴포넌트 최상단에 추가
- `import { signIn, signOut, useSession } from 'next-auth/react'`으로 클라이언트에서 사용

# products upload 페이지

cloudinary 사용

`npm install next-cloudinary`

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME을 .env에 추가해줘야 동작함

cloudinary로 이동

- settings에서 upload presets 생성

<img src="./public/2.png" />

```tsx
const uploadPreset = 'oimvse4k'
export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url)
  }
// ...나머지 로직
```

next.config.mjs에 다음 코드 추가

```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https:',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '*',
      },
    ],
  },
}
```
