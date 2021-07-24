import {
    action,
    makeObservable,
    observable,
    computed,
    flow,
    runInAction,
} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TaskType} from './TodoStore';

export type TodoType = {id: string; name: string; tasks: TaskType[]};

class ListTodoStore {
    todos: TodoType[] = [];
    filterType: number = 0;
    isLoad: boolean = true;

    constructor() {
        makeObservable(this, {
            todos: observable.deep,
            filterType: observable,
            isLoad: observable,
            addTodo: action.bound,
            delTodo: action.bound,
            setFilter: action.bound,
            getTodos: computed,
            getTodosById: action.bound,
            loadData: action.bound,
            loadDataAsync: flow.bound,
            saveData: flow.bound,
        });
        this.todos = [];
        this.filterType = 0;
        this.isLoad = true;
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

    get getIsLoad() {
        return this.isLoad;
    }

    getTodosById(id: string) {
        return this.todos.find(t => t.id === id);
    }

    setFilter(id: number) {
        this.filterType = id;
    }

    loadData(todos: TodoType[]) {
        this.todos = todos;
    }

    async loadDataAsync() {
        AsyncStorage.getItem('@todos')
            .then(d => {
                runInAction(() => {
                    this.todos = JSON.parse(d ?? '[]');
                    this.filterType = 1;
                    this.isLoad = false;
                });
            })
            .catch(err => {
                throw err;
            });
    }

    async saveData() {
        AsyncStorage.setItem('@todos', JSON.stringify(this.todos));
    }
}
const ListTodo = new ListTodoStore();

export default ListTodo;
