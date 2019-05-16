import { PostalCodeFilterPipe } from './postal-code-filter.pipe';

describe('PostalCodeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new PostalCodeFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
