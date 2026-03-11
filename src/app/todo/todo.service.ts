import { Injectable, signal, computed } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos = signal<Todo[]>([]);
  private nextId = 1;

  readonly allTodos = this.todos.asReadonly();
  readonly completedCount = computed(() => this.todos().filter((t) => t.completed).length);
  readonly remainingCount = computed(() => this.todos().filter((t) => !t.completed).length);

  addTodo(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    this.todos.update((todos) => [...todos, { id: this.nextId++, title: trimmed, completed: false }]);
  }

  toggleTodo(id: number): void {
    this.todos.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  removeTodo(id: number): void {
    this.todos.update((todos) => todos.filter((t) => t.id !== id));
  }

  clearCompleted(): void {
    this.todos.update((todos) => todos.filter((t) => !t.completed));
  }
}
