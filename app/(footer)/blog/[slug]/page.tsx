import clsx from 'clsx';
import {Metadata} from 'next';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {BlogCategory, IBlogPost} from '@models/blogPost';
import {getAllPosts, getPost} from '@helpers/postUtils.mjs';
import {formatDate} from '@helpers/formatDate';
import {openGraphMeta} from '@helpers/openGraphMeta';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {InternalLink} from '@components/InternalLink';
import {TitleShape} from '@components/TitleShape';
import {ExternalLink} from '@components/ExternalLink';
import {Figure} from '@components/Figure';
import {Spoiler} from '@components/Spoiler';
import {AlanWakeSpoiler} from '@components/Spoiler/alanWakeSpoiler';
import {ImageCard} from '@components/ImageCard';
import {TableOfContents} from '@components/TableOfContents';
import {PullQuote} from '@components/PullQuote';
import {AudioTrigger} from '@components/AudioTrigger';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faQuoteLeft,
  faCode,
  faGamepad,
  faDragon,
  faLongArrowLeft,
  faLongArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import sharedStyles from '@styles/shared.module.scss';
import styles from './index.module.scss';

const mdxComponents = {
  InternalLink,
  ExternalLink,
  Figure,
  Spoiler,
  AlanWakeSpoiler,
  ImageCard,
  TableOfContents,
  PullQuote,
  AudioTrigger,
};

interface PostParams {
  slug: string;
}

interface PostProps {
  params: PostParams;
}

export default async function Post({params}: PostProps) {
  const {frontMatter, content} = getPost(params.slug);
  const allPosts = getAllPosts(['slug', 'date', 'customLink']) as IBlogPost[];
  const postIndex = allPosts.findIndex((p) => p.slug === params.slug);

  let titleIcon = faQuoteLeft;

  switch (frontMatter.category) {
    case BlogCategory.Development:
      titleIcon = faCode;
      break;
    case BlogCategory.Gaming:
      titleIcon = faGamepad;
      break;
    case BlogCategory.Magic:
      titleIcon = faDragon;
      break;
  }

  return (
    <Section
      grow
      className={clsx(styles['blog-post'], {
        [styles['blog-post--has-hero']]: frontMatter.hero || frontMatter.heroVideo,
        [styles['blog-post--fixed-hero']]: frontMatter.heroFixed,
      })}
    >
      {frontMatter.hero && !frontMatter.heroVideo ? (
        <img
          className={clsx(styles['blog-post__hero'], {
            [styles['blog-post__hero--top']]: frontMatter.heroPosition === 'top',
            [styles['blog-post__hero--bottom']]: frontMatter.heroPosition === 'bottom',
          })}
          src={`/assets/${frontMatter.hero}`}
          alt=""
        />
      ) : null}

      {frontMatter.heroVideo ? (
        <video
          key={params.slug}
          autoPlay
          muted
          loop
          className={clsx(styles['blog-post__hero'], {
            [styles['blog-post__hero--top']]: frontMatter.heroPosition === 'top',
            [styles['blog-post__hero--bottom']]: frontMatter.heroPosition === 'bottom',
            [styles['blog-post__hero--left']]: frontMatter.mobileHeroPosition === 'left',
            [styles['blog-post__hero--right']]: frontMatter.mobileHeroPosition === 'right',
          })}
        >
          <source
            src={`/assets/${frontMatter.heroVideo}`}
            type={`video/${frontMatter.heroVideo.split('.').pop()}`}
          />
        </video>
      ) : null}

      {frontMatter.hero || frontMatter.heroVideo ? (
        <div className={styles['blog-post__hero-screen']} />
      ) : null}

      <Container className={styles['blog-post__container']}>
        <p
          className={clsx(
            sharedStyles['page__descriptor'],
            sharedStyles['page__descriptor--small'],
            sharedStyles['page__descriptor--spaced']
          )}
        >
          <InternalLink icon to="/blog">
            <FontAwesomeIcon icon={faLongArrowLeft} className={sharedStyles['page__back-icon']} />
            Back to posts
          </InternalLink>
        </p>

        <TitleShape className={styles['blog-post__title']} icon={titleIcon}>
          {frontMatter.title}
        </TitleShape>

        <p className={sharedStyles['page__descriptor']}>{frontMatter.description}</p>

        <p
          className={clsx(
            sharedStyles['page__descriptor'],
            sharedStyles['page__descriptor--small'],
            sharedStyles['page__descriptor--italic'],
            {
              [sharedStyles['page__descriptor--spaced']]: frontMatter.edited,
            }
          )}
        >
          {formatDate(frontMatter.date)}
        </p>

        {frontMatter.edited ? (
          <p
            className={clsx(
              sharedStyles['page__descriptor'],
              sharedStyles['page__descriptor--small'],
              sharedStyles['page__descriptor--italic']
            )}
          >
            This post was edited on {formatDate(frontMatter.edited)}
          </p>
        ) : null}

        <article className={styles['blog-post__content']}>
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        <div className={sharedStyles['pagination']}>
          {postIndex > 0 ? (
            <InternalLink
              icon
              to={allPosts[postIndex - 1].customLink ?? `/blog/${allPosts[postIndex - 1].slug}`}
            >
              <FontAwesomeIcon icon={faLongArrowLeft} className={sharedStyles['page__back-icon']} />
              Next post
            </InternalLink>
          ) : null}

          {postIndex + 1 < allPosts.length ? (
            <InternalLink
              icon
              to={allPosts[postIndex + 1].customLink ?? `/blog/${allPosts[postIndex + 1].slug}`}
              className={sharedStyles['pagination__previous']}
            >
              Previous post
              <FontAwesomeIcon
                icon={faLongArrowRight}
                className={sharedStyles['page__next-icon']}
              />
            </InternalLink>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export async function generateStaticParams(): Promise<PostParams[]> {
  return getAllPosts(['slug']).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({params}: PostProps): Promise<Metadata> {
  const {frontMatter} = getPost(params.slug);

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: openGraphMeta(
      `/blog/${params.slug}`,
      frontMatter.shareAsset
        ? `/assets/${frontMatter.shareAsset}`
        : frontMatter.hero
        ? `/assets/${frontMatter.hero}`
        : '/default-share.png'
    ),
  };
}
