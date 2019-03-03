import { IsAuthenticatedWithRolesDirective } from './is-authenticated-with-roles.directive';

describe('IsAuthenticatedWithRolesDirective', () => {
  it('should create an instance', () => {
    const directive = new IsAuthenticatedWithRolesDirective(null, null, null);
    expect(directive).toBeTruthy();
  });
});
