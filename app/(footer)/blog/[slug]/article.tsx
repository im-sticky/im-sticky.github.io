'use client';

import dynamic from 'next/dynamic';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {InternalLink} from '@components/InternalLink';
import {ExternalLink} from '@components/ExternalLink';
import {Figure} from '@components/Figure';
import {Spoiler} from '@components/Spoiler';
import {ImageCard} from '@components/ImageCard';
import {TableOfContents} from '@components/TableOfContents';
import {PullQuote} from '@components/PullQuote';

const MDX = dynamic(() => import('next-mdx-remote').then((mod) => mod.MDXRemote), {ssr: false});

const components = {
  InternalLink,
  ExternalLink,
  Figure,
  Spoiler,
  ImageCard,
  TableOfContents,
  PullQuote,
};

interface ArticleProps {
  mdxSource: MDXRemoteSerializeResult;
  className?: string;
}

export function Article({mdxSource, className}: ArticleProps) {
  return (
    <article className={className}>
      <MDX {...mdxSource} components={components} />
    </article>
  );
}
