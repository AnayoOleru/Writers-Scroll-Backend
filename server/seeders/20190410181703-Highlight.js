module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Highlights', [
      {
        id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        user_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        start_position: 0,
        end_position: 5,
        comment: 'Nice, i like this line',
      },
      {
        id: 'c965f1d0-5ca1-4710-afbd-db69ae063eaa',
        user_id: '0042e4ff-366d-46cc-9384-40eadb3b2699',
        article_id: 'fb3def47-153c-40bd-8161-a1c787e083d6',
        start_position: 0,
        end_position: 5,
        comment: 'Nice, i like this line',
      },
    ]),
};
