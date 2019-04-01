module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Drafts', [
      {
        id: '3473a9bc-53fe-11e9-8647-d663bd873d93',
        user_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        title: '',
        slug: 'tcyvghblnklytctrfrfgvh',
        abstract: 'Lorem ipsum dolor ',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pu',
        category: 'Biology',
        imageurl: 'https://picsum.photos/200/300',
      },
      {
        id: '3473a890-53fe-11e9-8647-d663bd873d93',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        title: 'Deep',
        slug: 'tcyvghbrfelnrefklytctfgvh',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu.',
        body: '',
        category: '',
        imageurl: 'https://picsum.photos/200/300',
      },
    ]),
};
