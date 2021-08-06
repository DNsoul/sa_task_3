import {Button, Input, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './style';
import {View} from 'react-native';

type RegistrationPropsType = {onSend: Function};

const Registration = ({onSend}: RegistrationPropsType) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.content}>
            <Input
                style={styles.input}
                onChangeText={setName}
                keyboardType={'default'}
                value={name}
                label={() => (
                    <Text category="s2" style={styles.label}>
                        Имя
                    </Text>
                )}
            />
            <Input
                style={styles.input}
                onChangeText={setEmail}
                keyboardType={'email-address'}
                value={email}
                label={() => (
                    <Text category="s2" style={styles.label}>
                        Почта
                    </Text>
                )}
            />
            <Input
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                keyboardType={'default'}
                secureTextEntry={true}
                label={() => (
                    <Text category="s2" style={styles.label}>
                        Пароль
                    </Text>
                )}
            />
            <Button
                style={styles.button}
                onPress={() => onSend(name, email, password)}>
                Регистрация
            </Button>
        </View>
    );
};

export default Registration;
