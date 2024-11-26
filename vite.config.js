import {ViteImageOptimizer} from "vite-plugin-image-optimizer";
import {defineConfig} from "vite";
import { resolve } from 'path'

export default defineConfig(() => {
    return {
        build: {
            outDir: './dist',
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                    about: resolve(__dirname, 'about.html'),
                    "ad-mortgage": resolve(__dirname, 'ad-mortgage.html'),
                    rosbank: resolve(__dirname, 'rosbank.html'),
                    vtb: resolve(__dirname, 'vtb.html'),
                    "yami-yami": resolve(__dirname, 'yami-yami.html'),
                }
            }
        },
        base: 'kostya-cv',
        plugins: [
            ViteImageOptimizer({
                /* pass your config */
            }),
        ],
    };
});
