import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import MainNavigation from './src/navigation/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';
import ListTodo from './src/stores/ListTodoStore';
import {useAppState} from '@react-native-community/hooks';

const App = () => {
    const {loadDataAsync, saveData} = ListTodo;

    const currentAppState = useAppState();

    useEffect(() => {
        if (currentAppState === 'active') {
            loadDataAsync().catch(() => {});
        } else {
            saveData().catch(() => {});
        }
    }, [currentAppState, loadDataAsync, saveData]);

    return (
        <NavigationContainer>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <SafeAreaView style={{flex: 1}}>
                    <StatusBar />
                    <MainNavigation />
                </SafeAreaView>
            </ApplicationProvider>
        </NavigationContainer>
    );
};

export default App;
