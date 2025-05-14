export const code = localStorage.getItem('code') || `<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`;
export const language = localStorage.getItem('language') || 'html';


export const themes = [
    {
        id: 'custom-light',
        base: 'vs',
        aliases: ['Light'],
        inherit: true,
        rules: [],
        backgroundColor: "#FFFFFE"
    },
    {
        id: 'custom-dark',
        aliases: ['VS-Dark'],
        base: 'vs-dark',
        inherit: true,
        rules: [],
        backgroundColor: "#121826"
    }
];


export const theme = localStorage.getItem('theme') || themes[0].id;


