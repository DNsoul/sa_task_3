import AsyncStorage from '@react-native-async-storage/async-storage';
import {Todo} from '../stores/todo';

class ApiService {
    url = 'https://academy2.smw.tom.ru/legotin-alexander/api2/';

    token = {
        acs: '',
        ref: '',
    };

    loadToken = async () => {
        await AsyncStorage.getItem('@token').then(d => {
            const data = JSON.parse(d ?? '');
            this.token = data;
        });
    };

    saveToken = () => {
        AsyncStorage.setItem('@token', JSON.stringify(this.token));
    };

    sendRequest = async (path: string, data: object = {}, method: string) => {
        const response = await fetch(this.url + path, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.token.acs,
            },
            method: method,
            body: method === 'post' ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
            throw new Error(
                `Ошибка выполения запроса. \n статус: ${response.status}`,
            );
        }
        return await response.json();
    };

    userGetList = () => {
        return this.sendRequest('user/', {}, 'get');
    };

    userRegister = (data: {name: string; email: string; password: string}) => {
        return this.sendRequest('user/register', data, 'post');
    };

    userLogin = (data: {email: string; password: string}) => {
        return this.sendRequest('user/login', data, 'post');
    };

    refreshToken = () => {
        return this.sendRequest(
            'user/refreshAccessToken',
            {
                refresh_token: this.token.ref,
            },
            'post',
        );
    };

    taskCreate = async (name: string, list_id: string, important: boolean) => {
        let data = {
            attributes: {
                name,
                is_completed: false,
                list_id,
                urgency: important ? 2 : 1,
            },
        };

        return await this.sendRequest('task/create', data, 'post')
            .then(d => {
                console.log(d);
                const res = d.data.attributes;
                return {
                    id: res.id,
                    checked: res.is_complete,
                    text: res.name,
                    time: res.created_at,
                    important: res.urgency > 1,
                };
            })
            .catch(e => {
                return null;
            });
    };

    taskGetItems = (id: string) => {
        return this.sendRequest('task/get-item/' + id, {}, 'get')
            .then(d => {
                console.log(d.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    taskDelete = (id: string) => {
        return this.sendRequest('task/delete/' + id, {}, 'delete');
    };

    listGetItems = async () => {
        return await this.sendRequest('list/get-items', {}, 'get')
            .then(d => {
                let items = d.data.items;
                items = items.map(i => ({id: i.id, name: i.name, tasks: []}));
                return items;
            })
            .catch(e => {
                console.log(e);
                return [];
            });
    };

    listCreate = async (name: string) => {
        const data = {
            attributes: {name, is_closed: false, is_completed: false},
        };

        return await this.sendRequest('list/create', data, 'post')
            .then(d => {
                const {id} = d.data.attributes;
                return {id, name, tasks: []};
            })
            .catch(e => {
                console.log(e);
                return null;
            });
    };

    listDelete = async (id: string) => {
        return await this.sendRequest('list/delete/' + id, {}, 'delete')
            .then(() => {
                return true;
            })
            .catch(e => {
                console.log(e);
                return false;
            });
    };
}

const API = new ApiService();

export default API;
