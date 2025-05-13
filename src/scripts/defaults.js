export const code = localStorage.getItem('code') || "//type something here;"
export const language = localStorage.getItem('language') || 'javascript';


export const themes = [
    {
        id: 'custom-light',
        backgroundColor: "#FFFFFE"
    }
];

export const theme = localStorage.getItem('theme') || themes[0].id;


