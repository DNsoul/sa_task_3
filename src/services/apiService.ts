import AsyncStorage from '@react-native-async-storage/async-storage';

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
                'Content-Type':
                    method === 'put'
                        ? 'x-www-form-urlencoded'
                        : 'application/json',
                Authorization: 'Bearer ' + this.token.acs,
            },
            method: method,
            body: method === 'get' ? undefined : JSON.stringify(data),
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

    taskCreate = async (name: string, list_id: string, urgency: number) => {
        let data = {
            attributes: {
                name,
                is_completed: false,
                list_id,
                urgency,
            },
        };

        return await this.sendRequest('task/create', data, 'post')
            .then(d => {
                return d.data.attributes.id;
            })
            .catch(() => {
                return null;
            });
    };

    taskPutItems = (id: string, is_completed: boolean) => {
        return this.sendRequest('task/update/' + id, {is_completed}, 'put')
            .then(d => {
                return true;
            })
            .catch(e => {
                console.log(e);
                return false;
            });
    };

    taskGetItems = () => {
        return this.sendRequest('task/', {}, 'get')
            .then(d => {
                return d.data.items.map(t => ({
                    id: t.id,
                    list_id: t.list_id,
                    name: t.name,
                    is_completed: t.is_completed,
                    urgency: t.urgency,
                    time: t.created_at,
                }));
            })
            .catch(e => {
                console.log(e);
            });
    };

    taskDelete = (id: string) => {
        return this.sendRequest('task/delete/' + id, {}, 'delete')
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    };

    listGetItems = async () => {
        let tasks = await this.taskGetItems();

        return await this.sendRequest('list/get-items', {}, 'get')
            .then(d => {
                let items = d.data.items;
                items = items.map(i => ({
                    list_id: i.id,
                    name: i.name,
                    tasks: tasks.filter(t => t.list_id === i.id),
                }));
                return items;
            })
            .catch(e => {
                console.log(e);
                throw 'error';
            });
    };

    listCreate = async (name: string) => {
        const data = {
            attributes: {name, is_closed: false, is_completed: false},
        };

        return await this.sendRequest('list/create', data, 'post')
            .then(d => {
                return d.data.attributes.id;
            })
            .catch(() => {
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
