import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import todoList from '../../stores/todoList';
import ClickIcon from '../click-icon';
import styles from './style';

const TodoNavbarButton = () => {
    const nav = useNavigation();

    return (
        <View style={styles.area}>
            <ClickIcon
                name="refresh-outline"
                onPress={() => {
                    todoList.load();
                }}
            />
            <ClickIcon
                name="person-outline"
                onPress={() => {
                    nav.navigate('Login');
                }}
            />
        </View>
    );
};

export default TodoNavbarButton;
