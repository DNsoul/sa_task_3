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
import Todo from '../stores/TodoStore';

const BackIcon = (props: any) => {
    const nav = useNavigation();
    const {loadTasks} = Todo;

    return (
        <TouchableOpacity
            onPress={() => {
                nav.goBack();
                loadTasks([]);
            }}>
            <Icon {...props} name="arrow-back" />
        </TouchableOpacity>
    );
};

const TodoScreen = observer(({route}: any) => {
    const {getTodosById} = ListTodo;
    const todo = getTodosById(route.params.id);

    return (
        <Layout style={{height: '100%'}} level="2">
            <BackButton>
                <TopNavigation
                    alignment="center"
                    title={todo?.name}
                    accessoryLeft={() => (
                        <TopNavigationAction icon={BackIcon} />
                    )}
                />
                <TaskList tasks={todo?.tasks || []} />
                <SwitchLine FrontElem={AddTaskFront} BackElem={AddTaskBack} />
            </BackButton>
        </Layout>
    );
});

export default TodoScreen;
