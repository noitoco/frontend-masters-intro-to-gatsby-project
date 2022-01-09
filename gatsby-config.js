module.exports = {
    siteMetadata: {
        siteUrl: "https://yourdomain.test",
        title: "Frontend Masters Intro to Gatsby",
        description: "Frontend Masters Intro to Gatsby course project",
        image: "https://res.cloudinary.com/jlengstorf/image/upload/v1628127675/frontend-masters/gatsby-intro/share-image.jpg"
    },
    plugins: [
        // plugin to add head meta tags to all pages
        'gatsby-plugin-react-helmet',

        // plugins used to enable creating MDX blog posts from the ./src/posts/ folder
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: `${__dirname}/src/posts`
            }
        },
        {
            resolve: 'gatsby-plugin-page-creator',
            options: {
                path: `${__dirname}/src/posts`
            }
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                defaultLayouts: {
                    // posts as that's the name used in the gatsby-source-filesystem config
                    posts: require.resolve('./src/components/post-layout.js'),
                }
            }
        }
    ]
};