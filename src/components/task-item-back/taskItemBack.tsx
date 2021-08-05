import React from 'react';
import {View} from 'react-native';
import {Icon, Button} from '@ui-kitten/components';
import styles from './style';

const Delete = () => (
    <Icon style={styles.icon} fill="white" name="trash-2-outline" />
);

type TaskItemBackPropsType = {
    id: string;
    closeRow: Function;
    delTask: Function;
};

const TaskItemBack = ({id, closeRow, delTask}: TaskItemBackPropsType) => {
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

export default TaskItemBack;
