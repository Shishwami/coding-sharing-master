import './App.css';
import Selector from './components/CustomSelector.js';

import { registerCustomThemes } from './scripts/themeParser.js';

import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';

import * as defaults from './scripts/defaults.js'
import { useEffect, useRef, useState } from 'react';

function App() {

  const [codeText, updateCodeText] = useState(defaults.code);
  const [language, setLanguage] = useState(defaults.language);
  const [theme, setTheme] = useState(defaults.theme);

  const monacoRef = useRef(null);
  const [languages, setLanguages] = useState([]);


  const handleEditorMount = (editor, monaco) => {
    monacoRef.current = monaco;
    registerCustomThemes(monaco, defaults.themes);
    monaco.editor.setTheme(theme);

    const availableLanguages = monaco.languages.getLanguages();
    setLanguages(availableLanguages);

    tooblarThemeChange()
  };

  const handleCodeChange = (value, e) => {
    updateCodeText(value);
    localStorage.setItem('code', value);
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    monaco.editor.setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const tooblarThemeChange = () => {
    const selectedTheme = defaults.themes.find(themes => themes.id === theme);
    document.documentElement.style.setProperty('--monaco-background', selectedTheme.backgroundColor);
  }

  return (
    <div id="App-container">
      <div id='App'>
        <div id='header'>
          <div id='logo'></div>
          <h3>Create & Share</h3>
          <h2>Your Code easily</h2>
        </div>
        <div id='editor-container' style={{ height: '100px' }}>
          <Editor
            key={theme}
            language={language}
            value={codeText}
            theme={theme}
            onChange={handleCodeChange}
            onMount={handleEditorMount}
            height={'60%'}
            width={'90%'}

          />
          <div id='toolbar-container'>

            <div>
              <Selector
                value={language}
                options={languages.map(lang => ({
                  id: lang.id,
                  aliases: lang.aliases || [lang.id]
                }))}
                onChange={handleLanguageChange}
              />
              <Selector options={defaults.themes}
                value={theme}
                onChange={handleThemeChange}
              ></Selector>
            </div>
            <form>
              <button type='button'>Link</button>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
