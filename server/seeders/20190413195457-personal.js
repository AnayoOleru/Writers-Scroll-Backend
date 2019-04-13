module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Personals', [
      {
        id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        user_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        is_reviewer: false,
        is_reported: false,
      },
    ]),
};
