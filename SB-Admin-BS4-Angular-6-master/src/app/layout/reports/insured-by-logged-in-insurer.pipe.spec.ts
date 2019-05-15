import { InsuredByLoggedInInsurerPipe } from './insured-by-logged-in-insurer.pipe';

describe('InsuredByLoggedInInsurerPipe', () => {
  it('create an instance', () => {
    const pipe = new InsuredByLoggedInInsurerPipe();
    expect(pipe).toBeTruthy();
  });
});
