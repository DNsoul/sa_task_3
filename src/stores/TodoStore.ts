import {action, computed, makeObservable, observable} from 'mobx';

export type TaskType = {
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
        this.tasks.push({text, time, checked: false, important});
    }

    delTask(id: number) {
        this.tasks.splice(id, 1);
    }

    toggleTask(id: number) {
        this.tasks[id] = {...this.tasks[id], checked: !this.tasks[id].checked};
    }

    clearTask() {
        this.tasks = [];
    }
}
const Todo = new TodoStore();

export default Todo;
