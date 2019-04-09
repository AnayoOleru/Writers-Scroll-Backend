import { expect } from 'chai';
import readingTime from '../server/helpers/reading-time';

const article1 = {
  title:
    'When I was young I never thought about my neck. It was smooth and supple like the rest of me. Now my neck is a monster. A saggy, craggy, battle damaged monster. If I pinch the skin on my neck, it stays pinched, like silly putty. Recently I was in Target shopping for shirts. I tried one on and looked in the mirror. The image reflected back was terrifying. A dark throat cavern nestled between two angry tendons. Something you might see in a horror movie close-up. The throat of an old man who should not have answered the door',
  abstract:
    'When I was young I never thought about my neck. It was smooth and supple like the rest of me. Now my neck is a monster. A saggy, craggy, battle damaged monster. If I pinch the skin on my neck, it stays pinched, like silly putty. Recently I was in Target shopping for shirts. I tried one on and looked in the mirror. The image reflected back was terrifying. A dark throat cavern nestled between two angry tendons. Something you might see in a horror movie close-up. The throat of an old man who should not have answered the door',
};

const article2 = {
  title:
    'Lorem ipsum dolor sit amet consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu. Nulla gravida lacinia risus a vehicula. Nulla est arcu, auctor sit amet condimentum non, porta tristique nisl. In scelerisque sem nec feugiat mollis. Morbi id bibendum est. Duis in fermentum mi, sed lobortis dolor. Nam imperdiet orci posuere arcu semper lobortis. Nulla pellentesque sem sed pharetra blandit. Maecenas suscipit lacinia ornare. Lorem ipsum dolor sit amet consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum.',
  abstract:
    'Lorem ipsum dolor sit amet consectetur adipiscinge. Ut pulvinar maximus nulla in fermentum. Vivamus eu arcu suscipit, tempor nisi sed, auctor arcu. Nulla gravida lacinia risus a vehicula. Nulla est arcu, auctor sit amet condimentum nomentum mi, sed lobortis dolor. Nam imperdiet orci posuere arcu semper lobortis. Nulla pellentesque sem sed pharetra blandit. Maecenas suscipit lacinia ornare. Lorem ipsum dolor sit amet consectetur adipiscing elit. Proin quis metus sed turpis pulvinar tristique. Ut pulvinar maximus nulla in fermentum.',
};

describe('Cacluate time test', () => {
  it('should return calculated', done => {
    expect(readingTime(article1.abstract, article1.title)).to.equal(1);
    done();
  });

  it('should return calculated', done => {
    expect(readingTime(article2.abstract, article2.title)).to.equal(1);
    done();
  });
});
