import { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import './light-theme/code-block-styles.css';
import './light-theme/github-flavored-markdown.css';

//Custom plugin
import { rehypeAddCopyButton } from "./rehypeAddCopyButton";

export type RenderMarkdownProps = {
  markdownText: string;
  dangerouslyRenderHtmlTags?: boolean;
  autoGenerateTableOfContents?: boolean;
  inputTextIsEncoded?: boolean;
  showCopyCodeBtnsInCodeBlocks?: boolean;
  className?: string;
};

export function RenderMarkdown({
  markdownText,
  dangerouslyRenderHtmlTags = false,
  autoGenerateTableOfContents = false,
  inputTextIsEncoded = false,
  showCopyCodeBtnsInCodeBlocks = true,
  className = "",
}: RenderMarkdownProps) {
  
  let finalMarkdown = markdownText;
  
  if (inputTextIsEncoded) {
    finalMarkdown = decodeURIComponent(markdownText);
  }

  // Set up plugins
  const remarkPlugins = autoGenerateTableOfContents ? [remarkGfm, remarkToc] : [remarkGfm];
  const rehypePlugins = [
    rehypeHighlight,
    ...(showCopyCodeBtnsInCodeBlocks ? [rehypeAddCopyButton] : []),
    ...(autoGenerateTableOfContents ? [rehypeSlug] : []),
    ...(dangerouslyRenderHtmlTags ? [rehypeRaw] : [])
  ];

  //Make the "copy code" buttons work (if present)
  useEffect(() => {
    const handleCopy = (event: Event) => {
      const buttonElement = event.currentTarget as HTMLButtonElement;
      const preElement = buttonElement.parentNode as HTMLPreElement;
      const codeElement = preElement.querySelector('code');
      const code = codeElement ? codeElement.textContent || '' : '';
  
      navigator.clipboard.writeText(code).then(() => {
        console.log('Text copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    };
  
    const copyButtons = document.querySelectorAll('.copy-code-btn');
    copyButtons.forEach(button => button.addEventListener('click', handleCopy));
  
    return () => {
      copyButtons.forEach(button => button.removeEventListener('click', handleCopy));
    };
  }, [markdownText]); 
  

  return (
    <Markdown
      className={`markdown-render ${className}`}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
    >
      {finalMarkdown}
    </Markdown>
  );
}