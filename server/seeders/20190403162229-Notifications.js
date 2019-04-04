module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Notifications', [
      {
        id: '3473a764-53fe-11e9-8647-d663bd873d92',
        user_id: '57c515a1-890d-412f-8ca1-0a5390123dca',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        message:
          'Your article: A Chicken in a sellsuit is an egg, had recieved a new comment from Bukunmi',
      },
      {
        id: '3473a62e-53fe-11e9-8647-d663bd873d92',
        user_id: '57c515a1-890d-412f-0ca1-0a5395123dca',
        article_id: '7139d3af-b8b4-44f6-a49f-7866779988yt',
        message: 'Chuks published a new article',
      },
      {
        id: '3473a4e4-53fe-11e9-8647-d663bd873d93',
        user_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        article_id: 'fa3def47-153a-40bd-8181-a1c234567876',
        message:
          'Victory published a new article: When physics meet chemistry, there will never be a divorce',
      },
    ]),
};
