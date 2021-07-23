import {Button, Icon, Input} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ListTodo from '../../stores/ListTodoStore';

const AddTodoBack = ({setInState}: any) => {
    const {addTodo} = ListTodo;

    const [text, setText] = useState('');

    const enterTask = () => {
        addTodo(text);
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

export default AddTodoBack;

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
    input: {
        width: '80%',
    },
});
