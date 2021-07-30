import React from 'react';

import SplashScreen from 'react-native-splash-screen';

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
    const {loadLocal, saveLocal} = ListTodo;

    const currentAppState = useAppState();

    useEffect(() => {
        SplashScreen.hide();
    }, [ ]);

    useEffect(() => {
        if (currentAppState === 'active') {
            loadLocal();
        } else {
            saveLocal();
        }
    }, [currentAppState, loadLocal, saveLocal]);

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
