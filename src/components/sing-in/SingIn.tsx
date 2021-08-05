import {Button, Input, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './style';
import {View} from 'react-native';

type SingInPropsType = {onSend: Function};

const SingIn = ({onSend}: SingInPropsType) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.content}>
            <Input
                style={styles.input}
                onChangeText={setEmail}
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
                secureTextEntry={true}
                label={() => (
                    <Text category="s2" style={styles.label}>
                        Пароль
                    </Text>
                )}
            />
            <Button
                style={styles.button}
                onPress={() => onSend(email, password)}>
                Войти
            </Button>
        </View>
    );
};

export default SingIn;
