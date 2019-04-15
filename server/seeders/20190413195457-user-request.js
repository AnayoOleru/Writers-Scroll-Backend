module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Requests', [
      {
        id: 'c965f1d0-5ca1-4710-afbd-db69ae063eaa',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        is_reviewer: false,
        is_reported: false,
      },
    ]),
};
