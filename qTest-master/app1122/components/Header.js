import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ navigation }) => {
    return (
        <View style={styles.headerContainerStyle}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View style={{ width: 22, height: 30, justifyContent: 'center' }}>
                    <Image
                        source={require('../images/Menu.png')}
                        style={{ height: 24, width: 24 }}
                    />
                </View>
            </TouchableOpacity>

            <Text style={styles.logoStyle}>E-Fund</Text>

            <TouchableOpacity>
                <MaterialCommunityIcons name='bell' color='white' size={30} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainerStyle: {
        flexDirection: 'row',
        backgroundColor: '#FF3301',
        justifyContent: 'space-between',
        padding: 10
    },
    logoStyle: {
        color: 'white',
        fontSize: 20,
        textAlignVertical: 'center'
    }
});

export default withNavigation(Header);