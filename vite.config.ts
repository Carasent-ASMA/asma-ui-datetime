import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import terser from '@rollup/plugin-terser'
import * as packageJson from './package.json'

const peerDependencyNames = Object.keys(packageJson.peerDependencies)

const isExternalDependency = (id: string) => {
    if (id === 'react/jsx-runtime' || id === 'react/jsx-dev-runtime') {
        return true
    }

    return peerDependencyNames.some((dependency) => id === dependency || id.startsWith(`${dependency}/`))
}

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic',
        }),
        tsConfigPaths(),
        dts({
            insertTypesEntry: true,
            exclude: ['node_modules/**/*', 'src/stories/**', 'src/**/*.stories.tsx', 'src/components/**/makeData.ts'],
        }),
    ],
    build: {
        lib: {
            entry: resolve('src', 'index.ts'),
            name: 'asma-ui-datetime',
            formats: ['es'],
            fileName: (format) => `asma-ui-datetime.${format}.js`,
        },
        rollupOptions: {
            external: isExternalDependency,
            output: {
                globals: {
                    react: 'React',
                    'react/jsx-runtime': 'react/jsx-runtime',
                    'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
                    'react-dom': 'ReactDOM',
                },
                plugins: [terser()],
            },
        },
    },
})
