import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Notifications from '../server/helpers/notifications';

chai.use(chaiHttp);

describe('Notifications', () => {
  it('should accept an article id, author id and a message string ', async () => {
    const notificationHelper = await Notifications.saveNewNotification(
      '7139d3af-b8b4-44f6-a49f-9305791700f4',
      '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
      'You got a new message from me'
    );
    expect(notificationHelper).to.be.an('object');
  });
});
