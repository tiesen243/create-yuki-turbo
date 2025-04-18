import { cache } from 'react'

import { handlers, signOut, auth as uncachedAuth } from './config'

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const auth = cache(uncachedAuth)

export type { SessionResult } from './core/session'
export { handlers, signOut, auth }
export { Session } from './core/session'
export { Password } from './core/password'
