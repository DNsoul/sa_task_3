import {action, makeObservable, observable, computed} from 'mobx';
import {TaskType} from './TodoStore';

export type TodoType = {id: string; name: string; tasks: TaskType[]};

class ListTodoStore {
    todos: TodoType[] = [];
    filterType: number = 0;

    constructor() {
        makeObservable(this, {
            todos: observable.deep,
            filterType: observable,
            addTodo: action.bound,
            delTodo: action.bound,
            setFilter: action.bound,
            getTodos: computed,
            getTodosById: action.bound,
        });
        this.todos = [];
        this.filterType = 0;
    }

    addTodo(name: string) {
        const id = '_' + Math.random().toString(36).substr(2, 9);
        this.todos.push({id, name, tasks: []});
    }

    delTodo(id: string) {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    get getTodos() {
        return this.todos;
    }

    getTodosById(id: string) {
        return this.todos.find(t => t.id === id);
    }

    setFilter(id: number) {
        this.filterType = id;
    }
}
const ListTodo = new ListTodoStore();

export default ListTodo;
