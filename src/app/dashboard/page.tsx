'use client'

import { useEffect, useState } from 'react'
import { logout } from '../../lib/auth'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setUser('Authenticated User')
  })

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome {user}</h1>
      <button
        onClick={handleLogout}
        className="p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  )
}
