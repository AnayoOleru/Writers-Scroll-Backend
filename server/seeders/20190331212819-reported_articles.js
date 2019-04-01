module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Reported_articles', [
      {
        id: 'c7900e08-5407-11e9-8647-d663bd873d93',
        reporter_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        reported_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        article_id: 'fa3def47-153a-40bd-8181-a1c787e083d6',
        reporter_comment: 'bad post',
        reviewer_comment: '',
        status: 'pending',
      },
      {
        id: 'ee9eee20-545b-11e9-8647-d663bd873d93',
        reporter_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        reported_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        reporter_comment: 'Plagiarism',
        reviewer_comment: '',
        status: 'pending',
      },
      {
        id: '3473a764-53fe-11e9-8647-d663bd873d93',
        reporter_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        reported_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        reporter_comment: 'Copyright Infringment',
        reviewer_comment: '',
        status: 'pending',
      },
    ]),
};
