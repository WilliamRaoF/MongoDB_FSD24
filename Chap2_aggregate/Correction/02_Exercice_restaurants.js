// 01
db.restaurants.aggregate([
    {
        $group: {
            _id: {
                "cuisine": "$cuisine",
                "borough": "$borough"
            },
            names: { $push: { name: "$name", restaurant_id: "$restaurant_id" } }
        },
    },
    { $limit: 2 }
])

// 02
db.restaurants.aggregate([
    { $match: { cuisine: "Italian" } },
    {
        $group: {
            _id: {
                "borough": "$borough"
            },
            names: { $push: "$name" }
        }
    }
]).pretty()

// 03
db.restaurants.aggregate([
    { $unwind: "$grades" },
    { $group: { _id: "$restaurant_id", names: {$first: '$name'}, avg_by_restaurant: { $avg: "$grades.score" } } },
    { $project: {names : 1, avg_by_restaurant : 1, _id: 0}},
    { $sort: { avg_by_restaurant: -1 } }
]).pretty()

// Moyenne des scores par quartier et type de restaurant
db.restaurants.aggregate([
    { $unwind: "$grades" },
    {
        $group: {
            _id: {
                "cuisine": "$cuisine",
                "borough": "$borough"
            },
            avg: { $avg: "$grades.score" }
        }
    },
    {
        $sort: {
            avg: -1
        }
    }
])

// 04
db.restaurants.aggregate([
    { $match: { cuisine: "Italian" } },
    { $unwind: "$grades" },
    {
        $group: {
            _id: {
                "restaurant_id": "$restaurant_id"
            },
            name: {$first: '$name',
            avg: { $avg: "$grades.score" },
        },

    },
    { $sort: { avg: -1 } },
    { $limit: 5 },
    { $out: "top5" }
]).pretty();

// 05 Correction
db.restaurants.aggregate([
    // les restaurants qui ont un score au moins supérieur à 30 identique à un WHERE en MySQL
    { $match: { "grades.score": { $gte: 30 } } },
    {
        $group: {
            _id: "$borough",// agrégation des données par quartier => crée des sous-ensemble
            totalRestaurant: { $sum: 1 }, // fonction agrégation sur les sous-ensembles
            cuisines: { $addToSet: "$cuisine" } // ajouter dans un tableau de manière unique chaque type de restaurants
            // cuisines : { $push : "$cuisne" } // on aurait dans ce cas eu des doublons de type 
        }
    },
    {
        $sort: {
            totalRestaurant: -1
        }
    }
])

// 06
db.restaurants.aggregate([
    { $unwind: "$grades" },
    { $match: { "grades.score": { $exists: true }, "grades.score": { $gt: 30 } }  },
    {
        $group: {
            _id: {
                "borough": "$borough"
            },
            names: {
                $push: {
                    name: "$name",
                    avg: {
                        $avg: "$grades.score"
                    },
                }
            },
        },
    },
    { $project: { _id: 1, names: 1 } },
    { $sort: { avg: -1 } }
]).pretty()
