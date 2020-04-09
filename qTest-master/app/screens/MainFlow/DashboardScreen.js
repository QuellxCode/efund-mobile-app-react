import React, { Component, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, AsyncStorage, Alert } from 'react-native';
import Header from '../../components/Header';
import Timeline from '../../components/Timeline';
import TwoColumnCard from '../../components/TwoColumnCard';
import ColumnCard from '../../components/ColumnCard';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { notificationManager } from '../../NotificationManager';
import Notification from "../../screens/MainFlow/Notification"


const Purchaser = () => {
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
       async componentDidMount() {
           console.log("alph")
   fetch('http://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': '237335251444'
            },
    body: JSON.stringify({
        "to":"dv0RWuR32tE:APA91bHpPJJtkO-9oAQiODcX7DF-kPOmQGepdXtaONV-HW7x2m-AgvOPdiQF9LFKlyHfnqFimVC5svbPuGX9uK3Cx5a_Dmzu8udwN2N5r0duTx5StFAL1mbM2Z9a3AoTKg5o9KsiIU97",
        //"to":"cBDaDPlGeNzfHel7VRUxk2:APA91bG0HnCCDddqaZIx06Fu5IpVIiDhVviZyWl9EFX-WWL3yjaT6SHKQei1Okcg12XFnqhkYD7fwWyTHsySAIheFZWoHpIHvmusA0ZabLcefhxjZZXFkAF7z05hEh_5D4ch6f0jhza9",
        "data": {
            "custom_notification": {
            "body": "test body",
            "title": "test title",
            "color":"#00ACD4",
            "priority":"high",
            "icon":"ic_notif",
            "group": "GROUP",
            "sound": "default",
            "id": "id",
            "show_in_foreground": true
            }
        }
    })
})
        this._retrieveData();
       }
    //     const { status: existingStatus } = await Permissions.getAsync(
    //       Permissions.NOTIFICATIONS
    //     );
    //     let finalStatus = existingStatus;
    //     if (existingStatus !== 'granted') {
    //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //       finalStatus = status;
    //     }
    //     if (finalStatus !== 'granted') { return; }
    //     let token = await Notifications.getExpoPushTokenAsync();
    //     fetch('http://efundapp.herokuapp.com/api/user/user-edit', {
    //         method: 'PATCH',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           'X-Auth-Token': this.state.User.token,
    //         },
    //         body: JSON.stringify({
    //             "mobile_token":token
    //         }),
    //       }).then((response) => response.json())
    //         .then((responseJson) => {console.log(responseJson)
    //             console.log(token) })
    //         .catch((error) => { console.log(error) });
    //   }
     _retrieveData = async () => {
       try {
         const value = await AsyncStorage.getItem('User');
         const val = JSON.parse(value)
         if (val !== null) {
           this.setState({
             User: val,
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





const Supervisor = () => {
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
    const onRegister = token => {
        console.log('[Notification] Register', token);
    };
    const onNotification = notify => {
        console.log('[Notification] onNotification', notify);
    };
    const onOpenNotification = notify => {
        console.log('[Notification] onOpenNotification', notify);
        Alert.alert('Bill is Added');
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





const Director = () => {
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
    const onRegister = token => {
        console.log('[Notification] Register', token);
    };
    const onNotification = notify => {
        console.log('[Notification] onNotification', notify);
    };
    const onOpenNotification = notify => {
        console.log('[Notification] onOpenNotification', notify);
        Alert.alert('Bill is Approved');
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


const DashboardScreen = () => {
   
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
          return  <Purchaser/>
        }
        if(user.roles === "Supervisor"){
            return  <Supervisor/>
        }
        if (user.roles === "Director") {
            return   <Director/>
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

export default DashboardScreen;

