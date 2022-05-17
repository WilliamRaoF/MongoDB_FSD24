/**
 * 
1. Affichez la liste des restaurants dont le nom commence et se termine par une voyelle.

2. Affichez la liste des restaurants dont le nom commence et se termine par une même lettre. Vous ferez attention à ne pas récupérer dans votre requête les restaurants n'ayant pas de nom. 
 */

// /^[aeiou].*[aeiou]$/


// 1
db.restaurants.find({ name : /^[aeiou].*[aeiou]$/i }, { name: 1, _id : 0});

// 1. (de manière programmatique)
const vowels = 'aeiouy'.split('');
db.restaurants.find({ name: { $exists: true }}, { name: 1, _id : 0}).forEach(({ name }) => {
    const first = name[0].toLowerCase();
    const last = name[name.length - 1].toLowerCase();

    if (vowels.includes(first) && vowels.includes(last)) {
        console.log(name);
    }
});


// 2
// \w <=> [a-zA-Z_0-9]
db.restaurants.find({ name : /^(\w).*\1$/i }, { name: 1, _id : 0});

// 2. (de manière programmatique)
db.restaurants.find({ name: { $exists: true }}, { name: 1, _id : 0}).forEach(({ name }) => {
    const first = name[0].toLowerCase();
    const last = name[name.length - 1].toLowerCase();

    if (first === last) {
        console.log(name);
    }
});

// =============

// const cur = db.restaurants.find({ name: { $exists: true }}, { name: 1, _id : 0});

// function showRestaurantName({ name }) => {
//     const first = name[0].toLowerCase();
//     const last = name[name.length - 1].toLowerCase();

//     if (first === last) {
//         console.log(name);
//     }
// });



// function* it(cur) {
//     let i = 0;
//     while (i++ % 20 !== 0 && cur.hasNext()) {
        
//     }
// }