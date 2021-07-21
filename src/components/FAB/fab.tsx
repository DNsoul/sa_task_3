import {Button, Icon} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import Todo from '../../stores/TaskListStore';

function FAB() {
    const {addTask} = Todo;

    return (
        <Button
            style={styles.button}
            accessoryLeft={(props: any) => (
                <Icon {...props} name="plus-outline" />
            )}
            onPress={() => addTask('132', '321')}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 60,
        width: 60,
        borderRadius: 50,
    },
});

export default FAB;
