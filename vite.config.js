import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {bunny} from 'laravel-vite-plugin/fonts';

export default defineConfig({

    plugins: [
        laravel({
            input: ['resources/css/app.scss', 'resources/js/app.jsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
