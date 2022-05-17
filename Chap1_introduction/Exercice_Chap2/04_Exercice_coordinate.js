
// Transformer un champ en coordonnee => créer un index en BD mettre des propriétés sur un champ afin que l'on puisse faire des calculs spécifiques
// Par exemple en MySQL vous pouvez transformer un champ email => index unique 

db.restaurants.createIndex({"address.coord" : "2dsphere"}) ; // calcul géométrique possible sur ce champ


const METERS_PER_MILE = 1609.34; // 1 mile en metre
const coordinate = [-73.961704, 40.662942]; // dans le planc car on est en 2DSphere

db.restaurants.find({ 
    "address.coord": 
    { $nearSphere: 
        { $geometry: { type: "Point", coordinates: coordinate }, 
        $maxDistance: 5 * METERS_PER_MILE }
    } 
}, {borough :1, name : 1, "address.coord" : 1 , _id : 0}).forEach(
    doc => {
        const { name, address, borough} = doc;
        print("----------------------------------")
        print(`Borough : ${borough.toUpperCase()}`)
        print()
        print(`name : ${name.toUpperCase()} coordinate : ${address.coord.join(' ')}`)
    }
)
