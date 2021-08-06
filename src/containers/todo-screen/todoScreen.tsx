import {Layout} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import {SwitchLine, SwitchLineTaskBack} from '../../components/switch-lines';
import TaskList from '../../components/task-list';
import todoList from '../../stores/todoList';
import styles from './style';

const TodoScreen = observer(({route}: any) => {
    const {getTodoById} = todoList;

    const id = route.params.id;

    const todo = getTodoById(id);

    const {getTasks, toggleTask, delTask, addTask} = todo;

    return (
        <Layout style={styles.area} level="3">
            <TaskList
                tasks={getTasks.slice()}
                toggleTask={toggleTask}
                delTask={delTask}
            />
            <SwitchLine
                text="Добавить"
                action={addTask}
                BackElem={SwitchLineTaskBack}
            />
        </Layout>
    );
});

export default TodoScreen;
