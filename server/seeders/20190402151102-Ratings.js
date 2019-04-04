module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Ratings', [
      {
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        article_id: 'fa3def47-153a-40bd-8181-a1c787e083d6',
        rating_value: 2,
      },
    ]),
};
