// src/components/MonacoEditor.js
import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

export default function MonacoEditor() {
  const editorRef = useRef(null);
  const monacoInstanceRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      monacoInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: '// Type your code here...',
        language: 'javascript',
        theme: 'vs-dark',
      });
    }

    return () => {
      if (monacoInstanceRef.current) {
        monacoInstanceRef.current.dispose();
      }
    };
  }, []);

  return <div ref={editorRef} style={{ height: '90vh', width: '100%' }} />;
}
