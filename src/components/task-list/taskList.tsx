import {observer} from 'mobx-react';
import React from 'react';
import {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Todo from '../../stores/TaskListStore';
import AddTaskLine from '../add-task-line';
import TaskItem from '../task-item';

/*
const TaskList = observer(() => {
    const {tasks, loadTasks} = Todo;

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <ScrollView>
            {tasks.map((task, idx) => (
                <TaskItem id={idx} task={task} key={idx} />
            ))}
            <AddTaskLine />
        </ScrollView>
    );
});
*/

const TaskList = () => {
    const {getTasks, loadTasks} = Todo;

    useEffect(() => {
        loadTasks();
        console.log(getTasks);
    }, []);

    const d = getTasks.map((t, i) => ({key: `${i}`, text: t.text}));

    return (
        <SwipeListView
            data={d}
            renderItem={(data, rowMap) => (
                <View>
                    <Text>I am fin a SwipeListView</Text>
                </View>
            )}
            renderHiddenItem={(data, rowMap) => (
                <View>
                    <Text>Left</Text>
                    <Text>Right</Text>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
    );
};
export default TaskList;
