module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Bookmarks', [
      {
        id: '1c3daf5e-5404-11e9-8647-d663bd873d93',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      },
      {
        id: '1c3da978-5404-11e9-8647-d663bd873d93',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
      },
      {
        id: '1c3da342-5404-11e9-8647-d663bd873d93',
        user_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        article_id: 'fa3def47-153a-40bd-8181-a1c787e083d6',
      },
    ]),
};
