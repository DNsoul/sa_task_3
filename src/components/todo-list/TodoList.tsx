import {observer} from 'mobx-react';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import ListTodo, {TodoType} from '../../stores/ListTodoStore';
import TodoItem from '../todo-item';

const TodoList = observer(() => {
    const {getTodos, filterType} = ListTodo;

    const checkComplite = (todo: TodoType) => {
        if (todo.tasks.length === 0) {
            return false;
        }
        return todo.tasks.filter(t => t.checked).length === todo.tasks.length;
    };

    const setFilter = (f: number) => {
        switch (f) {
            case 0:
                return getTodos.filter(t => !checkComplite(t));
            case 1:
                return getTodos.filter(t => checkComplite(t));
            case 2:
                return getTodos.filter(t => t.tasks.length !== undefined);
            default:
                return getTodos.slice();
        }
    };

    const setSort = (a: TodoType, b: TodoType) =>
        a.name === b.name ? 0 : a.name < b.name ? -1 : 1;

    return (
        <FlatList
            data={setFilter(filterType.row).sort(setSort)}
            renderItem={({item}: {item: TodoType}) => (
                <TodoItem todo={item} key={item.id} />
            )}
        />
    );
});

export default TodoList;
