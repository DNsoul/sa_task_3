import React from 'react';
import {View} from 'react-native';
import {Text, CheckBox, Layout} from '@ui-kitten/components';
import {TaskType} from '../../stores/todo';
import styles from './style';

type TaskItemFrontPropsType = {
    task: TaskType;
    toggleTask: Function;
};

const TaskItemFront = ({task, toggleTask}: TaskItemFrontPropsType) => {
    return (
        <Layout key={task.id} level="2" style={styles.rowFront}>
            <CheckBox
                onChange={() => toggleTask(task.id)}
                checked={task.is_completed}
                style={styles.checkbox}
            />
            <View style={styles.content}>
                <View style={styles.info}>
                    <View
                        style={[
                            styles.important,
                            task.urgency - 1
                                ? styles.importantCheck
                                : styles.importantUncheck,
                        ]}
                    />
                    <Text category="p2">{task.time}</Text>
                </View>
                <Text category="p1">{task.name}</Text>
            </View>
        </Layout>
    );
};

export default React.memo(TaskItemFront, (prev, next) => {
    return prev.task === next.task;
});
