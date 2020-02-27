import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';

const MenuDrawer = ({ navigation }) => {
    function navLink(routeName, text, image) {
        return (
            <TouchableOpacity
                style={styles.listContainerStyles}
                onPress={() => navigation.navigate(routeName)}
            >
                <View style={{ flex: 1 }}>
                    <Image source={image} />
                </View>
                <View style={{ flex: 9 }}>
                    <Text style={{ marginLeft: 30 }}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            <View style={styles.avatarContainerStyles}>
                <View style={styles.avatarIconContainerStyle}>
                    <MaterialCommunityIcons name='account' color='white' size={40} />
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.avatarTextStyle}>Abdul Aziz</Text>
                    <Text>Purchaser</Text>
                </View>
            </View>

            <View>
                {navLink('Home', 'Home'.toUpperCase(), require('../images/Home.png'))}
                {navLink('requestPaymentFlow', 'Request Payment'.toUpperCase(), require('../images/RequestPayment.png'))}
                {navLink('Reports', 'Reports'.toUpperCase(), require('../images/Reports.png'))}
                {navLink('Wallet', 'Wallet'.toUpperCase(), require('../images/Wallet.png'))}
                {navLink('Settings', 'Settings'.toUpperCase(), require('../images/Settings.png'))}
            </View>

            <TouchableOpacity
                style={styles.listContainerStyles}
                onPress={() => navigation.navigate('loginFlow')}
            >
                <View style={{ flex: 1 }}>
                    <Image source={require('../images/Logout.png')} />
                </View>
                <View style={{ flex: 9 }}>
                    <Text style={{ marginLeft: 30 }}>LOGOUT</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainerStyles: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 50,
        borderBottomColor: '#FF3301',
        borderBottomWidth: 1
    },
    avatarIconContainerStyle: {
        backgroundColor: '#FF3301',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 60 / 2
    },
    avatarTextStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    listContainerStyles: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 30
    }
});

export default withNavigation(MenuDrawer);