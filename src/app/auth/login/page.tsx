'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export default function Login() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true)
    try {
      const data = await signIn('credentials', body)
      alert('Login success')
      router.push('/')
    } catch (error) {
      alert('Login failed')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='gird h-[calc(100vh_-_56px)] place-items-center'>
      <form
        className='flex flex-col justify-center gap-4 min-w-[350px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-2xl'>Login</h1>
        <Input
          id='email'
          label='Email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='password'
          label='Password'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button label='Login' />
        <div className='text-center'>
          <p className='text-gray-400'>
            Not a member?{' '}
            <Link href='/auth/register' className='text-black hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}
