import {Button, Icon} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet} from 'react-native';
import ListTodo from '../../stores/ListTodoStore';

const FAB = observer(() => {
    const {addTodo} = ListTodo;

    return (
        <Button
            style={styles.button}
            accessoryLeft={(props: any) => (
                <Icon {...props} name="plus-outline" />
            )}
            onPress={() => addTodo('132')}
        />
    );
});

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
