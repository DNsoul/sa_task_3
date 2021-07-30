import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {apiDefineProperty} from 'mobx/dist/internal';
import React from 'react';
import {useState} from 'react';
import {Image, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {LOGO} from '../image/intex';
import API from '../services/apiService';

const LoginScreen = () => {
    const [typeForm, setTypeForm] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSend = () => {
        if (typeForm) {
            console.log('login', email, password);
            API.userLogin({email, password})
                .then(r => {
                    console.log(r);
                    API.acs = r.data.access_token;
                    API.reft = r.data.refresh_token;
                })
                .catch(e => console.log(e));
        } else {
            console.log('register', name, email, password);
            API.userRegister({name, email, password})
                .then(r => {
                    console.log(r);
                })
                .catch(e => console.log(e));
        }
    };

    return (
        <Layout style={styles.layout}>
            <Image resizeMode="contain" style={styles.image} source={LOGO} />
            <View style={styles.content}>
                {typeForm ? (
                    <></>
                ) : (
                    <Input
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        label={() => (
                            <Text category="s2" style={{fontWeight: 'bold'}}>
                                Имя
                            </Text>
                        )}
                    />
                )}
                <Input
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    label={() => (
                        <Text category="s2" style={{fontWeight: 'bold'}}>
                            Почта
                        </Text>
                    )}
                />
                <Input
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    label={() => (
                        <Text category="s2" style={{fontWeight: 'bold'}}>
                            Пароль
                        </Text>
                    )}
                />
                <Button style={styles.button} onPress={() => onSend()}>
                    {!typeForm ? 'Зарегистироваться' : 'Войти'}
                </Button>
                <Text
                    onPress={() => setTypeForm(prev => !prev)}
                    style={styles.link}>
                    {typeForm ? 'Зарегистироваться?' : 'Войти'}
                </Text>
            </View>
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
    },
    image: {
        width: 200,
    },
    content: {
        paddingHorizontal: 25,
        width: '100%',
        marginBottom: '60%',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        marginBottom: 10,
    },
    input: {
        marginBottom: 10,
    },
    link: {
        color: 'grey',
    },
});

export default LoginScreen;
