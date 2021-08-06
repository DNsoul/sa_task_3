import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useState} from 'react';
import {Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import SingIn from '../../components/sing-in';
import API from '../../services/apiService';
import SingOut from '../../components/sing-out';
import Registration from '../../components/registration';
import {useEffect} from 'react';
import styles from './style';
import todoList from '../../stores/todoList';
import {LOGO} from '../../assets/logo';

const LoginScreen = () => {
    const [typeForm, setTypeForm] = useState(true);
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (login) {
            todoList.load();
        }
    }, [login]);

    useEffect(() => {
        setLogin(!!API.token.acs);
    }, []);

    const onLogin = (email: string, password: string) => {
        console.log('login', email, password);
        API.userLogin({email, password})
            .then(r => {
                console.log(r);
                API.token = {
                    acs: r.data.access_token,
                    ref: r.data.refresh_token,
                };
                setLogin(!!API.token.acs);
                setError(false);
            })
            .catch(e => {
                console.log(e);
                setError(true);
            });
    };

    const onReg = (name: string, email: string, password: string) => {
        console.log('register', name, email, password);
        API.userRegister({name, email, password})
            .then(r => {
                console.log(r);
                setError(false);
            })
            .catch(e => {
                console.log(e);
                setError(true);
            });
    };

    const onExit = () => {
        API.token = {
            acs: '',
            ref: '',
        };
        setLogin(!!API.token.acs);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Layout style={styles.layout}>
                <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={LOGO}
                />
                <Text style={styles.error}>
                    {error ? 'Неверные данные' : ''}
                </Text>
                {login ? (
                    <SingOut onSend={onExit} />
                ) : typeForm ? (
                    <SingIn onSend={onLogin} />
                ) : (
                    <Registration onSend={onReg} />
                )}
                <Text
                    onPress={() => setTypeForm(prev => !prev)}
                    style={styles.link}>
                    {login
                        ? 'Вы вошли!'
                        : typeForm
                        ? 'Нет акаунта? Зарегистироваться!'
                        : 'Уже есть акаунт? Войти!'}
                </Text>
            </Layout>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;
