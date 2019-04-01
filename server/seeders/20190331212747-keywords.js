module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Keywords', [
      {
        id: 'd8ccd71a-5401-11e9-8647-d663bd873d93',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        keyword: 'front-end',
      },
      {
        id: 'd8ccd49a-5401-11e9-8647-d663bd873d93',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        keyword: 'react',
      },
      {
        id: 'd8ccd31e-5401-11e9-8647-d663bd873d93',
        article_id: 'fa3def47-153a-40bd-8181-a1c787e083d6',
        keyword: 'chemistry',
      },
    ]),
};
