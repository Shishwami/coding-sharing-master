export const code = localStorage.getItem('code') || "//type something here;"
export const language = localStorage.getItem('language') || 'html';


export const themes = [
    {
        id: 'custom-light',
        base: 'vs',
        aliases:['Light'],
        inherit: true,
        rules:[],
        backgroundColor: "#FFFFFE"
    },
    {
        id: 'custom-dark',
        aliases:['VS-Dark'],
        base: 'vs-dark',
        inherit: true,
        rules:[],
        backgroundColor: "#121826"
    }
];


export const theme = localStorage.getItem('theme') || themes[0].id;


