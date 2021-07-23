import {observer} from 'mobx-react';
import React from 'react';
import {ScrollView} from 'react-native';
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
            case 1:
                return getTodos.filter(t => !checkComplite(t));
            case 2:
                return getTodos.filter(t => checkComplite(t));
            default:
                return getTodos.filter(t => true);
        }
    };

    const setSort = (a: TodoType, b: TodoType) =>
        a.name === b.name ? 0 : a.name < b.name ? -1 : 1;

    return (
        <ScrollView>
            {setFilter(filterType)
                .sort(setSort)
                .map((todo, idx) => (
                    <TodoItem todo={todo} key={idx} />
                ))}
        </ScrollView>
    );
});

export default TodoList;
