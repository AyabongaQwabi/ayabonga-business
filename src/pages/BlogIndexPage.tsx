import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  blogPosts,
  getAllCategories,
  getAllTags,
  postMatchesFilters,
} from '../data/blog-posts';
import { BlogFilterChip } from '../components/BlogTaxonomy';
import { BlogCard } from '../components/blog/BlogCard';
import { SupportingPageShell } from '../components/SupportingPageShell';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  TWITTER_HANDLE,
} from '../lib/site-config';
import {
  authorGraphNode,
  buildJsonLdGraph,
  buildOrganizationSchema,
  buildWebSiteSchema,
  personRef,
} from '../lib/entity-schema';

const BLOG_INDEX_TITLE = 'AI, cloud and product engineering for SA startups';
const BLOG_INDEX_DESCRIPTION =
  'Writing on product engineering, AI, cloud architecture, and shipping software in South Africa. Plus Eastern Cape culture and heritage.';

function buildListUrl(category: string | null, tag: string | null): string {
  const p = new URLSearchParams();
  if (category) p.set('category', category);
  if (tag) p.set('tag', tag);
  const q = p.toString();
  return q ? `/blog?${q}` : '/blog';
}

export default function BlogIndexPage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');

  const categories = useMemo(() => getAllCategories(), []);
  const tags = useMemo(() => getAllTags(), []);

  const filteredPosts = useMemo(
    () => blogPosts.filter((p) => postMatchesFilters(p, categoryFilter, tagFilter)),
    [categoryFilter, tagFilter],
  );

  const hasFilters = Boolean(categoryFilter || tagFilter);
  const emptyFilterResult = hasFilters && filteredPosts.length === 0;
  const robotsContent =
    hasFilters || emptyFilterResult ? 'noindex, follow' : 'index, follow';

  const keywordStr = useMemo(() => tags.slice(0, 24).join(', '), [tags]);

  const blogListingJsonLd = useMemo(() => {
    if (hasFilters) return null;
    return buildJsonLdGraph([
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      authorGraphNode(),
      {
        '@type': 'Blog',
        '@id': `${absoluteUrl('/blog')}#blog`,
        name: `Writing: ${SITE_NAME}`,
        description: BLOG_INDEX_DESCRIPTION,
        url: absoluteUrl('/blog'),
        author: personRef(),
        blogPost: blogPosts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: absoluteUrl(`/blog/${p.slug}`),
          description: p.excerpt,
        })),
      },
    ]);
  }, [hasFilters]);

  return (
    <SupportingPageShell
      title={`${BLOG_INDEX_TITLE} | ${SITE_NAME}`}
      description={BLOG_INDEX_DESCRIPTION}
      canonicalPath="/blog"
      contentWidth="narrow"
      ogImage={DEFAULT_OG_IMAGE}
    >
      <Helmet>
        {keywordStr ? <meta name="keywords" content={keywordStr} /> : null}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/blog')} />
        <meta property="og:title" content={`${BLOG_INDEX_TITLE} | ${SITE_NAME}`} />
        <meta property="og:description" content={BLOG_INDEX_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${BLOG_INDEX_TITLE} | ${SITE_NAME}`} />
        <meta name="twitter:description" content={BLOG_INDEX_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content={robotsContent} />
        {blogListingJsonLd ? (
          <script type="application/ld+json">{JSON.stringify(blogListingJsonLd)}</script>
        ) : null}
      </Helmet>

      <header className="mb-12">
        <p className="section-label mb-4">Writing</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Product notes and research
        </h1>
        <p className="font-body text-text-secondary leading-relaxed max-w-xl">
          Thoughts on technology, cloud engineering, and building software that makes an impact in
          South Africa.
        </p>
      </header>

      <div className="space-y-4 p-5 rounded-xl bg-surface-raised border border-surface-border mb-12">
        <div>
          <p className="section-label mb-3">Categories</p>
          <div className="flex flex-wrap gap-1.5">
            <BlogFilterChip
              label="All posts"
              to="/blog"
              active={!hasFilters}
              variant="category"
            />
            {categories.map((c) => (
              <BlogFilterChip
                key={c}
                label={c}
                to={buildListUrl(c, tagFilter)}
                active={categoryFilter === c}
                variant="category"
              />
            ))}
          </div>
        </div>
        <div>
          <p className="section-label mb-3">Tags</p>
          <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
            {tags.map((t) => (
              <BlogFilterChip
                key={t}
                label={t}
                to={buildListUrl(categoryFilter, t)}
                active={tagFilter === t}
                variant="tag"
              />
            ))}
          </div>
        </div>
        {hasFilters && (
          <p className="text-sm text-text-secondary pt-3 border-t border-surface-border">
            Showing <span className="text-text-primary font-medium">{filteredPosts.length}</span> of{' '}
            <span className="text-text-primary font-medium">{blogPosts.length}</span> posts
            {categoryFilter && (
              <>
                {' '}
                · category <span className="text-accent-gold">{categoryFilter}</span>
              </>
            )}
            {tagFilter && (
              <>
                {' '}
                · tag <span className="text-text-primary">{tagFilter}</span>
              </>
            )}
            .{' '}
            <Link to="/blog" className="text-accent-gold hover:underline">
              Clear filters
            </Link>
          </p>
        )}
      </div>

      <div className="space-y-6 max-w-blog mx-auto">
        {filteredPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {filteredPosts.length === 0 && blogPosts.length > 0 && (
        <div className="text-center py-16 rounded-xl border border-dashed border-surface-border max-w-blog mx-auto">
          <p className="text-text-secondary mb-4">No posts match these filters.</p>
          <Link to="/blog" className="text-accent-gold hover:underline text-sm font-technical font-semibold">
            View all posts
          </Link>
        </div>
      )}

      {blogPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary">No posts yet. Check back soon.</p>
        </div>
      )}
    </SupportingPageShell>
  );
}
