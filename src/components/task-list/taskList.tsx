import {observer} from 'mobx-react';
import React from 'react';
import {useEffect} from 'react';
import { ScrollView } from 'react-native';
import {Button, Text, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Todo from '../../stores/TodoStore';
import AddTaskLine from '../add-task-line';
import TaskItemBack from '../task-item-back';
import TaskItemFront from '../task-item-front';

const TaskList = observer(() => {
    const {getTasks, loadTasks, addTask} = Todo;

    useEffect(() => {
        loadTasks();
        console.log(getTasks);
    }, []);

    return (
        <>
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
            <AddTaskLine />
        </>
    );
});
export default TaskList;
