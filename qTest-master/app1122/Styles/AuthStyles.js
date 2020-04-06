import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    imageBackgroundStyle: {
        height: height / 2
    },
    logoTextStyle: {
        color: '#FF3301',
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    formStyle: {
        flex: 1,
        marginHorizontal: 10
    },
    headerStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20
    },
    checkBoxContainerStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        flex: 1,
        marginLeft: 10,
        padding: 0
    },
    checkBoxTextStyle: {
        color: 'grey',
        marginBottom: 3
    },
    fpStyle: {
        marginRight: 10,
        fontWeight: 'bold',
        color: 'grey',
        alignSelf: 'center',
        marginBottom: 5,
        fontSize: 14
    }
});

export default styles;