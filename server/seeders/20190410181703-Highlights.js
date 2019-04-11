module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Highlights', [
      {
        id: '3573a4e4-53fe-11e9-8647-d663bd873d93',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        start_position: 0,
        end_position: 5,
        comment: 'Nice, i like this line',
      },
      {
        id: '3583a4e4-53fe-11e9-8647-d663bd873d93',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        start_position: 0,
        end_position: 5,
        comment: 'Nice, i like this line',
      },
    ]),
};
