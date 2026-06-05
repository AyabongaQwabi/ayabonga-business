import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock } from 'lucide-react';
import { DiscussionEmbed } from 'disqus-react';
import { blogPosts } from '../data/blog-posts';
import type { BlogPost } from '../data/blog-posts';
import { BlogTaxonomy } from '../components/BlogTaxonomy';
import BlogCommercialCta from '../components/BlogCommercialCta';
import EspazzaStatusBanner, { postMentionsEspazza } from '../components/EspazzaStatusBanner';
import { AuthorBio } from '../components/AuthorBio';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { ReadingProgress } from '../components/ReadingProgress';
import { SupportingPageShell } from '../components/SupportingPageShell';
import { BlogPostBody } from '../components/blog/BlogPostBody';
import NotFound from './NotFound';
import {
  absoluteUrl,
  absoluteMediaUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  TWITTER_HANDLE,
  parsePostDateForSchema,
  DISQUS_SHORTNAME,
} from '../lib/site-config';
import {
  buildBlogPostingGraphNode,
  buildBreadcrumbSchema,
  buildJsonLdGraph,
  buildOrganizationSchema,
  buildWebSiteSchema,
  authorGraphNode,
} from '../lib/entity-schema';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return <BlogPostView post={post} />;
}

function BlogPostView({ post }: { post: BlogPost }) {
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const pageTitle = `${post.title} | Writing | ${SITE_NAME}`;
  const datePublished = parsePostDateForSchema(post.date);
  const keywords = [...post.categories, ...post.tags]
    .filter(Boolean)
    .join(', ');
  const shareImagePath = post.ogImage || post.headerImage;
  const shareImageUrl = shareImagePath
    ? absoluteMediaUrl(shareImagePath)
    : DEFAULT_OG_IMAGE;
  const heroImagePath = post.headerImage || post.ogImage;

  const disqusConfig = useMemo(
    () => ({
      url: canonical,
      identifier: post.slug,
      title: post.title,
    }),
    [canonical, post.slug, post.title],
  );

  const dateModifiedIso = parsePostDateForSchema(post.dateModified ?? '');

  const pageJsonLd = useMemo(
    () =>
      buildJsonLdGraph([
        buildOrganizationSchema(),
        buildWebSiteSchema(),
        authorGraphNode(),
        buildBlogPostingGraphNode({
          post,
          canonical,
          shareImageUrl,
          dateModified: dateModifiedIso,
        }),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
      ]),
    [post, canonical, shareImageUrl, dateModifiedIso],
  );

  return (
  <>
      <ReadingProgress />
      <SupportingPageShell
        title={pageTitle}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        contentWidth="narrow"
        ogImage={shareImageUrl}
      >
        <Helmet>
          {keywords ? <meta name="keywords" content={keywords} /> : null}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={canonical} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          <meta property="og:image" content={shareImageUrl} />
          <meta property="og:image:alt" content={post.title} />
          <meta property="article:author" content={SITE_NAME} />
          {datePublished ? (
            <meta
              property="article:published_time"
              content={`${datePublished}T12:00:00+02:00`}
            />
          ) : null}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.excerpt} />
          <meta name="twitter:image" content={shareImageUrl} />
          <meta name="twitter:site" content={TWITTER_HANDLE} />
          <meta name="twitter:creator" content={TWITTER_HANDLE} />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <script type="application/ld+json">{JSON.stringify(pageJsonLd)}</script>
        </Helmet>

        <PageBreadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Writing', to: '/blog' },
            { label: post.title },
          ]}
        />

        <article>
          <header className="mb-10 max-w-blog mx-auto">
            <div className="flex items-center gap-4 text-sm text-text-secondary mb-4 font-technical">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {post.title}
            </h1>

            <p className="font-body text-lg text-text-secondary mb-6">{post.excerpt}</p>

            {heroImagePath ? (
              <figure className="mb-8 rounded-xl overflow-hidden border border-surface-border bg-surface-raised">
                <img
                  src={heroImagePath}
                  alt={`Header image for: ${post.title}`}
                  className="w-full h-auto object-cover max-h-[min(70vh,520px)] object-top"
                  width={920}
                  height={520}
                  loading="eager"
                  decoding="async"
                />
              </figure>
            ) : null}

            <BlogTaxonomy categories={post.categories} tags={post.tags} size="md" />

            {postMentionsEspazza(post.tags) ? <EspazzaStatusBanner /> : null}
          </header>

          <BlogPostBody content={post.content} />

          <div className="max-w-blog mx-auto mt-12">
            <BlogCommercialCta
              variant={
                post.categories.some((c) =>
                  ['Engineering', 'AI', 'Product', 'Career', 'Cloud'].includes(c),
                )
                  ? 'engineering'
                  : 'default'
              }
            />

            <AuthorBio />
          </div>

          <section
            className="not-prose max-w-blog mx-auto mt-16 border-t border-surface-border pt-10"
            aria-labelledby="blog-comments-heading"
          >
            <h2
              id="blog-comments-heading"
              className="font-display text-xl font-semibold text-text-primary mb-6"
            >
              Comments
            </h2>
            <DiscussionEmbed shortname={DISQUS_SHORTNAME} config={disqusConfig} />
          </section>
        </article>
      </SupportingPageShell>
    </>
  );
}
