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
  const [linkText, setLinkText] = useState('');
  const [link, setLink] = useState('');
  const [linkVisible, setLinkVisible] = useState(true);
  const [submitDisabed, setSubmitDisabled] = useState(true);

  const monacoRef = useRef(null);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');

    if (idFromUrl) {
      console.log("loading code please wait")
      handleLoadCoad(idFromUrl);
    } else {
      console.log('ID not found in URL');
    }
  }, []);

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
    setSubmitDisabled(false);
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

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const body = {
      code: codeText,
      language: language,
    };

    try {
      const response = await fetch(`/api/submitSnippet`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.ok) {
        const snippetUrl = `${window.location.origin}/shared?id=${data.id}`;
        setLinkText(`../${data.id}`);
        setLink(snippetUrl);
        setLinkVisible(false);
        window.history.pushState({}, '', `/shared?id=${data.id}`);
      } else {
        console.error("Error submitting snippet:", data.error);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleLoadCoad = async (id) => {
    try {
      const response = await fetch(`/api/shared?id=${id}`);
      const data = await response.json();

      if (response.ok) {
        updateCodeText(data.code);
        setLanguage(data.language);
      } else {
        console.error(data.error);
      }

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div id="App-container">
      <div id='App'>
        <div id='header'>
          <div id='logo'></div>
          <h3>Create & Share</h3>
          <h2>Your Code easily</h2>
        </div>
        <div id='editor-container'>
          <div id='editor-wrapper'>
            <Editor
              key={theme}
              language={language}
              value={codeText}
              theme={theme}
              onChange={handleCodeChange}
              onMount={handleEditorMount}
            />
          </div>

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
            <form onSubmit={handleSubmit}>

              {!linkVisible && (<button
                type='button'
                onClick={handleCopyToClipboard}
                disabled={linkVisible}>
                <i></i>{linkText}
              </button>)}

              <button
                type='submit'
                disabled={submitDisabed}
              ><i></i>Submit</button>
            </form>
          </div>
        </div>
        <div className="author-info">
          Coded by <a href="#">Eugene Peralta</a> | Challenge by
          <a href="https://www.devchallenges.io?ref=challenge" target="_blank"
          >devChallenges.io</a>.
        </div>
      </div>
    </div>
  );
}

export default App;
