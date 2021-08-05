import AsyncStorage from '@react-native-async-storage/async-storage';
import {action, makeAutoObservable, runInAction} from 'mobx';

export type TaskType = {
    id: string;
    list_id: string;
    name: string;
    is_completed: boolean;
    urgency: number;
    time: string;
};

export class Todo {
    list_id: string = '0';
    name: string = '';
    tasks: TaskType[] = [];

    refr: Function = () => {};

    constructor(list_id: string, name: string, refr: Function) {
        this.list_id = list_id;
        this.name = name;
        this.refr = refr;
        makeAutoObservable(this);
    }

    get getTasks() {
        this.refr();
        return this.tasks;
    }

    addTask = async (name: string, urgency: number) => {
        const id = '-' + Math.random().toString(36).substr(2, 9);
        const time = new Date().toUTCString();
        const data = {
            id,
            list_id: this.list_id,
            name,
            is_completed: false,
            urgency,
            time,
        };

        runInAction(() => {
            this.tasks = [...this.tasks, data];
        });
    };

    delTask = (id: string) => {
        const idx = this.tasks.findIndex(t => t.id === id);
        this.tasks.splice(idx, 1);
    };

    toggleTask = (id: string) => {
        this.tasks = this.tasks.map(t =>
            t.id === id ? {...t, is_completed: !t.is_completed} : t,
        );
    };

    get getTaskCount() {
        return this.tasks.length;
    }

    get getCompliteCount() {
        return this.tasks.filter(t => t.is_completed).length;
    }

    get getIsDone() {
        return (
            this.getTaskCount !== 0 &&
            this.getTaskCount === this.getCompliteCount
        );
    }

    get getIsNotDone() {
        console.log(
            this.getTaskCount === 0 ||
                this.getCompliteCount < this.getTaskCount,
        );
        return (
            this.getTaskCount === 0 || this.getCompliteCount < this.getTaskCount
        );
    }

    load = async () => {
        AsyncStorage.getItem('@taskList')
            .then(
                action(tds => {
                    this.tasks = JSON.parse(tds ?? '[]');
                }),
            )
            .catch(e => {
                console.log(e);
            });
    };

    save = async () => {
        AsyncStorage.setItem('@taskList', JSON.stringify(this.tasks));
    };
}

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
        const id = '-' + Math.random().toString(36).substr(2, 9);

        const todo = new Todo(id, name, this.refr);

        runInAction(() => {
            this.todos.push(todo);
        });
    };

    delTodo = async (id: string) => {
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
            new Todo('', '', this.refr)
        );
    };

    clearTodo = () => {
        this.todos = [];
    };

    load = async () => {
        AsyncStorage.getItem('@todoList')
            .then(
                action(tds => {
                    this.todos = JSON.parse(tds ?? '[]');
                }),
            )
            .catch(e => {
                console.log(e);
            });
    };

    save = async () => {
        AsyncStorage.setItem('@todoList', JSON.stringify(this.todos));
    };
}

const todoList = new TodoList();

export {todoList};
