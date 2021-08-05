import {useNavigation} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {Todo} from '../../stores/todo';
import ToggleLine from '../toggle-line';
import styles from './style';

type TodoItemPropsType = {todo: Todo; delTodo: Function};

const TodoItem = ({todo, delTodo}: TodoItemPropsType) => {
    const nav = useNavigation();

    return (
        <ToggleLine
            onPress={() => {
                nav.navigate('Todo', {id: todo.list_id, title: todo.name});
            }}
            text={'Удалить?'}
            onAccept={() => delTodo(todo.list_id)}>
            <View
                style={[
                    styles.content,
                    todo.getIsDone
                        ? styles.completeTodo
                        : todo.getTaskCount
                        ? styles.incompleteTodo
                        : styles.emptyTodo,
                ]}>
                <Text>{todo.name}</Text>
                <Text>
                    {todo.getCompliteCount}/{todo.getTaskCount}
                </Text>
            </View>
        </ToggleLine>
    );
};

export default TodoItem;
