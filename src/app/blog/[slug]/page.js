import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import GridComponentMain from '@/app/GridComponentMain';
import Signature from '@/app/Signature';
import getPostMetadata from '@/utils/getPostMetadata';

function getPostContent(slug) {
    const file = `src/blog/${slug}.md`;
    const contents = fs.readFileSync(file, 'utf8');
    return matter(contents);
}

export const generateStaticParams = async () => {
    const posts = getPostMetadata('src/blog');
    return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({params, searchParams}) {

    return {
        title: `Shawn Smith | ${params?.slug.replaceAll('_', ' ') || 'Software Engineer'}`,

    }
}

export default function BlogPage({ params }) {
    const { slug } = params;
    const post = getPostContent(slug);

    return (
    <GridComponentMain page="slug" >
        <Signature page="slug" />
        <Grid item component="article" xs={12} md={7} p={{xs: '0 3rem', md: '4rem 6rem'}}>
            <Markdown>{post.content}</Markdown>
        </Grid>
      </GridComponentMain>
    )
}
