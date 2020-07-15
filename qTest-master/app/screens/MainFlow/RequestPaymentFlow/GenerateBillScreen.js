import React, { Component,useEffect  } from 'react';
import { View, Text, Dimensions, FlatList, Modal, AsyncStorage } from 'react-native';
import Header from '../../../components/Header';
import { Button } from 'react-native-elements';
import MainFlowStyles from '../../../Styles/MainFlowStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SERVER_URL } from '../../../utils/config';

const { width, height } = Dimensions.get('window');

class GenerateBillScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_: this.props.navigation.state.params.bill,
            data_project: this.props.navigation.state.params.project,
            visible: false,
            response_: '',
            resp: '',
            token: '',
            User: [],
            data: '',
            myToken: '',
            notification: '',
            total: 0,
            totall: this.props.navigation.state.params.total,
            purchaseID: '',
            allNotification:[]
        }
    }

    async componentDidMount() {
        this.retrieveData(); 
        this.get_notification_length();
    }
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('User');
            const val = JSON.parse(value)
            if (val !== null) {
                this.setState({
                    User: val,
                })
                console.log(this.state.User)
            }
        } catch (error) {
            console.log('error getting data')
        }
    };
    // push_notification() {
    //    fetch('https://exp.host/--/api/v2/push/send', {
    //         method: 'POST',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           'accept-encoding': 'gzip, deflate',
    //           'host': 'exp.host'
    //         },
    //         body: JSON.stringify({
    //           to: this.state.token,
    //           title: 'New Notification',
    //           body: "Request Payment Notification from purchaser",
    //           priority: "high",
    //           sound: "default",
    //           channelId: "default",
    //         }),
    //       }).then((response) => response.json())
    //         .then((responseJson) => { 
    //             console.log("noti"+JSON.stringify(responseJson))
    //         })
    //         .catch((error) => { console.log(error) });

    // }

    handlePressfirst = async () => {
            fetch(`${SERVER_URL}/api/purchase/post`, {
                method: 'Post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': this.state.User.token,
                },
                body: JSON.stringify({
                    "project": this.state.data_project,
                     "details": this.state.data_
                })
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    this.setState({ 
                        resp: json,
                        // disabledB: false,
                        purchaseID: json.purchaseID
                    })
                    console.log("adasda", this.state.purchaseID)
                    this.handlePress();
                })
                .catch(error => {
                    console.error(error);
                });
    }

    get_notifiaction(n_id) {
        console.log("this.your notify id"+n_id)
        fetch(`${SERVER_URL}/api/notification/`+n_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            },
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ token: json.mobileToken, data:json.notification.message })
                 console.log("tokens:"+this.state.token)
                //this.push_notification()
                // this.push_notification()
            })
            .catch(error => {
                console.error(error);
            });
    }

    onClickButton () {
        this.setState({
            visible: false
        })
        this.props.navigation.replace('RequestPayment')
        this.props.navigation.navigate('Home')
    }
     handlePress = async () => {
        this.setState({ visible: true })
        console.log("data" + JSON.stringify(this.state.data_))
        console.log("datap" + this.state.data_project)

        fetch(`${SERVER_URL}/api/purchase/send-notification`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            },
            body: JSON.stringify({
                "details": this.state.data_,
                "project": this.state.data_project,
                "notification_status": "RequestPayment",
                "request" : this.state.purchaseID
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


    get_notification_length ()  {
        var arr = [];
        var arry = [];
        fetch(`${SERVER_URL}/api/notification`, {
          method: 'Get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token':this.state.User.token,
          },
        })
          .then(response => response.json())
          .then(json => {
            this.setState({allNotification:json.notification})
          
          })
          .catch(error => {
            console.error(error);
          });
      }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header notificationLength={this.state.allNotification.length} />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                    <View style={[MainFlowStyles.cardStyle, { paddingTop: 10, paddingBottom: 10, flex: 1 }]}>
                        <Text style={MainFlowStyles.headerTextStyle}>Billing</Text>

                        <View style={{ flexDirection: 'row', paddingBottom: 20, marginTop: 20, borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Item Name</Text>
                            </View>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Quantity</Text>
                            </View>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Rate</Text>
                            </View>
                            <View style={MainFlowStyles.billHeadingStyle}>
                                <Text>Total</Text>
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
                                            <Text style={{textAlign:'center'}}>{item.item}</Text>
                                        </View>
                                        <View style={MainFlowStyles.billHeadingStyle}>
                                            <Text>{item.qty}</Text>
                                        </View>
                                        <View style={MainFlowStyles.billHeadingStyle}>
                                            <Text>{item.price}</Text>
                                        </View>
                                        <View style={MainFlowStyles.billHeadingStyle}>
                                            <Text>{item.qty * item.price}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    <Text style={{alignSelf:'flex-end', paddingBottom: 20, marginTop: 20, borderBottomColor: '#FFC1B2', borderBottomWidth:1, marginRight:'10%'}}>Grand Total: {this.state.totall}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginBottom: 20, marginTop: 10, elevation: 5 }}>
                    <Button
                        title='Forward Request'
                        buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10 }}
                        containerStyle={{ marginHorizontal: 10 }}
                        onPress={() => { this.handlePressfirst(), { visible: true } }}
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
                                onPress={() => this.onClickButton()}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default GenerateBillScreen;
