#!/bin/bash

echo "Build du frontend..."
cd frontend || exit
npm run build
cd ..

echo "Nettoyage de l'ancien build du backend..."
rm -rf backend/public/*

echo "Copie des fichiers buildés vers le backend..."
cp -r frontend/build/* backend/public/

echo "Déploiement sur Vercel..."
cd backend || exit
vercel --prod --yes
