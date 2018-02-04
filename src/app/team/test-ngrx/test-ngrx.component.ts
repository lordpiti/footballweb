import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'app-test-ngrx',
  templateUrl: './test-ngrx.component.html',
  styleUrls: ['./test-ngrx.component.scss']
})
export class TestNgrxComponent implements OnInit {

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {}

  public ngOnInit(){

  }

  public addTodo(): void {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  public toggleTodoComplete({ id }): void {
    this.todoDataService.toggleTodoComplete(id);
  }
  public removeTodo({ id }): void {
    this.todoDataService.deleteTodoById(id);
  }

  public allTodos(): number {
    return this.incompleteTodos.length + this.completeTodos.length;
  }
  public get incompleteTodos(): Array<Todo> {
    return this.todoDataService.getIncompleteTodos();
  }

  public get completeTodos(): Array<Todo> {
    return this.todoDataService.getCompleteTodos();
  }

}
