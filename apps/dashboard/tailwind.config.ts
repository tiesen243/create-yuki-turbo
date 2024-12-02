import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

import baseConfig from '@yuki/tailwind-config/web'

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...baseConfig.content, '../../packages/ui/src/ui/*.{ts,tsx}'],
  presets: [baseConfig],
  theme: { extend: { fontFamily: { sans: ['Geist', ...fontFamily.sans] } } },
} satisfies Config
