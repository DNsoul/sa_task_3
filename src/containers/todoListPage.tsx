import {Layout, TopNavigation} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import FAB from '../components/FAB';
import TodoList from '../components/todo-list';

const TodoListPage = observer(() => {
    return (
        <Layout style={{height: '100%'}} level="1">
            <TopNavigation alignment="center" title="Список дел" />
            <TodoList />
            <FAB />
        </Layout>
    );
});

export default TodoListPage;
