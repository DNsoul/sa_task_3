import {observer} from 'mobx-react';
import React from 'react';
import styles from './style';
import {SwipeListView} from 'react-native-swipe-list-view';
import {TaskType} from '../../stores/todo';
import TaskItemBack from '../task-item-back';
import TaskItemFront from '../task-item-front';

type TaskListPropsType = {
    tasks: TaskType[];
    delTask: Function;
    toggleTask: Function;
};

const TaskList = observer(({tasks, delTask, toggleTask}: TaskListPropsType) => {
    const closeRow = (rowMap: any, rowKey: number) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    return (
        <SwipeListView
            useFlatList={true}
            data={tasks}
            renderItem={data => (
                <TaskItemFront toggleTask={toggleTask} task={data.item} />
            )}
            renderHiddenItem={(data, rowMap) => (
                <TaskItemBack
                    closeRow={() => closeRow(rowMap, data.index)}
                    delTask={delTask}
                    id={data.item.id}
                />
            )}
            disableRightSwipe={true}
            rightOpenValue={-80}
            restSpeedThreshold={10}
            tension={80}
            recalculateHiddenLayout={false}
            swipeRowStyle={styles.row}
        />
    );
});

export default TaskList;
