import {Button, Icon, Input} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ListTodo from '../../stores/ListTodoStore';

const FAB = observer(() => {
    const {addTodo} = ListTodo;

    return (
        <View style={styles.content}>
            <Input style={styles.input} />
            <Button
                style={styles.button}
                accessoryLeft={(props: any) => (
                    <Icon {...props} name="plus-outline" />
                )}
                onPress={() => addTodo('132')}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 15,
        right: 10,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    input: {
        width: '80%',
    },
    button: {
        borderRadius: 50,
        width: 50,
        height: 50,
    },
});

export default FAB;
