import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/layout.js';

import { imageWrapper } from '../styles/index.module.css';
import SanityEpisode from './episodes/{SanityEpisode.slug__current}.js';



export default function IndexPage() {
    const data = useStaticQuery(graphql`
        query GetBlogPosts {
            allMdx(sort: {fields: frontmatter___date, order: DESC}) {
                nodes {
                    id
                    slug
                    frontmatter {
                        title
                        description
                        date(fromNow: true)
                    }
                }
            }
            allSanityEpisode(
                sort: { fields: date, order: DESC }
                filter: { youtubeID: { ne: null } }
                limit: 20
            ){
                nodes {
                    id
                    title
                    guest {
                        name
                    }
                    gatsbyPath(filePath: "/episodes/{SanityEpisode.slug__current}")
                }
            }
        }
    `);

    const posts    = data.allMdx.nodes;
    const episodes = data.allSanityEpisode.nodes;



    return (
        <Layout>
            <div className={imageWrapper}>
                <StaticImage
                    src='../images/ivana-la-61jg6zviI7I-unsplash.jpg'
                    alt='a corgi sitting on a bed'
                    placeholder='dominantColor'
                    width={300}
                    height={300}
                />
            </div>


            <h1>Hello Frontend Masters!</h1>

            <Link to="/about">About this site</Link>

            <h2>Check out the lates blog posts</h2>

            <ul>
                { posts.map((post) => (
                    <li key={ post.id }>
                        <Link to={ post.slug }>{ post.frontmatter.title }</Link>{' '}
                        <small>posted { post.frontmatter.date }</small>
                    </li>
                ))}
            </ul>

            <h2>Latest episodes of <em>Leran with Jason</em></h2>

            <ul>
                {episodes.map((episode) => (
                    <li key={episode.id}>
                        <Link to={episode.gatsbyPath}>
                            {episode.title} (with {episode.guest?.[0]?.name})
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}
