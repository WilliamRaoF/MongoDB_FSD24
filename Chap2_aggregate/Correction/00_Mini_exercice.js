/* 
    {
        fullAddress: "8825 Astoria Boulevard, 11369",
        fullname: "Brunos On The Boulevard (QUEENS)",
        cuisine: "American",
        grades: [ … ] // au moins un type 'A'
    }
*/

db.restaurants.aggregate([

    { $match: {
        cuisine: 'American',
        'grades.grade': 'A'
    } },

    { $project: {
        _id: 0,
        cuisine: 1,
        grades: 1,
        fullAddress: { $concat: [
            '$address.building',
            ' ',
            '$address.street',
            ', ',
            '$address.zipcode',
        ] },
        fullname: {
            $concat: ['$name', ' (', { $toUpper: '$borough' }, ')']
        },
    } }

]);