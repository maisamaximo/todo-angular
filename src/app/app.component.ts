import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { TodoModule } from "../models/todo.module";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public mode: string = "lista";
  public title = "Minhas Tarefas";
  public todos: TodoModule[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
    });
    this.load();
  }

  alteraTexto() {
    this.title = "Test";
  }

  remove(todo: TodoModule) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: TodoModule) {
    todo.done = true;
    this.save();
  }

  markAsUnDone(todo: TodoModule) {
    todo.done = false;
    this.save();
  }

  adicionar() {
    const title = this.form.controls["title"].value;
    const id = this.todos.length + 1;
    this.todos.push(new TodoModule(title, false, id));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem("todos", data);
    this.mode = 'lista';
  }

  load() {
    const data = localStorage.getItem("todos");
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
