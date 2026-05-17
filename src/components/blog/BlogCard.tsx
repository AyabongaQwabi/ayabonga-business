import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '../../data/blog-posts';
import { BlogTaxonomy } from '../BlogTaxonomy';
import { cn } from '../../lib/utils';

export type BlogCardVariant = 'default' | 'featured';

type BlogCardProps = {
  post: BlogPost;
  variant?: BlogCardVariant;
  index?: number;
  className?: string;
  style?: CSSProperties;
};

export function BlogCard({
  post,
  variant = 'default',
  index = 0,
  className,
  style,
}: BlogCardProps) {
  const isFeatured = variant === 'featured';
  const category = post.categories[0] ?? 'Writing';

  return (
    <article
      className={cn(
        'group rounded-xl border border-surface-border bg-surface-raised',
        'transition-colors duration-200 motion-reduce:transition-none',
        'hover:border-accent-gold/40 hover:bg-surface-overlay focus-within:border-accent-gold/40',
        isFeatured ? 'p-8 md:p-10' : 'p-6',
        className,
      )}
      style={{ '--reveal-index': index, ...style } as CSSProperties}
    >
      <Link to={`/blog/${post.slug}`} className="block focus-visible:outline-none">
        <span className="section-label text-accent-gold">{category}</span>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
          {post.date ? (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden />
              <time dateTime={post.date}>{post.date}</time>
            </span>
          ) : null}
          {post.readTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden />
              {post.readTime}
            </span>
          ) : null}
        </div>

        <h2
          className={cn(
            'mt-3 font-display font-bold text-text-primary group-hover:text-accent-gold transition-colors',
            isFeatured ? 'text-2xl md:text-3xl leading-tight' : 'text-xl',
          )}
        >
          {post.title}
        </h2>

        <p
          className={cn(
            'mt-3 font-body text-text-secondary leading-relaxed',
            isFeatured ? 'text-base max-w-2xl' : 'text-sm line-clamp-3 mb-4',
          )}
        >
          {post.excerpt}
        </p>

        <span className="inline-flex items-center gap-2 text-sm font-technical font-semibold text-accent-gold">
          Read article
          <ArrowRight
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </Link>

      <div className="mt-4 pt-4 border-t border-surface-border">
        <BlogTaxonomy categories={post.categories} tags={post.tags} size="sm" />
      </div>
    </article>
  );
}
