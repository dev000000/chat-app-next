export const register = async (username: string, password: string) => {
  try {
    const response = await fetch(`/api/proxy/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    })

    if (!response.ok) throw new Error('Registration failed')

    return await response.json()
  } catch (error) {
    throw new Error('Registration failed')
  }
}

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`/api/proxy/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    })

    if (!response.ok) throw new Error('Login failed')

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Login failed')
  }
}

export const logout = async () => {
  try {
    await fetch(`/api/proxy/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('Logout failed', error)
  }
}
