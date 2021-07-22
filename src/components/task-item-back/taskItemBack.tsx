import React from 'react';
import {StyleSheet, View} from 'react-native';
import Todo from '../../stores/TodoStore';
import {Icon, Button} from '@ui-kitten/components';

const Delete = () => (
    <Icon style={styles.icon} fill="white" name="trash-2-outline" />
);


const closeRow = (rowMap: any, rowKey: number) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
};

const TaskItemBack = ({id, rowMap}: {id: number; rowMap: any}) => {
    const {delTask} = Todo;

    return (
        <View style={styles.rowBack}>
            <Button
                onPress={() => {
                    closeRow(rowMap, id);
                    delTask(id);
                }}
                appearance="ghost"
                accessoryLeft={() => <Delete />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default TaskItemBack;
