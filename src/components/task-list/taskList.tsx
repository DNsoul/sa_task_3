import {observer} from 'mobx-react';
import React from 'react';
import {useEffect} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import Todo, {TaskType} from '../../stores/TodoStore';
import TaskItemBack from '../task-item-back';
import TaskItemFront from '../task-item-front';

const TaskList = observer(({tasks}: {tasks: TaskType[]}) => {
    const {getTasks, loadTasks} = Todo;

    useEffect(() => {
        loadTasks(tasks);
    }, [tasks, loadTasks]);

    return (
        <SwipeListView
            data={getTasks.map((task, i) => ({key: `${i}`, task}))}
            renderItem={data => (
                <TaskItemFront
                    id={Number(data.item.key)}
                    task={data.item.task}
                />
            )}
            renderHiddenItem={(data, rowMap) => (
                <TaskItemBack rowMap={rowMap} id={Number(data.item.key)} />
            )}
            disableRightSwipe={true}
            rightOpenValue={-80}
            restSpeedThreshold={10}
            tension={100}
        />
    );
});
export default TaskList;
