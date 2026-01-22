'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose prose-slate max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Code blocks with syntax highlighting
          code({ node, inline, className, children, ...props }: any) {
            return (
              <code className={`${className} ${inline ? '!bg-ivory-900 !text-ivory-100 !rounded !px-2 !py-1' : '!bg-ivory-900 !text-ivory-100 !rounded-lg !p-4'} !font-mono !text-sm`}>
                {children}
              </code>
            );
          },
          // Headings
          h1({ node, children, ...props }: any) {
            return (
              <h1 className="text-3xl font-bold text-ivory-900 mt-8 mb-4">
                {children}
              </h1>
            );
          },
          h2({ node, children, ...props }: any) {
            return (
              <h2 className="text-2xl font-bold text-ivory-900 mt-6 mb-3">
                {children}
              </h2>
            );
          },
          h3({ node, children, ...props }: any) {
            return (
              <h3 className="text-xl font-bold text-ivory-900 mt-4 mb-2">
                {children}
              </h3>
            );
          },
          h4({ node, children, ...props }: any) {
            return (
              <h4 className="text-lg font-bold text-ivory-900 mt-3 mb-2">
                {children}
              </h4>
            );
          },
          // Paragraphs
          p({ node, children, ...props }: any) {
            return (
              <p className="text-ivory-700 mb-4 leading-relaxed">
                {children}
              </p>
            );
          },
          // Lists
          ul({ node, children, ...props }: any) {
            return (
              <ul className="list-disc list-inside space-y-2 mb-4 ml-6 text-ivory-700">
                {children}
              </ul>
            );
          },
          ol({ node, children, ...props }: any) {
            return (
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-6 text-ivory-700">
                {children}
              </ol>
            );
          },
          // Blockquotes
          blockquote({ node, children, ...props }: any) {
            return (
              <blockquote className="border-l-4 border-ivory-200 pl-4 py-2 my-4 bg-ivory/50 italic text-ivory-700">
                {children}
              </blockquote>
            );
          },
          // Tables
          table({ node, children, ...props }: any) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-ivory-200 border">
                  {children}
                </table>
              </div>
            );
          },
          thead({ node, children, ...props }: any) {
            return (
              <thead className="bg-ivory-100">
                {children}
              </thead>
            );
          },
          tbody({ node, children, ...props }: any) {
            return (
              <tbody className="bg-white">
                {children}
              </tbody>
            );
          },
          tr({ node, children, ...props }: any) {
            return (
              <tr className="hover:bg-ivory-50">
                {children}
              </tr>
            );
          },
          td({ node, children, ...props }: any) {
            return (
              <td className="px-6 py-4">
                {children}
              </td>
            );
          },
          th({ node, children, ...props }: any) {
            return (
              <th className="px-6 py-3 text-left text-sm font-semibold text-ivory-700 uppercase tracking-wider">
                {children}
              </th>
            );
          },
          // Links
          a({ node, children, ...props }: any) {
            return (
              <a
                className="text-brand-600 hover:text-brand-500 underline"
                target="_blank"
                rel="noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          },
          // Strong text
          strong({ node, children, ...props }: any) {
            return (
              <strong className="font-semibold text-ivory-900">
                {children}
              </strong>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
