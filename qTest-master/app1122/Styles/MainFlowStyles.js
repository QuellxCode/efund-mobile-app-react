import { StyleSheet, Dimensions } from "react-native";
const{width, height} = Dimensions.get('window');

const Card = StyleSheet.create({
    cardStyle: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5
    },
    cardTextStyle: {
        color: '#FF3301',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    containerStyle: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20
    },
    headerTextStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20
    },
    cardHeadingStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10
    },
    tabStyles: {
        width: (width - 20) / 3
    },
    tabTextContainerStyle: {
        paddingBottom: 10, 
        borderBottomWidth: 3
    },
    tabTextStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    billHeadingStyle: {
        width: (width - 40) / 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Card