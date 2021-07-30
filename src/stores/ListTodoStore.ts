import {action, makeObservable, observable, computed} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TaskType} from './TodoStore';
import {IndexPath} from '@ui-kitten/components';

import API from '../services/apiService';

export type TodoType = {
    id: string;
    name: string;
    tasks: TaskType[];
};

class ListTodoStore {
    todos: TodoType[] = [];
    filterType: IndexPath = new IndexPath(0);
    isLoad: boolean = true;

    constructor() {
        makeObservable(this, {
            todos: observable.deep,
            filterType: observable.deep,
            isLoad: observable,
            addTodo: action.bound,
            delTodo: action.bound,
            setFilter: action.bound,
            getTodos: computed,
            getType: computed,
            getTodosById: action.bound,
            loadData: action.bound,
            saveLocal: action.bound,
            loadCloud: action.bound,
            loadLocal: action.bound,
        });
        this.todos = [];
        this.filterType = new IndexPath(0);
        this.isLoad = true;
    }

    addTodo(name: string) {
        API.listCreate({
            name,
            is_closed: false,
            is_completed: false,
            count_tasks: 0,
        })
            .then(action('success', d => console.log(d)))
            .catch(
                action('error', (e: Error) => {
                    const id = '-' + Math.random().toString().substr(2, 9);
                    console.log(e.message.slice(-3));
                    this.todos.push({id, name, tasks: []});
                }),
            );
    }

    delTodo(id: string) {
        API.listDelete(id)
            .then(action('success', d => console.log(d)))
            .catch(
                action('error', (e: Error) => {
                    console.log(e.message.slice(-3));
                    this.todos = this.todos.filter(t => t.id !== id);
                }),
            );
    }

    get getTodos() {
        console.log(this.todos);
        return this.todos;
    }

    get getIsLoad() {
        return this.isLoad;
    }

    get getType() {
        return this.filterType;
    }

    getTodosById(id: string) {
        return this.todos.find(t => t.id === id);
    }

    setFilter(id: IndexPath) {
        this.filterType = id;
    }

    loadData(todos: TodoType[]) {
        this.todos = todos;
    }

    loadCloud() {
        API.listGetItems()
            .then(
                action('success', d => {
                    this.todos = d;
                }),
            )
            .catch(
                action('error', e => {
                    console.log(e);
                }),
            );
    }

    loadLocal() {
        AsyncStorage.getItem('@todos')
            .then(
                action('success', d => {
                    this.todos = JSON.parse(d ?? '[]');
                    this.filterType = new IndexPath(0);
                    this.isLoad = false;
                }),
            )
            .catch(
                action('error', err => {
                    throw err;
                }),
            );
    }

    saveLocal() {
        AsyncStorage.setItem('@todos', JSON.stringify(this.todos));
    }
}
const ListTodo = new ListTodoStore();

export default ListTodo;
