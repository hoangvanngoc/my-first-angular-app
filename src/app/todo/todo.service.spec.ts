import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should start with an empty list', () => {
    expect(service.allTodos()).toEqual([]);
    expect(service.completedCount()).toBe(0);
    expect(service.remainingCount()).toBe(0);
  });

  it('should add a todo', () => {
    service.addTodo('Buy milk');
    expect(service.allTodos().length).toBe(1);
    expect(service.allTodos()[0].title).toBe('Buy milk');
    expect(service.allTodos()[0].completed).toBe(false);
  });

  it('should not add empty or whitespace-only todos', () => {
    service.addTodo('');
    service.addTodo('   ');
    expect(service.allTodos().length).toBe(0);
  });

  it('should trim whitespace from todo titles', () => {
    service.addTodo('  Buy milk  ');
    expect(service.allTodos()[0].title).toBe('Buy milk');
  });

  it('should assign unique ids', () => {
    service.addTodo('First');
    service.addTodo('Second');
    const ids = service.allTodos().map((t) => t.id);
    expect(new Set(ids).size).toBe(2);
  });

  it('should toggle a todo', () => {
    service.addTodo('Test');
    const id = service.allTodos()[0].id;

    service.toggleTodo(id);
    expect(service.allTodos()[0].completed).toBe(true);

    service.toggleTodo(id);
    expect(service.allTodos()[0].completed).toBe(false);
  });

  it('should remove a todo', () => {
    service.addTodo('First');
    service.addTodo('Second');
    const id = service.allTodos()[0].id;

    service.removeTodo(id);
    expect(service.allTodos().length).toBe(1);
    expect(service.allTodos()[0].title).toBe('Second');
  });

  it('should compute completed and remaining counts', () => {
    service.addTodo('One');
    service.addTodo('Two');
    service.addTodo('Three');

    service.toggleTodo(service.allTodos()[0].id);
    service.toggleTodo(service.allTodos()[2].id);

    expect(service.completedCount()).toBe(2);
    expect(service.remainingCount()).toBe(1);
  });

  it('should clear completed todos', () => {
    service.addTodo('One');
    service.addTodo('Two');
    service.addTodo('Three');

    service.toggleTodo(service.allTodos()[0].id);
    service.toggleTodo(service.allTodos()[2].id);

    service.clearCompleted();
    expect(service.allTodos().length).toBe(1);
    expect(service.allTodos()[0].title).toBe('Two');
  });

  it('should not throw when toggling a non-existent id', () => {
    service.addTodo('Existing');
    service.toggleTodo(9999);
    expect(service.allTodos().length).toBe(1);
    expect(service.allTodos()[0].completed).toBe(false);
  });

  it('should not throw when removing a non-existent id', () => {
    service.addTodo('Existing');
    service.removeTodo(9999);
    expect(service.allTodos().length).toBe(1);
  });

  it('should not change list when clearCompleted is called with no completed todos', () => {
    service.addTodo('One');
    service.addTodo('Two');
    service.clearCompleted();
    expect(service.allTodos().length).toBe(2);
  });

  it('should preserve insertion order', () => {
    service.addTodo('First');
    service.addTodo('Second');
    service.addTodo('Third');
    const titles = service.allTodos().map((t) => t.title);
    expect(titles).toEqual(['First', 'Second', 'Third']);
  });

  it('should handle adding todos with special characters', () => {
    service.addTodo('<script>alert("xss")</script>');
    expect(service.allTodos()[0].title).toBe('<script>alert("xss")</script>');
  });

  it('should update counts correctly after removing a completed todo', () => {
    service.addTodo('One');
    service.addTodo('Two');
    service.toggleTodo(service.allTodos()[0].id);

    expect(service.completedCount()).toBe(1);
    expect(service.remainingCount()).toBe(1);

    service.removeTodo(service.allTodos()[0].id);
    expect(service.completedCount()).toBe(0);
    expect(service.remainingCount()).toBe(1);
  });

  it('should clear all todos when all are completed', () => {
    service.addTodo('One');
    service.addTodo('Two');
    service.toggleTodo(service.allTodos()[0].id);
    service.toggleTodo(service.allTodos()[1].id);

    service.clearCompleted();
    expect(service.allTodos().length).toBe(0);
    expect(service.completedCount()).toBe(0);
    expect(service.remainingCount()).toBe(0);
  });
});
