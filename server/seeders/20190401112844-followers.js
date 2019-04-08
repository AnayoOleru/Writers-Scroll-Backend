module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Followers', [
      {
        id: '7717f8cc-5471-11e9-8647-d663bd873d93',
        follower_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        followee_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
      },
      {
        id: '7717feda-5471-11e9-8647-d663bd873d93',
        follower_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        followee_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
      },
      {
        id: '77180074-5471-11e9-8647-d663bd873d23',
        follower_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        followee_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
      },
      {
        id: '7717feda-5471-11e9-8647-d663bd873d95',
        follower_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        followee_id: '9942e4ff-366d-46cc-9384-40eadb3b2622',
      },
      {
        id: '7717feda-5471-11e9-8647-d663bd873d96',
        follower_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        followee_id: '2242e4ff-366d-46cc-9384-40eadb3b2644',
      },
      {
        id: '77180074-5471-11e9-8647-d663bd873d27',
        follower_id: '2242e4ff-366d-46cc-9384-40eadb3b2644',
        followee_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
      },
      {
        id: '77180074-5471-11e9-8647-d663bd873d28',
        follower_id: '9942e4ff-366d-46cc-9384-40eadb3b2622',
        followee_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
      },
      {
        id: '77180074-5471-11e9-8647-d663bd873d29',
        follower_id: '0042e4ff-366d-46cc-9384-40eadb3b2699',
        followee_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
      },
    ]),
};
