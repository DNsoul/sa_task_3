import {Button, Icon, Input} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import API from '../../services/apiService';

const FAB = observer(() => {
    const req = () => {
        API.listCreate({name: 'qweqwe', is_closed: false, is_completed: false})
            .then(d => console.log('data: ', d))
            .catch(e => console.log('error: ', e));
    };

    return (
        <View style={styles.content}>
            <Input style={styles.input} />
            <Button
                style={styles.button}
                accessoryLeft={(props: any) => (
                    <Icon {...props} name="plus-outline" />
                )}
                onPress={() => req()}
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
