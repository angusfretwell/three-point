import 'should';
import ThreePoint from './source';

describe('three-point', () => {
  it('should calculate optimistic, pessimistic, likely', () => {
    const estimate = new ThreePoint([
      {
        optimistic: 4,
        pessimistic: 16,
        likely: 8,
      },
    ], 0.90);

    estimate.expected.should.equal(8.7);
    estimate.pessemistic.should.equal(5.4);
    estimate.optimistic.should.equal(12);
  });
});
