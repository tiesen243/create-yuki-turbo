import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

import type { Route } from './+types/_index'
import { Post } from '@/components/post'

export const loader = ({ context }: Route.LoaderArgs) => {
  return { session: context.cookies.auth_session }
}

export default ({ loaderData }: Route.ComponentProps) => {
  const session = loaderData.session

  return (
    <main className="container flex min-h-dvh max-w-screen-lg flex-col items-center justify-center overflow-x-hidden">
      <div className="pointer-events-none relative flex place-items-center before:absolute before:h-[700px] before:w-[140px] before:translate-x-1 before:translate-y-[-10px] before:rotate-[-32deg] before:rounded-full before:bg-gradient-to-r before:from-[#AB1D1C] before:to-[#E18317] before:opacity-30 before:blur-[100px] before:content-[''] lg:before:h-[700px] lg:before:w-[240px] lg:before:translate-x-[-100px]" />

      <img
        src="https://tiesen.id.vn/assets/tiesen.png"
        width={2500}
        height={400}
        alt="tiesen"
        loading="lazy"
      />

      <Typography level="h1" className="mb-4 text-center brightness-150">
        A Next.js template with{' '}
        <span className="bg-[linear-gradient(135deg,#3178C6,69%,hsl(var(--background)))] bg-clip-text text-transparent">
          TypeScript
        </span>
        ,{' '}
        <span className="bg-[linear-gradient(135deg,#06B6D4,69%,hsl(var(--background)))] bg-clip-text text-transparent">
          Tailwind CSS
        </span>
        ,{' '}
        <span className="bg-[linear-gradient(135deg,#4B32C3,69%,hsl(var(--background)))] bg-clip-text text-transparent">
          ESLint
        </span>{' '}
        and{' '}
        <span className="bg-[linear-gradient(135deg,#F7B93E,69%,hsl(var(--background)))] bg-clip-text text-transparent">
          Prettier
        </span>
      </Typography>

      {session ? (
        <>
          <div className="flex items-center justify-center gap-4">
            <Typography className="text-center text-2xl">Logged in as {session}</Typography>

            <form>
              <Button size="sm">Sign out</Button>
            </form>
          </div>

          <Post />
        </>
      ) : (
        <form action="/api/auth/discord">
          <Button size="lg">Sign in with Discord</Button>
        </form>
      )}
    </main>
  )
}
