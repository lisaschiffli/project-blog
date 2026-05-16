import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';
import COMPONENT_MAP from '@/helpers/mdx-components';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const blogPostData = await loadBlogPost((await params).postSlug);

  if (!blogPostData) {
    return {
      title: `404 Not found • ${BLOG_TITLE}`,
    };
  }

  const { title, abstract } = blogPostData;

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: abstract,
  };
}

async function BlogPost({ params }) {
  const blogPostData = await loadBlogPost((await params).postSlug);

  if (!blogPostData) {
    notFound();
  }

  const {
    frontmatter: { title, publishedOn },
    content,
  } = blogPostData;

  // const {
  //   frontmatter: { title, publishedOn },
  //   content,
  // } = await loadBlogPost((await params).postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={title}
        publishedOn={publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={COMPONENT_MAP}
        />
      </div>
    </article>
  );
}

export default BlogPost;
