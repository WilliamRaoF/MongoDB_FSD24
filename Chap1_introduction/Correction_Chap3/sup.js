// Aggregate
db.inventory.aggregate([
    {$match : { type : "journal"}}, // restriction premier pipe
    // aggregate des données
    { $group : { 
        _id : null, // par rapport à quel champ vous regrupez si null tous les champs tout le document
        totalQty : { $sum : "$qty"} ,
        count : { $sum : 1}
    }},
])

// pour le tester dans la console
db.inventory.aggregate([
    {$match : { type : "journal"}}, 
    { $group : { 
        _id : null,
        totalQty : { $sum : "$qty"} ,
        count : { $sum : 1}
    }},
]);

// Total des quantités par société
db.inventory.aggregate([
    { $group : { 
        _id : "$society",
        totalQty : { $sum : "$qty"} ,
        count : { $sum : 1}
    }},
]);

// total des quantités par type de societé
db.inventory.aggregate([
    { $group : { 
        _id : "$type",
        totalQty : { $sum : "$qty"} 
    }},
]);