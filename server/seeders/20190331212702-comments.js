module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Comments', [
      {
        id: 'a83dc585-9cc8-48ad-b1c0-b2df0dd28117',
        user_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        body: 'Nice write up',
      },
      {
        id: 'aaeed0f6-b074-4b75-a1e9-6d1a73bfa084',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        article_id: 'fa3def47-153a-40bd-8181-a1c787e083d6',
        body: 'Nice',
      },
    ]),
};
