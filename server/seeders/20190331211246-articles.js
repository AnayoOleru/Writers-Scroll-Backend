module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Articles', [
      {
        id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        user_id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        title: 'Deep look into Frontend Development',
        slug: 'tcetyvghblnklytctfgvh',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu. Nulla gravida lacinia risus a vehicula. Nulla est arcu, auctor sit amet condimentum non, porta tristique nisl. In scelerisque sem nec feugiat mollis. Morbi id bibendum est. Duis in fermentum mi, sed lobortis dolor. Nam imperdiet orci posuere arcu semper lobortis. Nulla pellentesque sem sed pharetra blandit. Maecenas suscipit lacinia ornare.',
        category: 'Computer Science',
        bookmark_count: 54,
        likes_count: 23,
        image_url: 'https://picsum.photos/200/300',
        is_reported: false,
      },
      {
        id: 'fa3def47-153a-40bd-8181-a1c787e083d6',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        title: 'Chemical Properties',
        slug: 'tefgtgcyvghblnklytctfgvh',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu. Nulla gravida lacinia risus a vehicula. Nulla est arcu, auctor sit amet condimentum non, porta tristique nisl. In scelerisque sem nec feugiat mollis. Morbi id bibendum est. Duis in fermentum mi, sed lobortis dolor. Nam imperdiet orci posuere arcu semper lobortis. Nulla pellentesque sem sed pharetra blandit. Maecenas suscipit lacinia ornare.',
        category: 'Computer Science',
        bookmark_count: 23,
        likes_count: 3244,
        image_url: 'https://picsum.photos/200/300',
        is_reported: false,
      },
      {
        id: 'fb3def47-153c-40bd-8161-a1c787e083d6',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        title: 'Article That I will soon delete',
        slug: 'soon-to-delete',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu. Nulla gravida lacinia risus a vehicula. Nulla est arcu, auctor sit amet condimentum non, porta tristique nisl. In scelerisque sem nec feugiat mollis. Morbi id bibendum est. Duis in fermentum mi, sed lobortis dolor. Nam imperdiet orci posuere arcu semper lobortis. Nulla pellentesque sem sed pharetra blandit. Maecenas suscipit lacinia ornare.',
        category: 'Computer Science',
        bookmark_count: 23,
        likes_count: 3244,
        image_url: 'https://picsum.photos/200/300',
        is_reported: false,
      },
      {
        id: 'fb3def47-153c-40bd-8161-a1c787e083d7',
        user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
        title: 'Article That I will soon delete',
        slug: 'soon-to-delete-by-reported',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu. Nulla gravida lacinia risus a vehicula. Nulla est arcu, auctor sit amet condimentum non, porta tristique nisl. In scelerisque sem nec feugiat mollis. Morbi id bibendum est. Duis in fermentum mi, sed lobortis dolor. Nam imperdiet orci posuere arcu semper lobortis. Nulla pellentesque sem sed pharetra blandit. Maecenas suscipit lacinia ornare.',
        category: 'Computer Science',
        bookmark_count: 23,
        likes_count: 3244,
        image_url: 'https://picsum.photos/200/300',
        is_reported: false,
      },
    ]),
};
