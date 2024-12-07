
---- Procedure d'installation ----

Aller dans votre dossier désiré pour contenir le projet
executer la commande git clone https://github.com/VincentHoule/ProjetDndReact.git
npm install


L'application permet la création de personnage dnd. Les personnages sont modifiable et supprimable.
Aussi les personnages peuvent être trier par classe et par tranche de niveau.

Utilisateur pour se connecter:
Nom : Crotus Morus
mot de passe: 672b7b7b1f452503fb82de89
* le mtp est l'id des statistique du personnage

---- Attention ----
L'utilisateur est relié au personnage Crotus Morus. Veuillez à ne pas le supprimer.

---- Conseil ----
Si la connexion ne fonctionne pas. Appuyez plusieurs fois sur connecter et cela devrait régler le problème de "Opération personnage.find()"
Liens vers le site en ligne: https://projetdndreact.netlify.app/liste
Mise en ligne avec netify

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
