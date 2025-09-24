'use client';

import { useEffect, useRef } from 'react';

import hljs from 'highlight.js';
import Undo from 'editorjs-undo';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Embed from '@editorjs/embed';
import RawTool from '@editorjs/raw';
import CodeTool from '@editorjs/code';
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import Marker from '@editorjs/marker';
import ImageTool from '@editorjs/image';
import Warning from '@editorjs/warning';
import EditorJS from '@editorjs/editorjs'; // Main EditorJS import
import Checklist from '@editorjs/checklist';
import Paragraph from '@editorjs/paragraph';
import Underline from '@editorjs/underline';
import Delimiter from '@editorjs/delimiter';

// --- Tools Configuration ---
const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4],
      defaultLevel: 2
    }
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true // Enables Bold, Italic
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered' // 'ordered' or 'unordered'
    }
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: "Quote's author"
    }
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      withHeadings: true // Enable table headers
    }
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: (file: File) =>
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve({
                  success: 1,
                  file: { url: 'https://placehold.co/600x400' }
                }),
              500
            )
          )
      }
    }
  },
  code: {
    class: CodeTool,
    config: {
      placeholder: 'Enter your code here...'
    }
  },
  linkTool: {
    class: LinkTool,
    config: {
      /**
       * IMPORTANT: To get link previews, you need a backend endpoint.
       * This endpoint should accept a GET request with a 'url' parameter
       * and return metadata in the format required by the LinkTool.
       * See: https://github.com/editor-js/link#server-side-implementation
       */
      // endpoint: 'http://localhost:3000/api/fetchUrl', // Your backend endpoint for link previews
    }
  },
  embed: {
    class: Embed,
    inlineToolbar: true,
    config: {
      services: {
        youtube: true,
        twitter: true,
        codepen: true
      }
    }
  },
  marker: {
    class: Marker, // For highlighting text
    shortcut: 'CMD+SHIFT+M'
  },
  underline: {
    class: Underline, // For underlining text
    shortcut: 'CMD+U'
  },
  // --- New tools added below ---
  delimiter: {
    class: Delimiter
  },
  warning: {
    class: Warning
  },
  raw: {
    class: RawTool
  }
};

// --- Main Editor Component ---
interface EditorComponentProps {
  initialData?: any;
  onChange?: (data: any) => void;
  placeholder?: string;
}

function EditorComponent({
  initialData,
  onChange,
  placeholder = "Let's write an awesome story!"
}: EditorComponentProps) {
  const holderRef = useRef<HTMLDivElement>(null);
  const ejInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    // Initialize editor only once
    if (!ejInstance.current && holderRef.current) {
      const editor = new EditorJS({
        holder: holderRef.current,
        tools: EDITOR_JS_TOOLS as any,
        data: initialData || {},
        placeholder: placeholder,
        autofocus: true,
        onReady: () => {
          new Undo({ editor });
          // Highlight initial code blocks
          hljs.highlightAll();
        },
        onChange: async api => {
          const content = await api.saver.save();
          if (onChange) {
            onChange(content);
          }
          // Highlight code blocks after each change
          hljs.highlightAll();
        }
      });
      ejInstance.current = editor;
    }

    // Cleanup on unmount
    return () => {
      if (ejInstance.current?.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
    // Empty dependency array ensures this effect runs only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="prose prose-lg max-w-none prose-pre:bg-[#282c34] prose-pre:text-white">
      <div
        ref={holderRef}
        className="min-h-[500px] p-4 border border-input rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent"
      />
    </div>
  );
}

export default EditorComponent;
