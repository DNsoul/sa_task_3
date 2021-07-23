import {Button, CheckBox, Icon, Input} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Todo from '../../stores/TodoStore';

const AddTaskBack = ({setInState}: any) => {
    const {addTask} = Todo;

    const [text, setText] = useState('');
    const [important, setImportant] = useState(false);

    const enterTask = () => {
        let today = new Date();

        addTask(
            text,
            today.toTimeString().slice(0, 5) +
                ' ' +
                today.toISOString().slice(5, 10),
            important,
        );
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

export default AddTaskBack;

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 'auto',
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 15,
    },
    buttonLine: {
        height: 50,
        width: '100%',
    },
    checkBox: {
        width: '10%',
    },
    input: {
        width: '80%',
    },
});
