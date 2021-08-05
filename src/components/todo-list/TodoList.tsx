import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Todo} from '../../stores/todo';
import TodoItem from '../todo-item';

type TodoListPropsType = {
    todos: Todo[];
    filter: number;
    delTodo: Function;
};

const TodoList = ({todos, filter, delTodo}: TodoListPropsType) => {
    const setFilter = () => {
        switch (filter) {
            case 0:
                return todos.filter(t => t.getIsNotDone);
            case 1:
                return todos.filter(t => t.getIsDone);
            case 2:
                return todos;
            default:
                return todos;
        }
    };

    const setSort = (a: Todo, b: Todo) =>
        a.name === b.name ? 0 : a.name < b.name ? -1 : 1;

    return (
        <FlatList
            data={setFilter().sort(setSort)}
            renderItem={({item}: {item: Todo}) => (
                <TodoItem todo={item} key={item.list_id} delTodo={delTodo} />
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default TodoList;
