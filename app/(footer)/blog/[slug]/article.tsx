'use client';

import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {MDXRemote} from 'next-mdx-remote';
import {InternalLink} from '@components/InternalLink';
import {ExternalLink} from '@components/ExternalLink';
import {Figure} from '@components/Figure';
import {Spoiler} from '@components/Spoiler';
import {ImageCard} from '@components/ImageCard';
import {TableOfContents} from '@components/TableOfContents';
import {PullQuote} from '@components/PullQuote';

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
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
}
