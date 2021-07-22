import React from 'react';
import {StyleSheet, View} from 'react-native';
import Todo, {TaskType} from '../../stores/TodoStore';
import {Text, CheckBox, Layout} from '@ui-kitten/components';

const TaskItemFront = ({id, task}: {id: number; task: TaskType}) => {
    const {toggleTask} = Todo;

    return (
        <Layout level="2" style={styles.rowFront}>
            <CheckBox
                onChange={() => toggleTask(id)}
                checked={task.checked}
                style={styles.checkbox}
            />
            <View style={styles.content}>
                <View style={styles.info}>
                    <View
                        style={[
                            styles.important,
                            task.important
                                ? styles.importantCheck
                                : styles.importantUncheck,
                        ]}
                    />
                    <Text category="p2">{task.time}</Text>
                </View>
                <Text category="p1">{task.text}</Text>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        flex: 1,
    },
    content: {
        flex: 9,
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowFront: {
        alignItems: 'center',
        height: 'auto',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    important: {
        width: 30,
        height: 10,
        borderRadius: 50,
        borderWidth: 1,
    },
    importantCheck: {
        backgroundColor: 'red',
    },
    importantUncheck: {
        backgroundColor: 'white',
    },
});

export default React.memo(TaskItemFront, (prev, next) => {
    return prev.task === next.task;
});
