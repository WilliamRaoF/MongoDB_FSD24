/**
 * 01 Exercice
 *
 * 1. Appliquez une augmenation de 10% pour chaque somme de groupe agrégé en fonction du cust_id, sur les ranges dont le status est A, en utilisant MapReduce
 */

db.orders.aggregate([
  { $match: { status: 'A' } },
  { $group: {
      _id: '$cust_id',
      totalAmount: { $sum: '$amount' }
  } },
  { $project: {
      totalAmount: 1,
      totalAmountAugmented: {
          $round: [
              { $multiply: [ '$totalAmount', 1.1 ] },
              1
          ]
      }
  } }
]);