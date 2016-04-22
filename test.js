import 'should';
import ThreePoint from './source';

describe('three-point', () => {
  it('should calculate optimistic, pessimistic, expected estimates', () => {
    const estimate = new ThreePoint([{
      optimistic: 4,
      pessimistic: 16,
      likely: 8,
    }], 0.90);

    estimate.expected.should.equal(8.7);
    estimate.optimistic.should.equal(5.4);
    estimate.pessimistic.should.equal(12);
  });

  it('should accept only numeric values for items', () => {
    (() => {
      new ThreePoint([{ // eslint-disable-line no-new
        optimistic: 'fail',
        pessimistic: 16,
        likely: 8,
      }]);
    }).should.throw();
  });
});
