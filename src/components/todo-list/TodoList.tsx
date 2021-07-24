import {observer} from 'mobx-react';
import React from 'react';
import {useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ListTodo, {TodoType} from '../../stores/ListTodoStore';
import Todo from '../../stores/TodoStore';
import TodoItem from '../todo-item';

const TodoList = observer(() => {
    const {getTodos, filterType, isLoad} = ListTodo;
    const {getTasks} = Todo;

    useEffect(() => {}, [getTasks]);

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
                return getTodos.filter(_t => true);
        }
    };

    const setSort = (a: TodoType, b: TodoType) =>
        a.name === b.name ? 0 : a.name < b.name ? -1 : 1;

    return (
        <FlatList
            data={setFilter(filterType).sort(setSort)}
            renderItem={({item}: {item: TodoType}) => (
                <TodoItem todo={item} key={item.id} />
            )}
        />
    );
});

export default TodoList;
