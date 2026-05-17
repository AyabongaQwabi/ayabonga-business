import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const CITE_HREF = /^#cite-(\d+)$/;

function CitationRef({ href }: { href: string }) {
  const m = href.match(CITE_HREF);
  const n = m?.[1] ?? '';
  return (
    <a
      href={href}
      title={`Source [${n}] in Works cited`}
      className="not-prose ms-0.5 inline-block align-super text-[0.68em] font-semibold leading-none text-accent-gold no-underline hover:underline decoration-accent-gold/70 underline-offset-2"
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
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

type BlogPostBodyProps = {
  content: string;
};

export function BlogPostBody({ content }: BlogPostBodyProps) {
  return (
    <div className="blog-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-12 mb-4">{children}</h1>
          ),
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,
          p: ({ children }) => <p>{children}</p>,
          ul: ({ children }) => <ul className="list-disc space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-2">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          a: ({ href, children }) => <MarkdownAnchor href={href}>{children}</MarkdownAnchor>,
          code: ({ className, children }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <pre>
                  <code>{children}</code>
                </pre>
              );
            }
            return <code>{children}</code>;
          },
          pre: ({ children }) => <>{children}</>,
          blockquote: ({ children }) => <blockquote>{children}</blockquote>,
          hr: () => <hr className="border-surface-border my-8" />,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          table: ({ children }) => (
            <div className="not-prose my-6 overflow-x-auto rounded-lg border border-surface-border">
              <table className="w-full min-w-[min(100%,20rem)] border-collapse text-sm font-technical">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-surface-border bg-surface-overlay/50">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-surface-border/50 last:border-0">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-text-primary">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2.5 align-top text-text-secondary">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
