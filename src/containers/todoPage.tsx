import {
    Icon,
    Layout,
    TopNavigation,
    TopNavigationAction,
} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import TaskList from '../components/task-list';

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const TodoPage = observer(() => {
    return (
        <Layout style={{height: '100%'}} level="2">
            <TopNavigation
                alignment="center"
                title="Eva 321"

                accessoryLeft={() => <TopNavigationAction icon={BackIcon} />}
            />
            <TaskList />
        </Layout>
    );
});

export default TodoPage;
