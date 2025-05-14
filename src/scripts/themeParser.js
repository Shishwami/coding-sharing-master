export function registerCustomThemes(monaco, customThemes) {
    customThemes.forEach(theme => {
        monaco.editor.defineTheme(theme.id, {
            base: theme.base,
            inherit: theme.inherit,
            rules: theme.rules,
            colors: {
                'editor.background': theme.backgroundColor
            }
        });
    });
}
