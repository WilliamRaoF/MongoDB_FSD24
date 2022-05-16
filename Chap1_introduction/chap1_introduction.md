# Introduction & Présentation

MongoDB est une base de données NoSQL (Not Only SQL) crée en 2007, mature et orientée document (fichier BJSON).

MongoDB est un DSL (Domain-Specific Language), il n'utilise pas le paradigme SQL, mais un langage original dédié à l'interrogation des données.

Il est adapté au stockage de données **massives** qui peuvent varier dans le temps, son DSL est puissant et permet d'interroger les données facilement. Notez que lorsque la structure des données est connues au préalable et ne bouge pas dans le temps on utilisera de préférence du SQL.

Dans un projet d'application Web vous serez amené à travailler avec les **deux** paradigmes SQL et NoSQL, par exemple MySQL et MongoDB.

Enfin, MongoDB propose un ensemble important de drivers pour les langages comme PHP, JS, Python, ... Comme par exemple MySQL.

## Document et collection

Dans une base de données MongoDB vous manipulerez des **documents**, fichiers semi-structurés BJSON dont les propriétés sont typées. BJSON est un **binaire** qui permet d'interroger les données plus rapidement.

Les documents sont stockés dans une collection qui se trouve dans une base de données sur un serveur MongoDB.

## Modélisation des données

MongoDB ne gère **aucun schéma de données** il est orienté flexibilité, les collections n'ont donc pas de structure pré-déterminée ou fixe, elles peuvent donc **évoluer dans le temps**. Dans un document, des champs peuvent être ajoutés, supprimés, modifiés et renommés à tout moment ...

Le modèle des documents est basé sur un système de **clés/valeurs**. Chaque valeur peut être de type scalaire, c'est-à-dire des numériques, chaîne de caractères, boléens ou la valeur particulière `null`. Ces valeurs peuvent également comporter des listes de valeurs ou même des documents imbriqués.

Ci-dessous un exemple représentant une collection de 2 documents :


```json
{
  // Collection
  "students": [

    // Document 1
    {
      "_id": 1,
      "name": "Alan",
      "address": {
        "street": "London",
        "city": "London",
        "zip": " 31413"
      },
      "grade": "master 5",
      "notes": [14, 17, 19, 20],
      "relationship": null
    },
    
    // Document 2
    {
      "_id": 2,
      "name": "Alice",
      "address": "Paris",
      "grade": "master 4",
      "notes": [19, 11, 20],
      "relationship": [1]
    }

  ]
}

```

Remarque : chaque document possède obligatoirement une clé unique `_id`, le type de cette propriété est par défaut **ObjectId**, mais peut être de n'importe **quel type scalaire**. La valeur de ce champ doit cependant **être unique** dans le document et bien sûr non mutable. Vous ne pouvez pas définir par exemple cette clé avec un array ou un objet qui sont des valeurs mutables.

## Comment utiliser MongoDB ?

Nous pouvons utiliser un interpréteur graphique comme [Studio 3T](https://studio3t.com/) ou [MongoDB Compass](https://www.mongodb.com/docs/compass/current/), ou utiliser MongoDB directement en console avec son interpréteur JS.
C'est cette configuration que nous utiliserons dans le cours.

Ouvrez un terminal et connectez-vous à votre serveur MongoDB :

```bash
mongosh

# Si vous êtes sous Docker, ne pas oublier le login et mdp :
mongosh -u root -p example
```

---

## Exemples de commandes MongoDB

Une fois connecté sur votre serveur MongoDB, vous avez accès aux commandes CLI (Command Line Interface). Si vous souhaitez quitter le CLI, vous taperez dans MongoDB :

```bash
quit()  # équivalent : exit
```

Dans le CLI sur le serveur MongoDB, vous avez accès aux commandes de base suivantes :

```js
// Affichez les bases de données
show dbs

// Connexion et/ou création d'une base de données "restaurants"
use restaurants

// Connaitre le nom de la base de données sur laquelle on est connecté
db

// Créer une collection vide "addresses"
db.createCollection('addresses')

// Voir les collections existantes de la 'db'
show collections

// Insérer un document dans une collection
db.addresses.insertOne(
  {
    name: 'Indiana Coffee',
    location: '4th Baker Street, London'
  }
)

// Voir la liste des documents dans une collection
db.addresses.find()

// Renommer une collection "addresses" en "address"
db.addresses.renameCollection("address")

// ex: Supprimer l'ensemble des documents dans une collection
db.address.deleteMany({})

// Supprimer physiquement une collection
db.address.drop()

// Supprimer la base de données actuelle
//  ⚠ Cela supprimera également toutes les collections dans cette base !
db.dropDatabase()


// Efface la console
cls
```
