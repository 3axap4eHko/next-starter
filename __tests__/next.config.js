import config from '../next.config';

describe('Test next config', () => {
  it('Should have publicRuntimeConfig', () => {
    expect(config).toHaveProperty('publicRuntimeConfig');
  })
});
