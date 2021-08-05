import {Button, CheckBox, Icon, Input} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './style';

type SwitchLineTaskBackPropsType = {
    action: Function;
    setInState: Function;
};

const SwitchLineTaskBack = ({
    action,
    setInState,
}: SwitchLineTaskBackPropsType) => {
    const [text, setText] = useState('');
    const [important, setImportant] = useState(false);

    const enterTask = () => {
        action(text, important ? 2 : 1);
        setInState(true);
    };

    return (
        <View style={styles.content}>
            <CheckBox
                checked={important}
                onChange={checked => {
                    setImportant(checked);
                }}
                status="danger"
                style={styles.checkBox}
            />
            <Input
                onChangeText={setText}
                value={text}
                style={styles.input}
                multiline={true}
                autoFocus
                placeholder="Введите задачу..."
                onSubmitEditing={enterTask}
            />
            <Button
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

export default SwitchLineTaskBack;
