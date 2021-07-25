import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ClickIcon from '../components/click-icon';
import loginScreen from '../containers/loginScreen';
import TodoListScreen from '../containers/todoListScreen';
import TodoScreen from '../containers/todoScreen';

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
                options={({navigation}) => ({
                    title: 'Список дел',
                    headerRight: () => (
                        <ClickIcon
                            name="person-outline"
                            onPress={() => {
                                navigation.navigate('Login');
                            }}
                        />
                    ),
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
