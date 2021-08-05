import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

import {SafeAreaView, StyleSheet} from 'react-native';

import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {useAppState} from '@react-native-community/hooks';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from '../navigation/MainNavigation';
import {todoList} from '../stores/todo';

const Main = () => {
    const currentAppState = useAppState();

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    /*useEffect(() => {
        if (currentAppState === 'active') {
            todoList.load();
        } else {
            todoList.save();
        }
    }, [currentAppState]);*/

    return (
        <NavigationContainer>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <SafeAreaView style={styles.area}>
                    <MainNavigation />
                </SafeAreaView>
            </ApplicationProvider>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
    },
});

export default Main;
