import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Modal, AsyncStorage } from 'react-native';
import Header from '../../../components/Header';
import { Button } from 'react-native-elements';
import MainFlowStyles from '../../../Styles/MainFlowStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
class GenerateBillScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_: this.props.navigation.state.params.bill,
            data_project: this.props.navigation.state.params.project,
            visible: false,
            response_: '',
            token: '',
            User: [],
            data:'',
            myToken:'',
            notification:'',
        }
    }
    getPushNotificationPermissions = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
         
        }
        if (finalStatus !== 'granted') {
          return;
        }
             var token=await Notifications.getExpoPushTokenAsync();
             this.setState({myToken:token})
             console.log("mytoken"+token)
      }
      _handleNotification = notification => {
        this.setState({ notification: notification });
      };
    componentDidMount() {
        this.retrieveData();
        this.getPushNotificationPermissions()   
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('User');
            const val = JSON.parse(value)
            if (val !== null) {
                this.setState({
                    User: val,
                })
                // console.log(this.state.User)
            }
        } catch (error) {
            console.log('error getting data')
        }
    };
    push_notification() {
       fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'accept-encoding': 'gzip, deflate',
              'host': 'exp.host'
            },
            body: JSON.stringify({
              to: this.state.token,
              title: 'New Notification',
              body: "Request Payment Notification from purchaser",
              priority: "high",
              sound: "default",
              channelId: "default",
            }),
          }).then((response) => response.json())
            .then((responseJson) => { 
                console.log("noti"+JSON.stringify(responseJson))
            })
            .catch((error) => { console.log(error) });

    }
    get_notifiaction(n_id) {
        console.log("this.your notify id"+n_id)
        fetch('http://efundapp.herokuapp.com/api/notification/'+n_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            },
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ token: json.mobileToken,data:json.notification.message })
                 console.log("tokens:"+this.state.token)
                this.push_notification()
            })
            .catch(error => {
                console.error(error);
            });
    }
    handlePress = async () => {
        this.setState({ visible: true })
        console.log("data" + JSON.stringify(this.state.data_))
        console.log("datap" + this.state.data_project)

        fetch('http://efundapp.herokuapp.com/api/purchase/send-notification', {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            },
            body: JSON.stringify({
                "details": this.state.data_
                , "project": this.state.data_project
            })
        })
            .then(response => response.json())
            .then(json => {
                console.log(JSON.stringify(json))
                this.setState({ response_: json.notificationID })
                this.get_notifiaction(this.state.response_);
                // alert(JSON.stringify(this.state.response_))

            })
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                    <View style={[MainFlowStyles.cardStyle, { paddingTop: 10, paddingBottom: 10, flex: 1 }]}>
                        <Text style={MainFlowStyles.headerTextStyle}>Billing</Text>

                        <View style={{ flexDirection: 'row', paddingBottom: 20, marginTop: 20, borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Item Name</Text>
                            </View>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Price</Text>
                            </View>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Quantity</Text>
                            </View>
                        </View>
                        <FlatList
                            style={{ flexGrow: 0 }}
                            data={this.state.data_}
                            keyExtractor={(item) => item.number}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flexDirection: 'row', paddingBottom: 20, marginTop: 20, borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}>
                                        <View style={MainFlowStyles.billHeadingStyle}>
                                            <Text>{item.item}</Text>
                                        </View>
                                        <View style={MainFlowStyles.billHeadingStyle}>
                                            <Text>{'Rs.' + item.price}</Text>
                                        </View>
                                        <View style={MainFlowStyles.billHeadingStyle}>
                                            <Text>{item.qty}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />

                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginBottom: 20, marginTop: 10, elevation: 5 }}>
                    <Button
                        title='Forward Request'
                        buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10 }}
                        containerStyle={{ marginHorizontal: 10 }}
                        onPress={() => { this.handlePress(), { visible: true } }}
                    />
                </View>
                <Modal animationType='fade' transparent={true} visible={this.state.visible}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View style={{ backgroundColor: 'white', paddingTop: 10, borderRadius: 20, width: width * 0.8 }}>
                            <View style={{ alignSelf: 'center', padding: 20 }}>
                                <FontAwesome name='send' color='#FF3301' size={50} />
                            </View>
                            <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#FF3301', paddingBottom: 40 }}>Request sent for approval</Text>
                            <Button
                                title='OK'
                                buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                                onPress={() => this.setState({ visible: false })}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default GenerateBillScreen;
