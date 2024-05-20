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
