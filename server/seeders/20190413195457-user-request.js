module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Personals', [
      {
        id: 'c965f1d0-5ca1-4710-afbd-db69ae063eaa',
        user_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        is_reviewer: false,
        is_reported: false,
      },
    ]),
};
