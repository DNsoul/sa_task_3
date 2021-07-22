import {observer} from 'mobx-react';
import React from 'react';
import {useEffect} from 'react';
import {ScrollView} from 'react-native';
import ListTodo from '../../stores/ListTodoStore';
import TodoItem from '../todo-item';

const TodoList = observer(() => {
    const {getTodos} = ListTodo;

    useEffect(() => {
        console.log(getTodos);
    }, [getTodos]);

    return (
        <ScrollView>
            {getTodos.map((todo, idx) => (
                <TodoItem name={todo.name} key={idx} />
            ))}
        </ScrollView>
    );
});

export default TodoList;
