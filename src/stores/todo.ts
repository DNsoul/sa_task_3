import {makeAutoObservable, runInAction} from 'mobx';
import API from '../services/apiService';

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

    constructor(
        list_id: string,
        name: string,
        tasks: TaskType[],
        refr: Function,
    ) {
        this.list_id = list_id;
        this.name = name;
        this.refr = refr;
        this.tasks = tasks;
        makeAutoObservable(this);
    }

    get getTasks() {
        return this.tasks;
    }

    addTask = async (name: string, urgency: number) => {
        let id =
            (await API.taskCreate(name, this.list_id, urgency)) ??
            '-' + Math.random().toString(36).substr(2, 9);

        const time = new Date().toISOString();
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
        this.refr();
    };

    delTask = async (id: string) => {
        await API.taskDelete(id);

        console.log(id);

        runInAction(() => {
            const idx = this.tasks.findIndex(t => t.id === id);
            this.tasks.splice(idx, 1);
        });
        this.refr();
    };

    toggleTask = async (id: string) => {
        //await API.taskPutItems(id, true);

        runInAction(() => {
            this.tasks = this.tasks.map(t =>
                t.id === id ? {...t, is_completed: !t.is_completed} : t,
            );
        });
        this.refr();
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
        return (
            this.getTaskCount === 0 || this.getCompliteCount < this.getTaskCount
        );
    }
}
