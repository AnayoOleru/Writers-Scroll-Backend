module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Followers', [
      {
        id: '7717f8cc-5471-11e9-8647-d663bd873d93',
        follower_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        followee_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      },
      {
        id: '7717feda-5471-11e9-8647-d663bd873d93',
        follower_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        followee_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      },
      {
        id: '77180074-5471-11e9-8647-d663bd873d93',
        follower_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        followee_id: 'fa3def47-153a-40bd-8181-a1c787e083d6',
      },
    ]),
};
