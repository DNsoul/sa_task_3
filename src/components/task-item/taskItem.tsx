import React from 'react';
import {StyleSheet, View} from 'react-native';
import Todo, {TaskType} from '../../stores/TaskListStore';
import {Text, CheckBox, Button, Icon} from '@ui-kitten/components';
import {SwipeRow} from 'react-native-swipe-list-view';
import {useRef} from 'react';

const Delete = () => (
    <Icon style={styles.icon} fill="white" name="trash-2-outline" />
);

const TaskItem = ({id, task}: {id: number; task: TaskType}) => {
    const {delTask, toggleTask} = Todo;
    const swipeRef = useRef<any>(null);

    return (
        <SwipeRow ref={swipeRef} disableRightSwipe={true} rightOpenValue={-80}>
            <View style={styles.rowBack}>
                <Button
                    onPress={() => {
                        swipeRef.current!.closeRow();
                        delTask(id);
                    }}
                    appearance="ghost"
                    accessoryLeft={() => <Delete />}
                />
            </View>
            <View style={styles.rowFront}>
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
            </View>
        </SwipeRow>
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
        backgroundColor: 'white',
        height: 'auto',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    rowBack: {
        backgroundColor: '#FF8165',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
    },
    icon: {
        height: 32,
        width: 32,
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

export default TaskItem;
