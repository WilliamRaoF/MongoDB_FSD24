/**
 * 
01 Calculez le nombre d'hommes et de femmes dans la collection sportif à l'aide du Pattern MapReduce.
 */

// 01. Calculez le nombre d'hommes et de femmes dans la collection sportif
// 01. Calculer le nombre d'hommes d'un côté et le nombre de femmes.

db.sportif.aggregate([{ $group: { _id: {$toUpper"$Sexe"}, count: { $count: {} } } }]);

/**
 * 02 Trouvez tous les noms des sportifs qui ne pratiquent pas de sport. Vous pouvez pour cela utiliser l'opérateur suivant $exists : false
 * Calculez le n
 */

 db.sportif.aggregate([
  { $match: {
      'Sports': { $exists: false }
  } },

  { $project: {
      _id: 0,
      fullname: { $concat: ['$Prenom', ' ', { $toUpper: '$Nom'}]}
  } }
]);

// 03 Calculez le nombre de sportifs jouant pour chaque sport.

db.sportif.aggregate([
  { $unwind: '$Sports.Jouer' },
  { $project: { sport : "$Sports.Jouer",  _id : 0 } },
  { $group: { _id: "$sport", nbSportifs: { $sum: 1 } } }
]);

/**
 * 04 Gymnases
 */

// - Calculez le nombre de gymnases pour chaque ville.

db.gymnase.aggregate([
  { $group: {
      _id: '$Ville',
      nbGymnases: { $count: {} }
  } }
]);