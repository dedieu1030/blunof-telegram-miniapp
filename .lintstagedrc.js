module.exports = {
  // Traiter uniquement les fichiers source
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix --max-warnings 0',
    'prettier --write'
  ],
  '*.{json,css,md,html}': [
    'prettier --write'
  ],
  // Ignorer les fichiers dans node_modules et autres dossiers non pertinents
  '!node_modules/**/*',
  '!dist/**/*',
  '!build/**/*',
  '!.git/**/*'
}
