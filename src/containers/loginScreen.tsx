import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useState} from 'react';
import {Image, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {LOGO} from '../image/intex';

const LoginScreen = () => {
    const [typeForm, setTypeForm] = useState(true);

    return (
        <Layout style={styles.layout}>
            <Image resizeMode="contain" style={styles.image} source={LOGO} />
            <View style={styles.content}>
                <Input
                    style={styles.input}
                    label={() => (
                        <Text category="s2" style={{fontWeight: 'bold'}}>
                            Логин
                        </Text>
                    )}
                />
                <Input
                    style={styles.input}
                    secureTextEntry={true}
                    label={() => (
                        <Text category="s2" style={{fontWeight: 'bold'}}>
                            Пароль
                        </Text>
                    )}
                />
                <Button style={styles.button}>
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
