import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import TodoNavbarButton from '../components/todo-navbar-button';
import loginScreen from '../containers/login-screen';
import TodoListScreen from '../containers/todo-list-screen/';
import TodoScreen from '../containers/todo-screen/';

const Stack = createStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="TodoList">
            <Stack.Screen
                name="Login"
                component={loginScreen}
                options={{title: 'Синхронизация'}}
            />
            <Stack.Screen
                name="TodoList"
                component={TodoListScreen}
                options={() => ({
                    title: 'Список дел',
                    headerRight: () => <TodoNavbarButton />,
                })}
            />
            <Stack.Screen
                name="Todo"
                component={TodoScreen}
                options={({route}) => ({
                    title: route.params!.title ?? 'Без названия',
                })}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;
