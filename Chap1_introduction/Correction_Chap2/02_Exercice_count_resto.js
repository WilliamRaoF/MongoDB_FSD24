// Méthode 1 (avec .forEach)
let count = 0;
db.restaurants.find({ borough: 'Brooklyn' }).forEach(() => {
    count++;
});
console.log('Nb. de restaurants dans Brooklyn:', count);

// Méthode 2 (avec le curseur)
let count = 0;
const cur = db.restaurants.find({ borough: 'Brooklyn' });
while (cur.hasNext()) {
    count++;
    cur.next();
}
console.log('Nb. de restaurants dans Brooklyn:', count);