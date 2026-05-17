import { useMemo, type ReactNode } from 'react';
import { Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { DiscussionEmbed } from 'disqus-react';
import type { BlogPost as BlogPostRecord } from '../../data/blog-posts';
import { BlogTaxonomy } from '../BlogTaxonomy';
import BlogCommercialCta from '../BlogCommercialCta';
import EspazzaStatusBanner, { postMentionsEspazza } from '../EspazzaStatusBanner';
import { AuthorBio } from '../AuthorBio';
import { ScrollReveal } from '../ScrollReveal';
import {
  absoluteUrl,
  absoluteMediaUrl,
  DISQUS_SHORTNAME,
} from '../../lib/site-config';

const CITE_HREF = /^#cite-(\d+)$/;

function CitationRef({ href }: { href: string }) {
  const m = href.match(CITE_HREF);
  const n = m?.[1] ?? '';
  return (
    <a
      href={href}
      title={`Source [${n}] in Works cited`}
      className="not-prose ms-0.5 inline-block align-super text-[0.68em] font-semibold leading-none text-primary no-underline hover:underline decoration-primary/70 underline-offset-2"
    >
      [{n}]
    </a>
  );
}

function MarkdownAnchor({
  href,
  children,
}: {
  href?: string;
  children?: ReactNode;
}) {
  if (href && CITE_HREF.test(href)) {
    return <CitationRef href={href} />;
  }
  return (
    <a
      href={href}
      className="text-primary hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

type BlogPostProps = {
  post: BlogPostRecord;
};

/** Article body and post chrome (hero meta, markdown, CTA, comments). */
export function BlogPost({ post }: BlogPostProps) {
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const heroImagePath = post.headerImage || post.ogImage;
  const heroImageUrl = heroImagePath ? absoluteMediaUrl(heroImagePath) : undefined;

  const disqusConfig = useMemo(
    () => ({
      url: canonical,
      identifier: post.slug,
      title: post.title,
    }),
    [canonical, post.slug, post.title],
  );

  return (
    <article className="font-[Inter,sans-serif]">
      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" aria-hidden />
            <time dateTime={post.date}>{post.date}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden />
            {post.readTime}
          </span>
        </div>

        <h1 className="font-[Outfit,sans-serif] text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground mb-6 max-w-[680px]">{post.excerpt}</p>

        {heroImageUrl ? (
          <figure className="mb-8 rounded-lg overflow-hidden border border-border bg-card max-w-[680px]">
            <img
              src={heroImageUrl}
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

      <div
        className="prose prose-invert prose-lg max-w-[680px]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => (
              <h1 className="font-[Outfit,sans-serif] text-2xl font-bold text-foreground mt-12 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="font-[Outfit,sans-serif] text-xl font-semibold text-foreground mt-10 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-[Outfit,sans-serif] text-lg font-semibold text-foreground mt-8 mb-3">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-muted-foreground leading-relaxed mb-6">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-6">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
            a: ({ href, children }) => (
              <MarkdownAnchor href={href}>{children}</MarkdownAnchor>
            ),
            code: ({ className, children }) => {
              const isBlock = className?.includes('language-');
              if (isBlock) {
                return (
                  <pre className="bg-card border border-border rounded-lg p-4 overflow-x-auto mb-6">
                    <code className="text-sm font-mono text-foreground">{children}</code>
                  </pre>
                );
              }
              return (
                <code className="bg-card px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                  {children}
                </code>
              );
            },
            pre: ({ children }) => <>{children}</>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground mb-6">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="border-border my-8" />,
            strong: ({ children }) => (
              <strong className="text-foreground font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            table: ({ children }) => (
              <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[min(100%,20rem)] border-collapse text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="border-b border-border bg-card/50">{children}</thead>
            ),
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => (
              <tr className="border-b border-border/50 last:border-0">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-foreground">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2.5 align-top text-muted-foreground first:text-foreground/90">
                {children}
              </td>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <ScrollReveal>
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
      </ScrollReveal>

      <section
        className="not-prose mt-16 max-w-[680px] border-t border-border pt-10"
        aria-labelledby="blog-comments-heading"
      >
        <h2
          id="blog-comments-heading"
          className="font-[Outfit,sans-serif] text-xl font-semibold text-foreground mb-6"
        >
          Comments
        </h2>
        <DiscussionEmbed shortname={DISQUS_SHORTNAME} config={disqusConfig} />
      </section>
    </article>
  );
}
