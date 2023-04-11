import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        alias: [
            { find: '@types-customs', replacement: './src/types' },
            { find: '@domain', replacement: './src/domain' },
            { find: '@configs', replacement: './src/configs' },
            { find: '@application', replacement: './src/application' },
            { find: '@application-contracts', replacement: './src/application/application-contracts' },
            { find: '@infra', replacement: './src/infra' },
            { find: '@infra-adapters', replacement: './src/infra/infra-adapters' },
            { find: '@infra-libs', replacement: './src/infra/infra-libs' },
            { find: '@utils', replacement: './src/utils' },
        ],
    },
})