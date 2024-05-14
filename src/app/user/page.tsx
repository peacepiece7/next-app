import { authOptions } from '@/service/nextAuth'
import { getServerSession } from 'next-auth'

export default async function UserPage() {
  const session = await getServerSession(authOptions)

  return <div>로그인된 유저만 접근할 수 있는 페이지</div>
}
