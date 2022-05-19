# Aggregate avance

Soit la collection suivantes dans la base de données products

```js
use products

db.createCollection('orders')

db.orders.insertMany( [
   { cust_id : "A123", amount : 500, status : "A" },
   { cust_id : "A123", amount : 250, status : "A" },
   { cust_id : "A123", amount : 200, status : "A" },
   { cust_id : "A123", amount : 300, status : "B" },
   { cust_id : "B123", amount : 500, status : "A" },
   { cust_id : "B123", amount : 250, status : "A" },
   { cust_id : "B125", amount : 200, status : "A" },
   { cust_id : "B126", amount : 300, status : "B" },
]);
```

Nous allons essayer de compter le nombre de cust_id identique en utilisant aggregate.

```js
db.orders.aggregate({ 
  $group: { _id: "$cust_id", count: { $sum: 1 } } 
});
```

## Récupération des données

Créez la base de données gym dans Mongo.

Puis dézipper le dossier suivant Gymase.zip sur votre poste. Ce dossier se trouve dans le dossier data sur le serveur Git.

Et enfin tapez les lignes de commande suivantes :

```bash
mongorestore -d gym -c gymnase Gymnases.bson
mongorestore -d gym -c sportif Sportifs.bson

# si vous avez un login/pass
 mongorestore --username root --password example --authenticationDatabase admin --db gym -c sportif Sportifs.bson
 mongorestore --username root --password example --authenticationDatabase admin --db gym -c gymnase Gymnases.bson
```

Et contrôlez que les données sont bien importées dans votre base de données gym dans Mongo :

```js
db.gymnase.count()
// 28
db.sportif.count()
// 150

// De même vérifier la structure
db.gymnase.findOne()
db.gymnase.count()
```

## 01 Exercices liste Gymnase & sportif

### 01 collection sportif

1. Calculez le nombre d'hommes et de femmes dans la collection sportif

2. Calculer le nombre d'hommes d'un côté et le nombre de femmes.

### 02 nom des sportifs

Trouvez tous les noms des sportifs qui ne pratiquent pas de sport. Vous pouvez pour cela utiliser l'opérateur suivant :

```js
{ a : { $exists : false } }
```

### 03 Calculez le nombre de sportifs 

Calculez le nombre de sportifs jouant pour chaque sport. 

Indications : Explorez la collection pour voir comment elle est structurée avant d'écrire un pipeline d'aggregation pour répondre à cette question.

### 04 Gymnases 

- Calculez le nombre de gymnases pour chaque ville.

## 02 Exercice nombre de grade A dans la collection restaurant

Comptez le nombre de A par type de cuisine.

## 03 Exercice augmentation

Appliquez une augmenation de 10% pour chaque somme de groupe agrégé en fonction du `cust_id`, sur les montants dont le status est A.

```
