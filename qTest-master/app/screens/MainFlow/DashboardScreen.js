import React, { Component, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, AsyncStorage, Alert, Button } from 'react-native';
import Header from '../../components/Header';
import Timeline from '../../components/Timeline';
import TwoColumnCard from '../../components/TwoColumnCard';
import ColumnCard from '../../components/ColumnCard';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { notificationManager } from '../../NotificationManager';
import Notification from "../../screens/MainFlow/Notification"
import { withNavigation } from 'react-navigation';

const Purchaser = props => {
    const data = [
        { id: 1, name: 'Purchaser', select: true },
        { id: 2, name: 'Manager', select: false },
        { id: 3, name: 'Director', select: false },
        { id: 4, name: 'Accountant', select: false }
    ]

    const [notification, setNotification] = useState();
    const [user, setUser] = useState();
    let localNotify = null;
    let length = '';
    if (notification != null && notification != undefined) {
        length = notification.length;

    }

    const redirect =()=> {
        props.navigation.navigate('Notification')
      };
    const onRegister = token => {
        console.log('[Notification] Register', token);
    };
    const onNotification = notify => {
        console.log('[Notification] onNotification', notify);
    };
    const onOpenNotification = notify => {
        console.log('[Notification] onOpenNotification', notify);
    //    <Notification/>
        props.navigation.navigate('Notification')
    // Alert.alert('bill jfdkjkj')

    };
    useEffect(() => {
        localNotify = notificationManager;
        localNotify.configure(onRegister, onNotification, onOpenNotification);
    });

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('User');
            const val = JSON.parse(value)
            if (val !== null) {
                setUser(val)
            }
        } catch (error) {
            console.log('error getting data')
        }
    };

    useEffect(() => {
        retrieveData();
    }, [])

    useEffect(() => {
        if (user != undefined && user != null) {
            fetch('http://efundapp.herokuapp.com/api/notification', {
                method: 'Get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': user.token,
                }
            })
                .then(response => response.json())
                .then(json => {
                    setNotification(json.notification)
                }
                )

                .catch(error => {
                    console.error(error);
                });

        }

    });
     
    useEffect(() => {
        if (notification != undefined && notification != null && notification.length > 1 ) {
            const a = notification.length - 1
            let aa = '';
                if(notification[a].to != undefined && notification[a].to != null){
                    aa = notification[a].to
                }
            if (user.user_id === aa) {
                localNotify.showNotification(
                    1,
                    'Your Bill is Rejected',
                    '', // data
                    '', // option
                );
            }
        }
    }, [length])




    return (
        <View>
            <Header />
            <ScrollView
                style={{ paddingBottom: 30, marginBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.welcomeTextStyle}>Welcome!</Text>
                    {/* TIMELINE */}
                    <View style={[MainFlowStyles.cardStyle, { paddingBottom: 10, marginBottom: 20 }]}>
                        <View style={styles.currentStatusContainer}>
                            <Text style={styles.currentStatusTextStyle}>Current Status</Text>
                        </View>
                        <View style={{ padding: 10, alignItems: 'center' }}>
                            <Timeline data={data} />
                        </View>
                    </View>

                    {/* Cards */}
                    <TwoColumnCard />
                </View>
            </ScrollView>
        </View>
    );
}





const Supervisor = props => {
    const data = [
        { id: 1, name: 'Purchaser', select: true },
        { id: 2, name: 'Manager', select: false },
        { id: 3, name: 'Director', select: false },
        { id: 4, name: 'Accountant', select: false }
    ]

    const [notification, setNotification] = useState();
    const [user, setUser] = useState();
    let localNotify = null;
    let length = '';
    if (notification != null && notification != undefined) {
        length = notification.length;

    }
    const redirect =()=> {
       return props.navigation.navigate('Notification');
      };
    const onRegister = token => {
        console.log('[Notification] Register', token);
    };
    const onNotification = notify => {
        console.log('[Notification] onNotification', notify);
    };
    const onOpenNotification = notify => {
        console.log('[Notification] onOpenNotification', notify);
        // Alert.alert('Bill is Added');
        props.navigation.navigate('Notification')
        //  <Notification/>
    };
    useEffect(() => {
        localNotify = notificationManager;
        localNotify.configure(onRegister, onNotification, onOpenNotification);
    });

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('User');
            const val = JSON.parse(value)
            if (val !== null) {
                setUser(val)
            }
        } catch (error) {
            console.log('error getting data')
        }
    };

    useEffect(() => {
        retrieveData();
    }, [])

    useEffect(() => {
        if (user != undefined && user != null) {
            fetch('http://efundapp.herokuapp.com/api/notification', {
                method: 'Get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': user.token,
                }
            })
                .then(response => response.json())
                .then(json => {
                    setNotification(json.notification)
                }
                )

                .catch(error => {
                    console.error(error);
                });

        }


    });

    useEffect(() => {
           if(user != undefined && user != null){
            if (notification != undefined && notification != null && notification.length > 1) {
                let a = notification.length - 1
                let aa = '';
               
                if(notification[a].to != undefined && notification[a].to != null){
               
                    aa = notification[a].to
                }
                              
                if (user.user_id === aa) {
                    localNotify.showNotification(
                                    1,
                                    'Bill is Added!',
                                    '', // data
                                    '', // option
                 );
                    // if(aa != undefined && aa != null){
                    //     if( notification[a].notification_status === 'RequestPayment'){
                    //         localNotify.showNotification(
                    //             1,
                    //             'Bill is Added!',
                    //             '', // data
                    //             '', // option
                    //         );
                             
                    //        }else{
                    //          localNotify.showNotification(
                    //             1,
                    //             'A New Claim Request!',
                    //             '', // data
                    //             '', // option
                    //          );
                    //        }
                    // }
                    
                }
            }
  }
        
    }, [length])





   
    return (
        <View>
            <Header />
            
            <ScrollView
                style={{ paddingBottom: 30, marginBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.welcomeTextStyle}>Welcome!</Text>
                    {/* TIMELINE */}
                    <View style={[MainFlowStyles.cardStyle, { paddingBottom: 10, marginBottom: 20 }]}>
                        <View style={styles.currentStatusContainer}>
                            <Text style={styles.currentStatusTextStyle}>Current Status</Text>
                        </View>
                        <View style={{ padding: 10, alignItems: 'center' }}>
                            <Timeline data={data} />
                        </View>
                    </View>

                    {/* Cards */}
                    <TwoColumnCard />
                </View>
            </ScrollView>
        </View>
    );
}





const Director = props => {
    const data = [
        { id: 1, name: 'Purchaser', select: true },
        { id: 2, name: 'Manager', select: false },
        { id: 3, name: 'Director', select: false },
        { id: 4, name: 'Accountant', select: false }
    ]

    const [notification, setNotification] = useState();
    const [user, setUser] = useState();
    let localNotify = null;
    let length = '';
    if (notification != null && notification != undefined) {
        length = notification.length;

    }
    const redirect =()=> {
        props.navigation.navigate('Notification')
      };
    
    const onRegister = token => {
        console.log('[Notification] Register', token);
    };
    const onNotification = notify => {
        console.log('[Notification] onNotification', notify);
    };
    const onOpenNotification = notify => {
        console.log('[Notification] onOpenNotification', notify);
        // Alert.alert('Bill is Approved');
        // redirect();
    //  <Notification/>
    props.navigation.navigate('Notification')
    };
    useEffect(() => {
        localNotify = notificationManager;
        localNotify.configure(onRegister, onNotification, onOpenNotification);
    });

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('User');
            const val = JSON.parse(value)
            if (val !== null) {
                setUser(val)
            }
        } catch (error) {
            console.log('error getting data')
        }
    };

    useEffect(() => {
        retrieveData();
    }, [])

    useEffect(() => {
        if (user != undefined && user != null ) {
            fetch('http://efundapp.herokuapp.com/api/notification', {
                method: 'Get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': user.token,
                }
            })
                .then(response => response.json())
                .then(json => {
                    setNotification(json.notification)
                }
                )

                .catch(error => {
                    console.error(error);
                });

        }


    });

    useEffect(() => {
        if (notification != undefined && notification != null && notification.length > 1) {
            const a = notification.length - 1
            let aa = '';
            if(notification[a].to != undefined && notification[a].to != null){
                aa = notification[a].to
            }
            if (user.user_id === aa) {
                localNotify.showNotification(
                    1,
                    'Bill is Approved',
                    '', // data
                    '', // option
                );
            }
        }
    }, [length])
    return (

        <View>
            <Header />
            <ScrollView
                style={{ paddingBottom: 30, marginBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.welcomeTextStyle}>Welcome!</Text>

                    {/* Cards */}
                    <ColumnCard />
                </View>
            </ScrollView>
        </View>

    );
}


const DashboardScreen = ({navigation}) => {
   
    const [user, setUser] = useState();
   
    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('User');
            const val = JSON.parse(value)
            if (val !== null) {
                setUser(val)
            }
        } catch (error) {
            console.log('error getting data')
        }
    };

    useEffect(() => {
        retrieveData();
    }, [])
        
    if (user != undefined && user != null) {
        if (user.roles ==="Purchaser") {
          return  <Purchaser navigation={navigation}/>
        }
        if(user.roles === "Supervisor"){
            return  <Supervisor navigation={navigation}/>
        }
        if (user.roles === "Director") {
            return   <Director navigation={navigation}/>
        }
    }
    return (
        <View>
            <Header />
        </View>
    )


    }  

const styles = StyleSheet.create({
    welcomeTextStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10
    },
    currentStatusContainer: {
        borderBottomColor: '#FF3301',
        borderBottomWidth: 1,
        padding: 10
    },
    currentStatusTextStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10
    }
});

export default withNavigation(DashboardScreen);

