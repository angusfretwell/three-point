import 'should';
import module from './source';

describe('module', () => {
  it('default', () => {
    module.should.be.true();
  });
});
