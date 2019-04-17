module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Comment_histories', [
      {
        id: 'c125a9a9-f6d0-4e8f-ac39-6964f7b6a2c5',
        comment_id: '15a2628f-ecf7-4098-8db5-95ecaf24847e',
        body: 'deep write up',
      },
      {
        id: '10ed2582-0e52-4645-a135-cd22b030ef41',
        comment_id: '15a2628f-ecf7-4098-8db5-95ecaf24847e',
        body: 'updated comment',
      },
      {
        id: 'a1adb042-5111-4d16-bb5c-ef2f4b57bf65',
        comment_id: '0b29d287-0ad0-42ca-8f74-3159bbe304af',
        body: 'Nice',
      },
      {
        id: '4432824c-dd6e-43e7-a154-f4a95c3734a2',
        comment_id: '0b29d287-0ad0-42ca-8f74-3159bbe304af',
        body: 'Hmmm',
      },
    ]),
};
