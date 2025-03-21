# Mango - Mobile App

Application mobile de mango

## Lancement en local

- dans les repos `mango-scraping-api` et `mango-bd-api` lancez la commande :

```bash
npm run dev
```

- dans le repo `mango-mobile-app` lancez la commande :

```bash
npm run start
```

_Note_: Le script `start` va supprimer le précédent dossier `/shared` et le remplacer par le plus récent

- vous pouvez maintenant retrouver l'application :
  - web à l'adresse [localhost:8081](http://localhost:8081)
  - expo go en entrant l'url [exp://\<ip-ordi>:8081](http://localhost:8081) (ip de la forme `192.168.168.167` si sur même réseau) dans l'application

## Déployer une nouvelle version sur l'App Store

- changez la version dans le fichier `app.json` :

```json
"expo": {
    "name": "Mango",
    "slug": "mango-mobile-app",
    "version": "1.7.1", // <-- changer ici
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "fr.pierrot.mango",
      "versionCode": 4 // <-- et ici
    },
```

- lancez la commande :

```bash
npm run build:release
```

- vous pouvez suivre l'avancement du build de la release sur l'eas avec le lien suivante [expo.dev/projects/mango-mobile-app/builds](https://expo.dev/accounts/pierrot552/projects/mango-mobile-app/builds) (généralement le build dure environ 10min mais peut tomber dans la queue et prendre beaucoup plus de temps)

- une fois le build terminé, 2 méthodes s'offrent à vous :
  - **Méthode manuel**
  - **Avec EAS** (configuré pour la publication)

### Méthode manuel

- téléchargez le build (ça doit être un fichier d'extension `.aab`)
- dirigez vous ensuite à l'onglet _Production_ dans [Google Play Console](https://play.google.com/console/u/1/developers/6014339825981218094/app/4975331479852398545/tracks/production)
- Créez une nouvelle version avec le build précédemment téléchargé
- Vous pouvez enfin publier votre version et attendre la fin de l'examination !

### Avec EAS

- lancer la commande :

```bash
npm run publish
> Select a build from EAS
> Prendre la dernière version build sur EAS
> Choose an existing key
> play-console-service-account@pootime-adventure.iam.gserviceaccount.com
```

- vous pouvez suivre l'avancement du build de la release sur l'eas avec le lien suivante [expo.dev/projects/mango-mobile-app/submissions](https://expo.dev/accounts/pierrot552/projects/mango-mobile-app/submissions) (généralement le build dure environ 10min mais peut tomber dans la queue et prendre beaucoup plus de temps)
- si vous rencontrez une erreur, vous pouvez passer à la méthode manuelle

## Mettre à jour Expo

```bash
npx expo install expo@latest
npx expo install --fix
npm audit
npm audit fix
# npm audit fix --force
```

_Note_: Penser à vérifier que de nouvelles dépendances n'aient pas été ajoutées ou retirées dans le processus

## TODO

- dans BD API : voir pq tous les scrapers sont enabled
- finir ajout filtre lang dans latestchapter
- mettre en cache les filtres precedemment select (pour garder langs par ex après déco/reco)
- changer apparences chapitre (comme netflix, image en grand)
- mettre systeme de notification pour manga fav
- fix env variables
