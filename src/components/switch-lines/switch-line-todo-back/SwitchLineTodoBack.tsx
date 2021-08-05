import {Button, Icon, Input} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';

import styles from './style';

type SwitchLineTodoBackPropsType = {
    action: Function;
    setInState: Function;
};

const SwitchLineTodoBack = ({
    action,
    setInState,
}: SwitchLineTodoBackPropsType) => {
    const [text, setText] = useState('');

    const enterTask = () => {
        action(text);
        setInState(true);
    };

    return (
        <View style={styles.content}>
            <Input
                onChangeText={setText}
                style={styles.input}
                multiline={true}
                autoFocus
                placeholder="Введите задачу..."
                onSubmitEditing={enterTask}
                maxLength={30}
            />
            <Button
                style={styles.button}
                appearance="ghost"
                onPress={() => {
                    setInState(true);
                }}
                accessoryLeft={() => (
                    <Icon
                        style={styles.icon}
                        fill="#3366FF"
                        name="close-outline"
                    />
                )}
            />
        </View>
    );
};

export default SwitchLineTodoBack;
