import {Icon, Layout, Button} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import Todo from '../../stores/TaskListStore';

const Palette = () => (
    <Icon style={styles.icon} fill="#8F9BB3" name="color-palette-outline" />
);

const Plus = () => (
    <Icon style={styles.icon} fill="#8F9BB3" name="plus-outline" />
);

function BottomPanel() {
    const {addTask} = Todo;

    return (
        <Layout style={styles.panel} level="2">
            <Button appearance="ghost" accessoryLeft={() => <Palette />} />
            <Button
                onPress={() => addTask('123', '123')}
                appearance="ghost"
                accessoryLeft={() => <Plus />}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    panel: {
        flexDirection: 'row',
        paddingVertical: 0,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    icon: {
        width: 32,
        height: 32,
    },
});

export default BottomPanel;
