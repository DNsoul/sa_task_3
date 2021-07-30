class ApiService {
    url = 'https://academy2.smw.tom.ru/legotin-alexander/api2/';

    acs = '$2y$10$np/eF6JYoCBgaM.Tat2ES.ifxHYEhXej7VyAGXV5mPij8dKCcL7PC';
    reft = '$2y$10$WO.YyC9lK5mcILbybtnbAOkaM2nexEpfIKk/PYwdeVRtsWCVWYExO';

    sendRequest = async (path: string, data: object = {}, method: string) => {
        const response = await fetch(this.url + path, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.acs,
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
                refresh_token: this.reft,
            },
            'post',
        );
    };

    taskCreate = (data: {
        name: string;
        is_completed: boolean;
        list_id: string;
        urgency: number;
    }) => {
        return this.sendRequest('task/create', data, 'post');
    };

    taskGetItems = () => {
        return this.sendRequest('task/get-items', {}, 'get');
    };

    taskDelete = (id: string) => {
        return this.sendRequest('task/delete/' + id, {}, 'delete');
    };

    listGetItems = () => {
        return this.sendRequest('list/get-items', {}, 'get');
    };

    listCreate = (data: {
        name: string;
        is_closed: boolean;
        is_completed: boolean;
        count_tasks: number;
    }) => {
        console.log(data);
        return this.sendRequest('list/create', data, 'post');
    };

    listDelete = (id: string) => {
        return this.sendRequest('list/delete/' + id, {}, 'delete');
    };
}

const API = new ApiService();

export default API;
