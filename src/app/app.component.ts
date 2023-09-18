import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: string = 'Minhas Tarefas';

  public form!: FormGroup;

  public mode: String = 'list';

  constructor(private fb: FormBuilder){

    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
  }

  changeMode(mode: String) {
    this.mode = mode;
  }

  add(){
    //this.form.value => { title: titulo }
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  //remove um todo da lista
  remove(todo: Todo){
    //capturando o index do todo
    const index = this.todos.indexOf(todo);

    //se for igual a -1 significa que não achou o todo na lista se for diferente vamos removê-lo
    if(index !== -1){
      this.todos.splice(index, 1);
    }

    this.save();
  }

  //marca o todo como feito
  markAsDone(todo: Todo){
    todo.done = true;

    this.save();
  }

  //todo não finalizado
  markAsUndone(todo: Todo){
    todo.done = false;

    this.save();
  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load(){
    this.todos = JSON.parse(localStorage.getItem('todos') || '{}');
  }

}
