import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo';
import { TodoService } from './todo.service';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let service: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toBe('Todo List');
  });

  it('should show empty state when no todos', () => {
    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
    expect(emptyState.textContent).toContain('No todos yet');
  });

  it('should add a todo via the form', async () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.todo-input');
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');

    input.value = 'New task';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.todo-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('New task');
  });

  it('should toggle a todo when checkbox is clicked', async () => {
    service.addTodo('Test task');
    fixture.detectChanges();

    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.click();
    fixture.detectChanges();

    const li = fixture.nativeElement.querySelector('.todo-list li');
    expect(li.classList.contains('completed')).toBe(true);
  });

  it('should remove a todo when remove button is clicked', () => {
    service.addTodo('Task to remove');
    fixture.detectChanges();

    const removeBtn: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-remove');
    removeBtn.click();
    fixture.detectChanges();

    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
  });

  it('should display remaining and completed counts', () => {
    service.addTodo('One');
    service.addTodo('Two');
    service.toggleTodo(service.allTodos()[0].id);
    fixture.detectChanges();

    const footer = fixture.nativeElement.querySelector('.todo-footer');
    expect(footer.textContent).toContain('1 remaining');
    expect(footer.textContent).toContain('1 completed');
  });

  it('should show clear completed button when there are completed todos', () => {
    service.addTodo('Done task');
    service.toggleTodo(service.allTodos()[0].id);
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.btn-clear');
    expect(clearBtn).toBeTruthy();
    expect(clearBtn.textContent).toContain('Clear completed');
  });

  it('should clear completed todos', () => {
    service.addTodo('Keep');
    service.addTodo('Remove');
    service.toggleTodo(service.allTodos()[1].id);
    fixture.detectChanges();

    const clearBtn: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-clear');
    clearBtn.click();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.todo-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Keep');
  });

  it('should not add a todo when submitting empty input', async () => {
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
  });

  it('should reset input after adding a todo', async () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.todo-input');
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');

    input.value = 'New task';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('');
  });

  it('should not show footer when there are no todos', () => {
    const footer = fixture.nativeElement.querySelector('.todo-footer');
    expect(footer).toBeFalsy();
  });

  it('should not show clear completed button when no todos are completed', () => {
    service.addTodo('Incomplete task');
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.btn-clear');
    expect(clearBtn).toBeFalsy();
  });

  it('should show footer when todos exist', () => {
    service.addTodo('A task');
    fixture.detectChanges();

    const footer = fixture.nativeElement.querySelector('.todo-footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent).toContain('1 remaining');
    expect(footer.textContent).toContain('0 completed');
  });

  it('should update todo item styling when toggled back to incomplete', () => {
    service.addTodo('Toggle test');
    fixture.detectChanges();

    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.click();
    fixture.detectChanges();

    const li = fixture.nativeElement.querySelector('.todo-list li');
    expect(li.classList.contains('completed')).toBe(true);

    checkbox.click();
    fixture.detectChanges();
    expect(li.classList.contains('completed')).toBe(false);
  });

  it('should render multiple todos in order', () => {
    service.addTodo('First');
    service.addTodo('Second');
    service.addTodo('Third');
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.todo-title');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('First');
    expect(items[1].textContent).toContain('Second');
    expect(items[2].textContent).toContain('Third');
  });
});
