import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { generateState } from 'arctic'

import { discord } from '@/app/api/auth/discord/core'
import { env } from '@/env'

export const GET = async (req: NextRequest) => {
  const state = generateState()
  const url = await discord.createAuthorizationURL(state, { scopes: ['identify', 'email'] })

  const cookie = await cookies()
  cookie.set('discord_oauth_state', state, {
    path: '/',
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return NextResponse.redirect(new URL(url, req.url))
}
