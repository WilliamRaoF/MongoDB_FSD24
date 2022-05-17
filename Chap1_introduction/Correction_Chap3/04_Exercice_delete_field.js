
/*
Supprimez la propriété level se trouvant dans un/les document(s). 

Vérifiez qu'il existe au moins un doc qui possède le champ ou la clé level à l'aide d'une requête avant cette action.
*/

// Vérification cette requête ne retourne rien 
db.inventory.find({ level: { $exists: true } }).count()

db.inventory.updateOne(
    { level: { $exists: true } },
    { $unset: { level: "" } }
)

// Vérification cette requête ne retourne rien 
db.inventory.find({ level: { $exists: true } }).count()