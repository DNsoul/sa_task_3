import {action, computed, makeObservable, observable} from 'mobx';

export type TaskType = {
    id: string;
    checked: boolean;
    important: boolean;
    text: string;
    time: string;
};

class TodoStore {
    tasks: TaskType[] = [];

    constructor() {
        makeObservable(this, {
            tasks: observable,
            getTasks: computed,
            loadTasks: action.bound,
            addTask: action.bound,
            delTask: action.bound,
            toggleTask: action.bound,
        });
        this.tasks = [];
    }

    loadTasks(tasks: TaskType[]) {
        this.tasks = tasks;
    }

    get getTasks() {
        return this.tasks;
    }

    addTask(text: string, time: string, important: boolean) {
        const id = '_' + Math.random().toString(36).substr(2, 9);
        this.tasks.push({id, text, time, checked: false, important});
    }

    delTask(id: string) {
        const idx = this.tasks.findIndex(t => t.id === id);
        this.tasks.splice(idx, 1);
    }

    toggleTask(idx: number) {
        this.tasks[idx] = {
            ...this.tasks[idx],
            checked: !this.tasks[idx].checked,
        };
    }

    clearTask() {
        this.tasks = [];
    }
}
const Todo = new TodoStore();

export default Todo;
