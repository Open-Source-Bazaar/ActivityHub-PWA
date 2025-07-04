module.exports = {
    globDirectory: 'dist/',
    globPatterns: [
        '**/*.{html,css,js,json,webmanifest,ico,gif,jpg,jpeg,png,webp}'
    ],
    swDest: 'dist/sw.js',
    importScripts: ['https://unpkg.com/workbox-sw@7.3.0/build/workbox-sw.js'],
    clientsClaim: true,
    cleanupOutdatedCaches: true
};
