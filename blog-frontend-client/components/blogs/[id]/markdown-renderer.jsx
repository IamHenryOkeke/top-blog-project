import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownRenderer({ markdown }) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-h4:my-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-800 text-white px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },
          h2: ({ ...props }) => <h2 className="text-xl font-semibold my-2" {...props} />,
          h3: ({ ...props }) => <h3 className="text-lg my-2" {...props} />,
          h4: ({ ...props }) => <h4 className="my-2" {...props} />,
          h5: ({ ...props }) => <h5 className="my-2" {...props} />,
          p: ({ ...props }) => <p className="text-xl my-1" {...props} />,
          ul: ({ ...props }) => <ul className="ml-5 list-disc" {...props} />,
          li: ({ ...props }) => <li className="text-lg my-1" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div >
  );
}
