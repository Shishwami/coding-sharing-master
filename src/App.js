import './App.css';
import Selector from './components/CustomSelector.js';

import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';

import * as defaults from './scripts/defaults.js'
import { useState } from 'react';

function App() {

  const [codeText, updateCodeText] = useState(defaults.code);
  const [language, setLanguage] = useState(defaults.language);
  const [theme, setTheme] = useState(defaults.theme);

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
    localStorage.setItem('theme', newTheme);
  };

  const languages = monaco.languages.getLanguages();
  console.log(language);

  return (
    <div id="App-container">
      <div id='App'>
        <div id='header'>
          <div id='logo'></div>
          <h3>Create & Share</h3>
          <h2>Your Code easily</h2>
        </div>
        <div id='editor-container'>
          <div id='toolbar-container' style={{ height: '100px' }}>
            <Editor
              language={defaults.language}
              value={codeText}
              theme={theme}
              onChange={handleCodeChange}
            />
            <div>
              <Selector
                value={language}
                options={monaco.languages.getLanguages().map(lang => ({
                  id: lang.id,
                  aliases: lang.aliases || [lang.id]
                }))}
                onChange={handleLanguageChange}
              />
              <Selector options={[]}></Selector>
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
