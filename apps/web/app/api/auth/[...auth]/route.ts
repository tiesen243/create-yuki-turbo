import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { OAuth2RequestError } from 'arctic'

import { OAuth } from '@yuki/auth/oauth'

import { signIn } from '@/lib/auth/server'

// export const runtime = 'edge'

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ auth: [string, string] }> },
) => {
  const nextUrl = new URL(req.url)

  const [provider, isCallback] = (await params).auth
  const callbackUrl = `${nextUrl.origin}/api/auth/${provider}/callback`

  const authProvider = new OAuth('discord', callbackUrl)

  if (!isCallback) {
    const { url, state } = authProvider.getOAuthUrl()
      ; (await cookies()).set('oauth_state', `${state}`)

    return NextResponse.redirect(new URL(`${url}`, nextUrl))
  }

  try {
    const code = nextUrl.searchParams.get('code') ?? ''
    const state = nextUrl.searchParams.get('state') ?? ''
    const storedState = req.cookies.get('oauth_state')?.value ?? ''
      ; (await cookies()).delete('oauth_state')

    if (!code || !state || state !== storedState) throw new Error('Invalid state')

    const user = await authProvider.callback(code)
    await signIn(user.id)

    return NextResponse.redirect(new URL('/', nextUrl))
  } catch (e) {
    if (e instanceof OAuth2RequestError)
      return NextResponse.json({ error: e.message }, { status: Number(e.code) })
    else if (e instanceof Error)
      return NextResponse.json({ error: e.message }, { status: 500 })
    else return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}
