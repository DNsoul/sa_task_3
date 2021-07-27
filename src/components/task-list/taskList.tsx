import {observer} from 'mobx-react';
import React from 'react';
import {useEffect} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import Todo, {TaskType} from '../../stores/TodoStore';
import TaskItemBack from '../task-item-back';
import TaskItemFront from '../task-item-front';

const closeRow = (rowMap: any, rowKey: number) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
};

const TaskList = observer(({tasks}: {tasks: TaskType[]}) => {
    const {getTasks, loadTasks} = Todo;

    useEffect(() => {
        loadTasks(tasks);
    }, [tasks, loadTasks]);

    return (
        <SwipeListView
            useFlatList={true}
            data={getTasks.map((task, i) => ({key: `${i}`, task}))}
            renderItem={data => (
                <TaskItemFront idx={data.index} task={data.item.task} />
            )}
            renderHiddenItem={(data, rowMap) => (
                <TaskItemBack
                    closeRow={() => closeRow(rowMap, data.index)}
                    id={data.item.task.id}
                />
            )}
            disableRightSwipe={true}
            rightOpenValue={-80}
            restSpeedThreshold={10}
            previewRowKey={'0'}
            tension={100}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            recalculateHiddenLayout={false}
        />
    );
});

export default TaskList;
