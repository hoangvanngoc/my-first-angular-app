import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class TodoComponent {
  protected readonly todoService = inject(TodoService);
  protected newTodoTitle = '';

  addTodo(): void {
    this.todoService.addTodo(this.newTodoTitle);
    this.newTodoTitle = '';
  }
}
