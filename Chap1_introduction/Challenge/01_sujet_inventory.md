# 01 Sujet Exercice inventory de synt

Reprenez la collection inventory.

1. Donnez le nombre d'entreprise(s) qui ont/a exactement 2 tags.

2. Trouvez toutes les entreprises dont les deux premières lettres sont identiques.©

3. Faites la somme des quantités par status.

4. Hydratation : créez les champs **created_at** et **expired_at** pour chaque document de la collection inventory.

Vous utiliserez la méthode **ISODate** pour créer une date aléatoire ainsi que l'objet Date de JS. Aidez-vous de l'exemple ci-dessous :

- Exemple

Décallage d'un jour par rapport à la date actuelle :

```js
// Pour un jour
// 1 x 24 hours x 60 minutes x 60 seconds x 1000 milliseconds
let day = 1*24*60*60*1000

// Ajoute un jour à la date actuel
new Date( ISODate().getTime() + day )
```

5. Ajoutez un champ qui calcule le nombre de jours qui reste avant la suppression du document.

Vous pouvez utiliser les opérateurs suivants :

```js
// Pour faire une différence entre les dates
$subtract

// Pour calculer le nombre de jour
$divide
```