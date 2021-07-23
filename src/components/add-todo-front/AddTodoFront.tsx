import {Button, Icon} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const AddTodoFront = ({setInState}: any) => {
    return (
        <View style={styles.content}>
            <Button
                style={styles.buttonLine}
                appearance="ghost"
                onPress={() => setInState(false)}
                accessoryLeft={() => (
                    <Icon
                        style={styles.icon}
                        fill="#3366FF"
                        name="plus-outline"
                    />
                )}>
                Добавить дело
            </Button>
        </View>
    );
};

export default AddTodoFront;

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 'auto',
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 15,
    },
    buttonLine: {
        height: 50,
        width: '100%',
    },
});
