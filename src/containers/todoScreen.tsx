import {useNavigation} from '@react-navigation/native';
import {
    Icon,
    Layout,
    TopNavigation,
    TopNavigationAction,
} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {BackButton} from 'react-router-native';
import AddTaskBack from '../components/add-task-back';
import AddTaskFront from '../components/add-task-front/AddTaskFront';
import SwitchLine from '../components/switch-line';
import TaskList from '../components/task-list';
import ListTodo from '../stores/ListTodoStore';

const TodoScreen = observer(({route}: any) => {
    const {getTodosById} = ListTodo;
    const todo = getTodosById(route.params.id);

    return (
        <Layout style={{height: '100%'}} level="3">
            <TaskList tasks={todo?.tasks || []} />
            <SwitchLine FrontElem={AddTaskFront} BackElem={AddTaskBack} />
        </Layout>
    );
});

export default TodoScreen;
