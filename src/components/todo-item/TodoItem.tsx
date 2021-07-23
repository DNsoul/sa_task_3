import {useNavigation} from '@react-navigation/native';
import {Button, Icon, Text} from '@ui-kitten/components';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ListTodo, {TodoType} from '../../stores/ListTodoStore';
import {TaskType} from '../../stores/TodoStore';

const TodoItem = ({todo}: {todo: TodoType}) => {
    const nav = useNavigation();

    const [delToggle, setDelToggle] = useState(false);

    const checkCount = (tasks: TaskType[]) => {
        return tasks.filter(t => t.checked).length;
    };

    return delToggle ? (
        <DelQuestion id={todo.id} setDelToggle={setDelToggle} />
    ) : (
        <TouchableOpacity
            activeOpacity={0.5}
            onLongPress={() => setDelToggle(true)}
            onPress={() => nav.navigate('Todo', {id: todo.id})}
            style={[
                styles.content,
                todo.tasks.length
                    ? todo.tasks.length === checkCount(todo.tasks)
                        ? styles.completeTodo
                        : styles.incompleteTodo
                    : styles.emptyTodo,
            ]}>
            <Text>{todo.name}</Text>
            <Text>
                {checkCount(todo.tasks)}/{todo.tasks.length}
            </Text>
        </TouchableOpacity>
    );
};

const DelQuestion = ({id, setDelToggle}: {id: string; setDelToggle: any}) => {
    const {delTodo} = ListTodo;

    return (
        <View style={[styles.content, styles.delContent]}>
            <Text>Удалить?</Text>
            <View style={styles.delButton}>
                <Button
                    size="small"
                    appearance="ghost"
                    onPress={() => {
                        delTodo(id);
                        setDelToggle(false);
                    }}
                    accessoryLeft={(props: any) => (
                        <Icon {...props} name="checkmark-outline" />
                    )}
                />
                <Button
                    size="small"
                    appearance="ghost"
                    onPress={() => setDelToggle(false)}
                    accessoryLeft={(props: any) => (
                        <Icon {...props} name="close-outline" />
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 0.1,
    },
    delContent: {
        height: 50,
        paddingHorizontal: 20,
    },
    delButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%',
    },
    emptyTodo: {
        backgroundColor: '#FCFDFE',
    },
    completeTodo: {
        backgroundColor: '#EDEFF4',
    },
    incompleteTodo: {
        backgroundColor: '#E7F9A6',
    },
});

export default TodoItem;