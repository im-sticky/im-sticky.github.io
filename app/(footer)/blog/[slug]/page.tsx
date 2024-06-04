import {serialize} from 'next-mdx-remote/serialize';
import {getAllPosts, getPost} from '@helpers/postUtils';
import {formatDate} from '@helpers/formatDate';
import clsx from 'clsx';
import {Section} from '@components/Section';
import {Container} from '@components/Container';
import {InternalLink} from '@components/InternalLink';
import {TitleShape} from '@components/TitleShape';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuoteLeft, faLongArrowLeft, faLongArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Mdx} from './mdx';
import sharedStyles from '@styles/shared.module.scss';
import styles from './index.module.scss';
import {Metadata} from 'next';
import {SITE_URL} from '@helpers/constants';

interface PostParams {
  slug: string;
}

interface PostProps {
  params: PostParams;
}

export default async function Post({params}: PostProps) {
  const {frontMatter, content} = getPost(params.slug);
  const mdxSource = await serialize(content);
  const allPosts = getAllPosts(['slug', 'date', 'customLink']);
  const postIndex = allPosts.findIndex((p) => p.slug === params.slug);

  return (
    <Section
      grow
      className={clsx(styles['blog-post'], {
        [styles['blog-post--has-hero']]: frontMatter.hero || frontMatter.heroVideo,
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

      <Container>
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

        <TitleShape className={styles['blog-post__title']} icon={faQuoteLeft}>
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
          <Mdx mdxSource={mdxSource} />
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
    openGraph: {
      url: `${SITE_URL}/blog/${params.slug}`,
      images: {
        url: frontMatter.shareAsset
          ? `/assets/${frontMatter.shareAsset}`
          : frontMatter.hero
          ? `/assets/${frontMatter.hero}`
          : '/default-share.png',
      },
    },
  };
}
