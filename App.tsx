import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import TodoListPage from './src/containers/todoListPage';
import TodoPage from './src/containers/todoPage';

const App = () => {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <SafeAreaView>
                    <StatusBar />
                    <TodoListPage />
                </SafeAreaView>
            </ApplicationProvider>
        </>
    );
};

export default App;
