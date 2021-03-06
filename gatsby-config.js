module.exports = {
    siteMetadata: {
        title: 'Movies Worth Noting',
        description:
            'What you want to see before bed.',
    },
    plugins: [
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                // You can add multiple tracking ids and a pageview event will be fired for all of them.
                trackingIds: [
                    'G-3H90ML2VBK', // Google Analytics / GA
                ],
                pluginConfig: {
                    // Puts tracking script in the head instead of the body
                    head: true,
                },
            },
        },
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                // Setting a color is optional.
                color: `#394a4d`,
                // Disable the loading spinner.
                showSpinner: true,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                "name": "Movies Worth Noting",
                "short_name": "MWN",
                "theme_color": "#252B31",
                "background_color": "#252B31",
                "display": "standalone",
                "orientation": "portrait",
                "start_url": `/`,
                icon: `src/assets/images/favs/icon-192x192.png`,
                "icons": [
                    {
                        "src": `src/assets/images/favs/icon-192x192.png`,
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": `src/assets/images/favs/icon-256x256.png`,
                        "sizes": "256x256",
                        "type": "image/png"
                    },
                    {
                        "src": `src/assets/images/favs/icon-384x384.png`,
                        "sizes": "384x384",
                        "type": "image/png"
                    },
                    {
                        "src": `src/assets/images/favs/icon-512x512.png`,
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ]
            },
        },
        `gatsby-plugin-offline`,
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            // keep as first gatsby-source-filesystem plugin for gatsby image support
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/images`,
                name: 'uploads',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/pages`,
                name: 'pages',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/assets/images`,
                name: 'images',
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-relative-images',
                        options: {
                            name: 'uploads',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 2048,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: {
                            destinationDir: 'static',
                        },
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-netlify-cms'
        },
        {
            resolve: `gatsby-plugin-social9-socialshare`,
            options: {
                content: `c0290edce686414996ce481a3ee94b2b`,
                async: true,
                defer: true,
            }
        },
        {
            resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
            options: {
                develop: true, // Activates purging in npm run develop
                purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
            },
        }, // must be after other CSS plugins
        'gatsby-plugin-netlify', // make sure to keep it last in the array
    ],
}
