import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  context: { params?: { path?: string[] } }
) {
  const params = await context.params // ✅ Ensure params are awaited

  if (!params || !params.path || params.path.length === 0) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${params.path.join(
    '/'
  )}`

  try {
    const body = await req.text() // ✅ Read raw request body

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body, // ✅ Forward raw body
      credentials: 'include',
    })

    // ✅ Check if response has JSON content
    const contentType = res.headers.get('content-type')
    const data = contentType?.includes('application/json')
      ? await res.json()
      : {}

    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
