import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import TodoListScreen from '../containers/todoListScreen';
import TodoScreen from '../containers/todoScreen';

const Stack = createStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="TodoList"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="TodoList" component={TodoListScreen} />
            <Stack.Screen name="Todo" component={TodoScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigation;
