// 1
db.inventory.updateMany(
    { qty: { $gte: 75 } },
    { $set: { "scores": [19] } },
    { "upsert": false }
);


// 2.
db.inventory.updateMany(
    { society: /[aA]/ },
    {
        $push: {
            scores: 11
        }
    }
)

//3. 
db.inventory.find({ scores: { $in: [11] } }, { _id: 0, scores: 1, society: 1 });

db.inventory.updateMany(
    { society: "Alex" },
    { $set: { "comment": "Hello Alex" } },
    { "upsert": false }
);

// 4.
db.inventory.find({ comment: "Hello Alex"  }, { _id: 0, comment: 1, society: 1 });

// 5.
db.inventory.find({ comment: { $exists : false } }, { _id: 0, comment: 1, society: 1 });

// on peut vérifier que l'on affiche bien les documents avec le champ comment
db.inventory.find({ comment: { $exists : true } }, { _id: 0, comment : 1, society: 1 });

