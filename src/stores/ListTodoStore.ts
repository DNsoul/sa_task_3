import {action, makeObservable, observable, computed} from 'mobx';
import {TaskType} from './TodoStore';

class ListTodoStore {
    todos: {name: string; tasks: TaskType[]}[] = [];

    constructor() {
        makeObservable(this, {
            todos: observable.deep,
            addTodo: action.bound,
            delTodo: action.bound,
            getTodos: computed,
        });
        this.todos = [];
    }

    addTodo(name: string) {
        this.todos.push({name, tasks: []});
    }

    delTodo(id: number) {
        this.todos.splice(id, 1);
    }

    get getTodos() {
        return this.todos;
    }
}
const ListTodo = new ListTodoStore();

export default ListTodo;
