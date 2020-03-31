import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { render } from 'react-dom';
const PUSH_ENDPOINT = 'https://easy-soup.glitch.me/token';
export default class NotificationScreen extends React.Component {
  state = {
    notification: {},
    data: '',
    token_: '',
  };
  async componentDidMount() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') { return; }
    let token = await Notifications.getExpoPushTokenAsync();
    //let token="ExponentPushToken[LfHN3dM2tOTusrvwejW8Sj]"
    ///let token="ExponentPushToken[Kp3Ty9Bz51NUsTpGOLwzZd]"
    this.setState({ token_: token })
    //console.log("token: ",token);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  async submit() {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'accept-encoding': 'gzip, deflate',
        'host': 'exp.host'
      },
      body: JSON.stringify({
        to: this.state.token_,
        title: 'New Notification',
        body: this.state.data,
        priority: "high",
        sound: "default",
        channelId: "default",
      }),
    }).then((response) => response.json())
      .then((responseJson) => { })
      .catch((error) => { console.log(error) });
  }
  _handleNotification = notification => {
    // do whatever you want to do with the notification
    this.setState({ notification: notification });
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text>Write any Notification body here</Text>
        <TextInput style={{ fontSize: 22, borderColor: 'red', height: 50, width: 200, borderWidth: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}
          placeholder="Push notification"
          onChangeText={(data) => this.setState({ data })}
        ></TextInput>
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={() => this.submit()}>
          <Text style={{ fontSize: 22, marginTop: 70, height: 30, width: 250, borderWidth: 1 }}>Push Notification button</Text>
        </TouchableOpacity>
      </View>
    );
  }
};