import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useState} from 'react';
import {Image} from 'react-native';
import {StyleSheet} from 'react-native';
import SingIn from '../components/sing-in';
import {LOGO} from '../image';
import API from '../services/apiService';
import SingOut from '../components/sing-out';
import Registration from '../components/registration';
import {useEffect} from 'react';

const LoginScreen = () => {
    const [typeForm, setTypeForm] = useState(true);
    const [login, setLogin] = useState(false);

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
            })
            .catch(e => console.log(e));
    };

    const onReg = (name: string, email: string, password: string) => {
        console.log('register', name, email, password);
        API.userRegister({name, email, password})
            .then(r => {
                console.log(r);
            })
            .catch(e => console.log(e));
    };

    const onExit = () => {
        API.token = {
            acs: '',
            ref: '',
        };
        setLogin(!!API.token.acs);
    };

    return (
        <Layout style={styles.layout} level="2">
            <Image resizeMode="contain" style={styles.image} source={LOGO} />
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
                {typeForm
                    ? 'Нет акаунта? Зарегистироваться!'
                    : 'Уже есть акаунт? Войти!'}
            </Text>
            {login ? <Text>Вы уже вошли</Text> : <Text>Вы не вошли</Text>}
        </Layout>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingTop: 100,
        alignItems: 'center',
        backgroundColor: '#625772',
    },
    image: {
        width: 200,
        height: 200,
    },
    button: {
        width: '100%',
        marginBottom: 10,
    },
    input: {
        marginBottom: 10,
    },
    link: {
        color: 'white',
    },
});

export default LoginScreen;
