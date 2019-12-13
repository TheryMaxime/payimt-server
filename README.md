# payimt-server
Ce projet consiste en la création d’une plateforme contenant un porte-monnaie virtuel pour chaque membre de l’école. L’objectif étant de faciliter les transactions entre particuliers, mais également avec les institutions que sont : La cafétéria Le foyer Le BDE Les club évènementiels

Voir également la partie front-end : https://github.com/TheryMaxime/payimt-device)


## Comment lancer le Serveur ?
Dans un premier temps vous devez avoir NodeJS installé sur votre machine.
Si ce n'est pas le cas, veuillez vous référer à ce tutoriel pour l'installer: https://openclassrooms.com/fr/courses/1056721-des-applications-ultra-rapides-avec-node-js/1056956-installer-node-js

Une fois NodeJS installé sur votre machine, veuillez créer un dossier (exemple NomDuProjet) et y cloner ce repository.
Ensuite tapez les commandes suivantes :

```bash
cd NomDuProjet
npm install  # installer les dépendances
npm run start
```

Une fois le serveur lancé vous devriez voir apparaître une ligne verte sur le terminal avec indiqué "starting `node app.js`"
Dès lors, vous pouvez passez à la partie Front (https://github.com/TheryMaxime/payimt-device), afin de tester l'application via son interface utilisateur.

## Modifications
Dès lors que le serveur est lancé, vous pouvez faire des modifications dans le code source sans avoir à le relancer.

## LydiaConfiguration
<pre>
exports.LydiaConfiguration = {
  API_PUBLIC_TOKEN_PROD : "SECRET_KEY",
  API_PRIVATE_TOKEN_PRO : "SECRET_KEY",
  API_PUBLIC_TOKEN_TESTS : "SECRET_KEY",
  API_PRIVATE_TOKEN_TESTS : "SECRET_KEY",
  URL_LYDIA_TEST : "https://homologation.lydia-app.com",
  URL_LYDIA_PROD : "https://lydia-app.com"
}
</pre>

## HiboutikConfiguration
<pre>
exports.HiboutikConfiguration = {
  BASIC_AUTH_AUTHORIZATION : "SECRET_KEY",
  URL_HIBOUTIK : "https://ADRESSE_SERVEUR.hiboutik.com/api"
}
</pre>

