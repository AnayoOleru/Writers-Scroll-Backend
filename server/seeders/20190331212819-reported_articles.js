module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Reported_articles', [
      {
        id: 'c7900e08-5407-11e9-8647-d663bd873d93',
        reporter_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        reviewer_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        reported_user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        reported_article_id: 'fa3def47-153a-40bd-8181-a1c787e083d6',
        reporter_reason: 'bad post',
        reporter_comment: 'The post is really bad',
        reviewer_comment: '',
        status: 'pending',
      },
      {
        id: 'ee9eee20-545b-11e9-8647-d663bd873d93',
        reporter_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        reviewer_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        reported_user_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        reported_article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        reporter_reason: 'Plagiarism',
        reporter_comment: 'The reported copied an articled i have posted',
        reviewer_comment: '',
        status: 'pending',
      },
      {
        id: '3473a764-53fe-11e9-8647-d663bd873d93',
        reporter_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        reviewer_id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        reported_user_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        reported_article_id: 'fb3def47-153c-40bd-8161-a1c787e083d7',
        reporter_reason: 'Copyright Infringment',
        reporter_comment: 'The article.................',
        reviewer_comment: '',
        status: 'pending',
      },
    ]),
};
