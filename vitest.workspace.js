import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineWorkspace } from 'vitest/config'

import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineWorkspace([
  'vite.config.js',
  {
    extends: 'vite.config.js',
    plugins: [
      storybookTest({ configDir: path.join(__dirname, '.storybook') }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }]
      },
      setupFiles: ['.storybook/vitest.setup.js'],
    },
  },
]);
