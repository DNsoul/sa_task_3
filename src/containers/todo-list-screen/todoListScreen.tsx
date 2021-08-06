import {Layout} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import SelectFilter from '../../components/select-filter';
import {SwitchLine, SwitchLineTodoBack} from '../../components/switch-lines';
import TodoList from '../../components/todo-list';
import todoList from '../../stores/todoList';

import styles from './style';

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

export default TodoListScreen;
