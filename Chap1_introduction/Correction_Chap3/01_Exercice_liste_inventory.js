// ==============
// 01. Affichez tous les articles de type journal. Et donnez la quantité total de ces articles (propriété qty). Pensez à faire un script en JS.
// ==============

db.inventory.find(
    { type: "journal" },
    { _id : 0, society: 1, qty : 1 }
);

// total 
let totalQty = 0;
db.inventory.find(
    { type: "journal" },
    { _id : 0, society: 1, qty : 1 }
).forEach( doc => {
    totalQty += doc.qty;
    console.log(doc.society);
});
console.log(totalQty);

// ==============
// 02. Affichez les noms de sociétés depuis 2018 avec leur quantité (sans agrégation)
// ==============

db.inventory.find(
    { year: { $gte : 2018 } },
    { _id : 0, society: 1, qty : 1 }
);

// ==============
// 03. Affichez les types des articles pour les sociétés dont le nom commence par A.
// ==============

db.inventory.find(
    { society : /^A/ },
    { _id : 0, type: 1, society : 1}
).forEach( doc => {
    const { society, type } = doc;
    console.log(`Society ${society} type: ${type}`)
});

// ou tout simplement
db.inventory.find(
    {society : /^A/},
    { _id : 0, type: 1, society : 1}
);

// ==============
// 04. Affichez le nom des sociétés dont la quantité d'articles est supérieur à 45.
// ==============

db.inventory.find(
    { qty : { $gt : 45} },
    { _id : 0, society: 1, qty : 1}
).sort({ qty : 1}).forEach(doc => {
    const { qty, society } = doc;
    console.log(`Society ${society} quantity: ${qty}`)
});

// ou tout simplement
db.inventory.find(
    { qty : { $gt : 45} },
    { _id : 0, society: 1, qty : 1}
).sort({ qty : 1});

// ==============
// 05. Affichez le nom des sociétés dont la quantité d'article(s) est strictement supérieur à 45 et inférieur à 90.
// ==============

db.inventory.find(
    {
        $and : [
            { qty : { $gt : 45 } }, 
            { qty : { $lt : 90 } }
        ]
    }, 
    { _id : 0, society: 1, qty : 1 }
).sort({ qty : 1}).forEach(doc => {
    const { qty, society } = doc;
    console.log(`Society ${society} quantity: ${qty}`)
})

// ou simplement
db.inventory.find(
    {
        $and : [
            { qty : { $gt : 45 } }, 
            { qty : { $lt : 90 } }
        ]
    }, 
    { _id : 0, society: 1, qty : 1 } 
).sort({ qty : 1 });

// ==============
// 6. Affichez le nom des sociétés dont le statut est A ou le type est journal.
// ==============

db.inventory.find(
    {
        $or: [
            { status: "A" },
            { type: "journal" }
        ]
    },
    { _id: 0 }
).sort({ society : 1 }).forEach( invent => {
    console.log(invent.society, invent.qty);
});

db.inventory.find(
    {
        $or: [
            { status: "A" },
            { type: "journal" }
        ]
    }
).sort({ society : 1 });

// ==============
// 7. Affichez le nom des sociétés dont le statut est A ou le type est journal et la quantité inférieur strictement à 100.
// ==============

db.inventory.find(
{
    $and : [
        { qty: { $lt : 100 } },
        {
            $or: [ { status : "A" }, { type : "journal" } ]
        }
    ]
}).sort({ society : 1 }).forEach( invent => {
    console.log(invent.society, invent.qty);
});

// ==============
// 8. Affichez le type des articles qui ont un prix de 0.99 ou 1.99 et qui sont true pour la propriété sale ou ont une quantité strictement inférieur à 100.
// ==============

db.inventory.find(
    {
        $and : [
            { $or : [ { price : 0.99 }, { price : 1.99 } ] },
            { $or : [ { sale : true }, { qty : { $lt : 45 } } ] }
        ]
    },
    { society : 1 }
).sort({ society : 1 }).forEach( invent => {
    const { society, price, qty } = invent;
    console.log(`Society : ${society} price :${price}, quantity : ${qty}`);
});

// ==============
// 9. Affichez le nom des sociétés qui ont des tags.
// ==============

db.inventory.find({ tags : { $exists : true } }).sort({ society : 1 }).forEach( invent => {
    const { tags, society } = invent;

    console.log(`Society : ${society} tags :${tags.join(" ")}`);
});

// ==============
//10. Affichez le nom des sociétés qui ont au moins un tag blank.
// ==============

db.inventory.find({ tags : "blank" }).sort({ society : 1 }).forEach( invent => {
    const { tags, society } = invent;

    console.log(`Society : ${society} tags :${tags.join(" ")}`);
});