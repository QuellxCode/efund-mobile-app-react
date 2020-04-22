import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {withNavigation} from 'react-navigation';
const MenuDrawer = ({navigation}) => {
  //const [User, setUser] = useState(0)
  function navLink(routeName, text, image) {
    return (
      <TouchableOpacity
        style={styles.listContainerStyles}
        onPress={() => navigation.navigate(routeName)}>
        <View style={{flex: 1}}>
          <Image source={image} />
        </View>
        <View style={{flex: 9}}>
          <Text style={{marginLeft: 30}}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  const [User, setUser] = useState([]);
  const [isReady, setisReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const value = await AsyncStorage.getItem('User');
        const val = JSON.parse(value);
        setUser(val);
        setisReady(true);
      } catch (error) {
        console.log('error getting data');
      }
    };
    check();
  }, []);
  if (isReady == false) {
    return <View />;
  } else {
    if (User.roles == 'Purchaser' || User.roles == 'Supervisor') {
      return (
        <View style={{marginTop: 24}}>
          <View style={styles.avatarContainerStyles}>
            <View style={styles.avatarIconContainerStyle}>
              <MaterialCommunityIcons name="account" color="white" size={40} />
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={styles.avatarTextStyle}>{User.name}</Text>
              <Text>{User.roles}</Text>
            </View>
          </View>
          <View>
            {navLink(
              'Home',
              'Home'.toUpperCase(),
              require('../images/Home.png'),
            )}
            {navLink(
              'requestPaymentFlow',
              'Request Payment'.toUpperCase(),
              require('../images/RequestPayment.png'),
            )}
            {navLink(
              'claim',
              'Claim Payment'.toUpperCase(),
              require('../images/RequestPayment.png'),
            )}
            {navLink(
              'Reports',
              'Reports'.toUpperCase(),
              require('../images/Reports.png'),
            )}
            {navLink(
              'Wallet',
              'Wallet'.toUpperCase(),
              require('../images/Wallet.png'),
            )}
            {navLink(
              'Settings',
              'Settings'.toUpperCase(),
              require('../images/Settings.png'),
            )}
          </View>

          <TouchableOpacity
            style={styles.listContainerStyles}
            onPress={
              async () => {
                await AsyncStorage.removeItem('User').then(() => {
                  navigation.navigate('loginFlow');
                });
              }
              // () => navigation.navigate('loginFlow')
            }>
            <View style={{flex: 1}}>
              <Image source={require('../images/Logout.png')} />
            </View>
            <View style={{flex: 9}}>
              <Text style={{marginLeft: 30}}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    if (User.roles == 'Director') {
      return (
        <View style={{marginTop: 24}}>
          <View style={styles.avatarContainerStyles}>
            <View style={styles.avatarIconContainerStyle}>
              <MaterialCommunityIcons name="account" color="white" size={40} />
            </View>

            <View>
                {navLink('Home', 'Home'.toUpperCase(), require('../images/Home.png'))}
                {navLink('generate', 'Generate Pay Order'.toUpperCase(), require('../images/RequestPayment.png'))}
                {navLink('Reports', 'Reports'.toUpperCase(), require('../images/Reports.png'))}
                {navLink('Settings', 'Settings'.toUpperCase(), require('../images/Settings.png'))}
            </View>
          </View>
          <View>
            {navLink(
              'Home',
              'Home'.toUpperCase(),
              require('../images/Home.png'),
            )}
            {navLink(
              'GeneratePayOrder',
              'Generate Pay Order'.toUpperCase(),
              require('../images/RequestPayment.png'),
            )}
            {navLink(
              'Reports',
              'Reports'.toUpperCase(),
              require('../images/Reports.png'),
            )}
            {navLink(
              'Settings',
              'Settings'.toUpperCase(),
              require('../images/Settings.png'),
            )}
          </View>

          <TouchableOpacity
            style={styles.listContainerStyles}
            onPress={
              async () => {
                await AsyncStorage.removeItem('User').then(() => {
                  navigation.navigate('loginFlow');
                });
              }
              // () => navigation.navigate('loginFlow')
            }>
            <View style={{flex: 1}}>
              <Image source={require('../images/Logout.png')} />
            </View>
            <View style={{flex: 9}}>
              <Text style={{marginLeft: 30}}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  avatarContainerStyles: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 50,
    borderBottomColor: '#FF3301',
    borderBottomWidth: 1,
  },
  avatarIconContainerStyle: {
    backgroundColor: '#FF3301',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  avatarTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainerStyles: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 30,
  },
});

export default withNavigation(MenuDrawer);
