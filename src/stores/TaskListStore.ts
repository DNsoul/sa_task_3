import {action, computed, makeAutoObservable, observable} from 'mobx';

export type TaskType = {
    checked: boolean;
    important: boolean;
    text: string;
    time: string;
};

class TaskList {
    tasks: TaskType[];

    constructor() {
        makeAutoObservable(this, {
            tasks: observable.deep,
            getTasks: computed,
            loadTasks: action.bound,
            addTask: action.bound,
            delTask: action.bound,
            toggleTask: action.bound,
        });
        this.tasks = [];
    }

    loadTasks() {
        this.tasks = [
            {text: 'Задание 1', time: '12.25', checked: false, important: true},
            {text: 'Задание 2', time: '12.25', checked: true, important: true},
            {
                text: 'Задание 3',
                time: '12.25',
                checked: false,
                important: false,
            },
            {text: 'Задание 4', time: '12.25', checked: true, important: false},
            {text: 'Задание 5', time: '12.25', checked: true, important: true},
            {
                text: 'Задание 6',
                time: '12.25',
                checked: false,
                important: false,
            },
        ];
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
const Todo = new TaskList();

export default Todo;
