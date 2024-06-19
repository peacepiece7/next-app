# Bind for 0.0.0.0:5432 failed: port is already allocated

docker로 postSQL 실행 안될때

docker-compose down 으로 끄고
docker-compose up -d

안되면 docker 정리하고 다시 시도.

data/\* 파일이 생성되는데 이건 뭔지 모르곘음

Bind for 0.0.0.0:5432 failed: port is already allocated

power shell
`netstat -ano | findstr :5432`
`taskkill /PID <PID> /F`

docker-compose down

docker-compose up -d // -d : 백그라운드 실행, default는 foreground

# FATAL: pg_hba.conf rejects connection for host "172.18.0.1", user "postgres", database "postgres", no encryption

/var/lib/postgresql/data/pg_hba.conf 에 호스트를 추가해줬는데 실패했음

내 경우엔 docker-compose down으로 종료하고 docker-compose up -d로 다시 실행하니 해결됨

이미지를 제거하거나, data 폴더를 삭제하고 다시 실행해보는 것도 방법

# docker 명렁어

docker ps

docker ps -a

docker rm <container id>

docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=1234 --name postgres postgres

docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=password -e TZ=Asia/Seoul -v ./data:/var/lib/pstgresql/data -d postgres:latest

docker exec -it <container name> bash
