import AsyncStorage from '@react-native-async-storage/async-storage';
import {action, makeAutoObservable, runInAction} from 'mobx';
import API from '../services/apiService';
import {Todo} from './todo';

export class TodoList {
    todos: Todo[] = [];
    filter: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    get getTodos() {
        return this.todos;
    }

    get getFilter() {
        return this.filter;
    }

    refr = () => {
        runInAction(() => {
            this.todos = this.todos.slice();
        });
    };

    addTodo = async (name: string) => {
        let id =
            (await API.listCreate(name)) ??
            '-' + Math.random().toString(36).substr(2, 9);

        const todo = new Todo(id, name, [], this.refr);

        runInAction(() => {
            this.todos.push(todo);
        });
    };

    delTodo = async (id: string) => {
        await API.listDelete(id);

        const idx = this.todos.findIndex(t => t.list_id === id);

        runInAction(() => {
            this.todos.splice(idx, 1);
        });
    };

    setFilter = (num: number) => {
        this.filter = num;
    };

    getTodoById = (list_id: string) => {
        return (
            this.todos.find(t => t.list_id === list_id) ??
            new Todo('', '', [], this.refr)
        );
    };

    clearTodo = () => {
        this.todos = [];
    };

    localLoad = () => {
        AsyncStorage.getItem('@todo')
            .then(
                action(tds => {
                    const todos = JSON.parse(tds ?? '[]');
                    this.todos = todos.map(
                        t => new Todo(t.list_id, t.name, t.tasks, this.refr),
                    );
                }),
            )
            .catch(e => {
                console.log(e);
            });
    };

    load = async () => {
        await API.listGetItems()
            .then(
                action(tds => {
                    this.todos = tds.map(
                        t => new Todo(t.list_id, t.name, t.tasks, this.refr),
                    );
                }),
            )
            .catch(e => {
                console.log('error', e);
                this.localLoad();
            });
    };

    save = async () => {
        AsyncStorage.setItem('@todo', JSON.stringify(this.todos));
    };
}

const todoList = new TodoList();

export default todoList;
