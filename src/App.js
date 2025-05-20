import './App.css';
import Selector from './components/CustomSelector.js';

import { registerCustomThemes } from './scripts/themeParser.js';

import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';

import * as defaults from './scripts/defaults.js'
import { useEffect, useRef, useState } from 'react';

import './resources/simply-toasty/css/overlay.css'
import './resources/simply-toasty/css/toast.css'
import simplyToasty from './resources/simply-toasty/simplyToasty.js'

function App() {

  const [codeText, updateCodeText] = useState(defaults.code);
  const [language, setLanguage] = useState(defaults.language);
  const [theme, setTheme] = useState(defaults.theme);
  const [linkText, setLinkText] = useState('');
  const [link, setLink] = useState('');
  const [linkVisible, setLinkVisible] = useState(true);
  const [submitDisabed, setSubmitDisabled] = useState(true);
  const [languages, setLanguages] = useState([]);

  const monacoRef = useRef(null);
  const hasRun = useRef(false);


  const toasty = new simplyToasty();
  toasty.setPosition(toasty.positions.bottomRight);

  useEffect(() => {

    if (hasRun.current) return;
    hasRun.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');

    if (idFromUrl) {
      handleLoadCoad(idFromUrl);
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
      toasty.addMessage("Link copied to the clipboard", 'info', 3000);

    } catch (err) {
      console.error("Failed to copy: ", err);
      toasty.addMessage("Link cannot be copied", 'error', 3000);

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
        toasty.addMessage("Code Saved", 'success', 3000);
        handleCopyToClipboard();

      } else {
        console.error(data.error);
        toasty.addMessage("Error Submitting Code", 'success', 3000);

      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleLoadCoad = async (id) => {
    try {
      toasty.addMessage("Loading Code from Database", 'info', 3000);

      const response = await fetch(`/api/shared?id=${id}`);
      const data = await response.json();

      if (response.ok) {
        updateCodeText(data.code);
        setLanguage(data.language);
        toasty.addMessage("Code Fetched Successfully", 'success', 3000);

      } else {
        console.error(data.error);
        toasty.addMessage("Error Fetching Code", 'error', 3000);

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
