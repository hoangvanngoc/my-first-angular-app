import { routes } from './app.routes';
import { TodoComponent } from './todo/todo';

describe('App Routes', () => {
  it('should have routes defined', () => {
    expect(routes).toBeDefined();
    expect(routes.length).toBeGreaterThan(0);
  });

  it('should have a default route pointing to TodoComponent', () => {
    const defaultRoute = routes.find((r) => r.path === '');
    expect(defaultRoute).toBeDefined();
    expect(defaultRoute!.component).toBe(TodoComponent);
  });
});
