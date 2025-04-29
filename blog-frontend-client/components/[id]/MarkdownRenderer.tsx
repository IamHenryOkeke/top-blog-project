import { marked } from 'marked';

export default function MarkdownRenderer ({ markdown }: { markdown: string }) {
  const createMarkup = () => {
    const html = marked(markdown);
    return { __html: html };
  };

  return (
    <div dangerouslySetInnerHTML={createMarkup()} />
  );
};

