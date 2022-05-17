db.inventory.updateMany(
  { tags: { $exists: true } },

  [
    {
      $set: {
        label: {
          $switch: {
            branches: [
              { case: { $gt: [{ $size: "$tags" }, 3] }, then: "AA" },
              { case: { $gt: [{ $size: "$tags" }, 1] }, then: "A" },
            ],
            default: "B",
          },
        },
      },
    },
  ]
);

db.inventory.find(
  { tags: { $exists: true } },
  { tags: 1, label: 1, _id: 0 }
);
