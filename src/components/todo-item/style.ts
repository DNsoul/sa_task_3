import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    emptyTodo: {
        backgroundColor: '#FCFDFE',
    },
    completeTodo: {
        backgroundColor: '#EDEFF4',
    },
    incompleteTodo: {
        backgroundColor: '#E7F9A6',
    },
});
