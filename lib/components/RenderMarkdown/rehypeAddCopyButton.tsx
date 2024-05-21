import { visit } from 'unist-util-visit';
import { Node } from 'unist';

import './light-theme/copy-code-button-styles.css';

interface Element extends Node {
  type: 'element';
  tagName: string;
  properties: Record<string, unknown>;
  children: Node[];
}

interface Text extends Node {
  type: 'text';
  value: string;  // Ensuring the text node has a 'value' property
}

export function rehypeAddCopyButton() {
  return (tree: Node) => {
    visit(tree, { tagName: 'pre' }, (node: Element) => {
      if (isElement(node)) {
        const buttonElement: Element = {
          type: 'element',
          tagName: 'button',
          properties: { className: ['copy-code-btn'] },
          children: [{ type: 'text', value: 'Copy code' } as Text]
        };

        node.children.unshift(buttonElement); // Inserts the button at the beginning of the <pre> container
      }
    });
  };
}

function isElement(node: Node): node is Element {
  return 'children' in node;
}