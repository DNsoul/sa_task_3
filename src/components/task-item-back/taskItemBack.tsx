import React from 'react';
import {StyleSheet, View} from 'react-native';
import Todo from '../../stores/TodoStore';
import {Icon, Button} from '@ui-kitten/components';

const Delete = () => (
    <Icon style={styles.icon} fill="white" name="trash-2-outline" />
);

const TaskItemBack = ({id, closeRow}: {id: string; closeRow: Function}) => {
    const {delTask} = Todo;

    return (
        <View key={id} style={styles.rowBack}>
            <Button
                onPress={() => {
                    closeRow();
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
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
    },
    icon: {
        height: 32,
        width: 32,
    },
});

export default React.memo(TaskItemBack);
