module.exports = {
  // Traiter uniquement les fichiers source
  '*.{js,jsx,ts,tsx}': ['eslint --fix --max-warnings 5', 'prettier --write'],
  '*.{json,css,md,html}': ['prettier --write'],
};
