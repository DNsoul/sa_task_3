import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    checkbox: {
        flex: 1,
    },
    content: {
        flex: 9,
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowFront: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 25,
        paddingRight: 25,
        paddingVertical: 5,
    },
    important: {
        width: 30,
        height: 10,
        borderRadius: 50,
        borderWidth: 1,
    },
    importantCheck: {
        backgroundColor: 'red',
    },
    importantUncheck: {
        backgroundColor: 'white',
    },
});