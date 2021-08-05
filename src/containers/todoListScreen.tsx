import {Layout} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet} from 'react-native';
import SelectFilter from '../components/select-filter';
import {SwitchLine, SwitchLineTodoBack} from '../components/switch-lines';
import TodoList from '../components/todo-list';
import {todoList} from '../stores/todo';

const TodoListScreen = observer(() => {
    const {addTodo, delTodo, getTodos, filter, setFilter} = todoList;

    return (
        <Layout style={styles.layout} level="3">
            <SelectFilter filter={filter} setFilter={setFilter} />
            <TodoList
                todos={getTodos.slice()}
                filter={filter}
                delTodo={delTodo}
            />
            <SwitchLine
                action={addTodo}
                text="Добавить"
                BackElem={SwitchLineTodoBack}
            />
        </Layout>
    );
});

const styles = StyleSheet.create({
    layout: {
        height: '100%',
    },
});

export default TodoListScreen;
