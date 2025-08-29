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
                    "it-contact": resolve(__dirname, 'it-contact.html'),
                    rosbank: resolve(__dirname, 'rosbank.html'),
                    vtb: resolve(__dirname, 'vtb.html'),
                    "health": resolve(__dirname, 'health.html'),
                    "draft": resolve(__dirname, 'index.html'),
                    yandex_9e20bf8c2d6c26fe: resolve(__dirname, 'yandex_9e20bf8c2d6c26fe.html')
                }
            }
        },
        plugins: [
            ViteImageOptimizer({
                /* pass your config */
            }),
        ],
    };
});
