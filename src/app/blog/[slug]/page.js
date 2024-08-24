import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
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
      <Grid container component="main" p={{xs: '3rem 0', md: '6rem 0'}} sx={{minHeight: '100vh'}} >
          <Container component="article">
            <Markdown>{post.content}</Markdown>
          </Container>
      </Grid>
    )
}
