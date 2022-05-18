// 1. Donnez le nombre d'entreprise(s) qui ont/a exactement 2 tags.

db.inventory.find({ tags: { $size: 2 } }, { _id: 0, tags: 1, society: 1 })

db.inventory.find({
    $and: [
        { tags: { $exists: true } },
        { tags: { $size: 2 } },
    ]
},
    { _id: 0, tags: 1, society: 1 }
)

// 2. Trouvez toutes les entreprises dont les deux premières lettres sont identiques
db.inventory.find({ society: /^(.)\1/i }, { society: 1, _id: 0 });

// modifions deux sociétés pour qu'elle est le même nom
db.inventory.updateMany(
    { society: "Alex" },
    {
        $set: { society: "AAlex" },
        $currentDate: { lastModified: true }
    }
);

// 3. Faites la somme des quantités par status.
let res = {};
db.inventory.find(
    { qty: { $exists: true } },
    { status: 1, qty: 1, _id: 0 }
).forEach(({ status, qty }) => {
    if (!res[status]) res[status] = 0;

    res[status] += qty;
});

// 4. Hydratation : créez les champs **created_at** et **expired_at** pour chaque document de la collection inventory.
db.inventory.find({}, { '_id': 1 }).forEach(doc => {
    const days = Math.floor(Math.random() * 100) * 24 * 60 * 60 * 1000;

    db.inventory.updateOne(
        { '_id': doc._id },
        [
            { $set: { created_at: new Date() } },
            { $set: { expired_at: new Date(ISODate().getTime() + days) } }
        ]
    );
})

// 5.
db.inventory.updateMany(
    { _id: { $exists: true } },
    [
        { $set: { life: { $divide: [{ $subtract: ["$expired_at", "$created_at",] }, 1000 * 60 * 60 * 24] } } },
    ]
);

// 1.
db.inventory.find = (rest, proj = null) => {
    if (proj === null)
        return db.inventory.find(rest);
    else
        return db.inventory.find(rest, proj);
};

let total = 0;

db.inventory.find({ type: "journal" }).forEach(doc => {
    const { qty } = doc;

    total += qty;
});

print(`Total des produits : ${total}`);

// 1. Deuxième solution

total = 0;
db.inventory.find({ type: "journal" }).forEach(doc => {
    const { qty } = doc; // destructuration

    total += qty;

});

// 2.
db.inventory.find({ year: { $gte: 2018 } }, { society: 1, qty: 1, _id: 0 }).forEach(doc => {
    const { society, qty } = doc;

    print(society, qty);
});
