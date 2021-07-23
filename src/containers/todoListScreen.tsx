import {Layout, TopNavigation} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import AddTodoBack from '../components/add-todo-back';
import AddTodoFront from '../components/add-todo-front';
import SelectFilter from '../components/select-filter';
import SwitchLine from '../components/switch-line';
import TodoList from '../components/todo-list';

const TodoListScreen = observer(() => {
    return (
        <Layout style={{height: '100%'}} level="3">
            <TopNavigation alignment="center" title="Список дел" />
            <SelectFilter />
            <TodoList />
            <SwitchLine FrontElem={AddTodoFront} BackElem={AddTodoBack} />
        </Layout>
    );
});

export default TodoListScreen;
