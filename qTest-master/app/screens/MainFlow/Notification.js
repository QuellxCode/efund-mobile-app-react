import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity, TouchableWithoutFeedback, TextInput, Modal, AsyncStorage } from 'react-native';
import Header from '../../components/Header';
import { Button } from 'react-native-elements';
import MainFlowStyles from "../../Styles/MainFlowStyles"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            Requestvisible: false,
            response_: '',
            User: [],
            data: [],
            dada: [],
            project_data: [],
            project: "",
            Msg: '',
            items: '',
            purchaserID:"",
            purchaserName:"",
            notification_id:"",
            token:'',
        }
        this.list = React.createRef();
    }
    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('User');
            const val = JSON.parse(value)
            if (val !== null) {
                this.setState({
                    User: val,
                })
                this.get_notification();
                //console.log(this.state.User)
            }
        } catch (error) {
            console.log('error getting data')
        }
    }
    get_notification() {
        var arr = [];
        var arry = [];
        fetch('http://efundapp.herokuapp.com/api/notification', {
            method: 'Get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ data: json.notification })
           
            })
            .catch(error => {
                console.error(error);
            });
    }
    push_notification(token) {
        fetch('https://exp.host/--/api/v2/push/send', {
             method: 'POST',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'accept-encoding': 'gzip, deflate',
               'host': 'exp.host'
             },
             body: JSON.stringify({
               to: token,
               title: 'New Notification',
               body: "Request Payment Notification from supervisor",
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
    director_accept(){
        fetch('http://efundapp.herokuapp.com/api/purchase/director-accept', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            },
            body: JSON.stringify({
                "details": item,
                "project": this.state.project,
                "purchaserName": this.state.purchaserName,
                "purchaserID": this.state.purchaserID,

            })
        })
            .then(response => response.json())
            .then(json => {
                console.log("response:" + JSON.stringify(json))
            })
            .catch(error => {
                console.error(error);
            });
    }
    director_notification(id){
        fetch('http://efundapp.herokuapp.com/api/notification/'+id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            },
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ token: json.mobileToken })
                this.push_notification(this.state.token)
            })
            .catch(error => {
                console.error(error);
            });
    }
    sup_accept(item) {
        // console.log("item::::"+item)
        // console.log("itemssss::::"+this.state.project)
        // console.log("accepted_item" + item)
        fetch('http://efundapp.herokuapp.com/api/purchase/accept-notification', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            },
            body: JSON.stringify({
                "details": item
                ,"project": this.state.project,
                "purchaserName": this.state.purchaserName,
                "purchaserID": this.state.purchaserID,
            })
        })
            .then(response => response.json())
            .then(json => {
                //console.log("responseSSSS:" + JSON.stringify(json))
                this.setState({notification_id:json.notificationID ,Requestvisible: true})
                this.director_notification(this.state.notification_id)
                // console.log("new + +id"+JSON.stringify(json))
            })
            .catch(error => {
                console.error(error);
            });
    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }
    reject_ok() {
        // console.log("item::::"+this.state.items)
        // console.log("itemssss::::"+this.state.project)
        // console.log("msg"+this.state.Msg)
        fetch('http://efundapp.herokuapp.com/api/purchase/reject-notification', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            },
            body: JSON.stringify({
                "details": this.state.items
                , "project": this.state.project
                , "message": this.state.Msg
                ,"purchaserName": this.state.purchaserName,
                "purchaserID": this.state.purchaserID,
              
            })
        })
            .then(response => response.json())
            .then(json => {
                console.log("response:" + JSON.stringify(json))
            })
            .catch(error => {
                console.error(error);
            });
        this.setState({ visible: false })
    }
    render() {
        if (this.state.User.roles == "Supervisor"){
            return (
                <View style={{ flex: 1 }}>
                    <Header />
                    <Text style={{ fontSize: 30, color: "red", alignSelf: "center" }}>Notification</Text>
                    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                        <FlatList
                            data={this.state.data}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            keyExtractor={(a, b, ) => b.toString()}
                            renderItem={({ item, index }) => (
                                <View style={{ backgroundColor: 'white', padding: 10 }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Request: {item.message}</Text>
                                        <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Purchaser Id:{item.purchaserID}</Text>
                                        <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Project id:{item.project}</Text>
                                        <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Purchaser Name:{item.purchaserName}</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#FF3301', padding: 14, margin: 10, borderRadius: 10, height: 50, width: 80 }}
                                            onPress={() => { this.setState({ project: item.project,purchaserID:item.purchaserID,purchaserName:item.purchaserName }), this.sup_accept(item.message) }}>
                                            <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}
                                            >Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10, margin: 10, height: 50, width: 80 }}
                                            onPress={() => { this.setState({ visible: true, items: item.message, project: item.project,purchaserID:item.purchaserID,purchaserName:item.purchaserName }) }}>
                                            <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}
                                            >Reject</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Modal animationType='fade' transparent={true} visible={this.state.Requestvisible}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                            <View style={{ backgroundColor: 'white', paddingTop: 10, borderRadius: 20, width: width * 0.8 }}>
                                                <View style={{ alignSelf: 'center', padding: 20 }}>
                                                    <FontAwesome name='send' color='#FF3301' size={50} />
                                                </View>
                                                <Text
                                                    style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#FF3301', paddingBottom: 40 }}>
                                                    Best your approval is Accepted!
                                                    </Text>
                                                <Button
                                                    title='OK'
                                                    buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                                                    onPress={() => this.setState({ Requestvisible: false })}
                                                />
                                            </View>
                                        </View>
                                    </Modal>
                                    <Modal animationType='fade' transparent={true} visible={this.state.visible}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                            <View style={{ backgroundColor: 'white', paddingTop: 10, borderRadius: 20, width: width * 0.8 }}>
                                                <View style={{ alignSelf: 'center', padding: 20 }}>
                                                    <FontAwesome name='send' color='#FF3301' size={50} />
                                                </View>
                                                <TextInput
                                                    placeholder="Why you are rejected this approval"
                                                    onChangeText={(Msg) => this.setState({ Msg })}
                                                    style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#FF3301', paddingBottom: 40 }}></TextInput>
                                                <Button
                                                    title='OK'
                                                    buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                                                    onPress={() => this.reject_ok()}
                                                />
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                            )}
                        />
                    </View>
                </View>
            );
        }
        else if (this.state.User.roles == "Purchaser") {
            return (
                <View style={{ flex: 1 }}>
                    <Header />
                    <Text style={{ fontSize: 30, color: "red", alignSelf: "center" }}>Notification </Text>
                    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                        <FlatList
                            data={this.state.data}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            keyExtractor={(a, b, ) => b.toString()}
                            renderItem={({ item, index }) => (
                                <View style={{ backgroundColor: 'white', padding: 10 }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 30, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Reason:</Text>
                                        <Text style={{ fontSize: 20, color: "red", marginLeft: "1%", height: 80, width: 300 }}>{item.message}</Text>
                                    </View>
                             </View>
                            )}
                        />
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Header />
                    <Text style={{ fontSize: 30, color: "red", alignSelf: "center" }}>Notification</Text>
                    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                        <FlatList
                            data={this.state.data}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            keyExtractor={(a, b, ) => b.toString()}
                            renderItem={({ item, index }) => (
                                <View style={{ backgroundColor: 'white', padding: 10 }}>
                                    <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Request: {item.message}</Text>
                                        <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Purchaser Id:{item.purchaserID}</Text>
                                        <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Project id:{item.project}</Text>
                                        <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Purchaser Name:{item.purchaserName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#FF3301', padding: 14, margin: 10, borderRadius: 10, height: 50, width: 80 }}
                                            onPress={() => { this.setState({ project: item.project,purchaserID:item.purchaserID,purchaserName:item.purchaserName}), this.director_accept(item.message) }}>
                                            <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}
                                            >Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10, margin: 10, height: 50, width: 80 }}
                                            onPress={() => { this.setState({ visible: true, items: item.message, project: item.project }) }}>
                                            <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}
                                            >Reject</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Modal animationType='fade' transparent={true} visible={this.state.Requestvisible}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                            <View style={{ backgroundColor: 'white', paddingTop: 10, borderRadius: 20, width: width * 0.8 }}>
                                                <View style={{ alignSelf: 'center', padding: 20 }}>
                                                    <FontAwesome name='send' color='#FF3301' size={50} />
                                                </View>
                                                <Text
                                                    style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#FF3301', paddingBottom: 40 }}>
                                                    Best your approval is Accepted!
                                                                </Text>
                                                <Button
                                                    title='OK'
                                                    buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                                                    onPress={() => this.setState({ Requestvisible: false })}
                                                />
                                            </View>
                                        </View>
                                    </Modal>
                                    <Modal animationType='fade' transparent={true} visible={this.state.visible}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                            <View style={{ backgroundColor: 'white', paddingTop: 10, borderRadius: 20, width: width * 0.8 }}>
                                                <View style={{ alignSelf: 'center', padding: 20 }}>
                                                    <FontAwesome name='send' color='#FF3301' size={50} />
                                                </View>
                                                <TextInput
                                                    placeholder="Why you are rejected this approval"
                                                    onChangeText={(Msg) => this.setState({ Msg })}
                                                    style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#FF3301', paddingBottom: 40 }}></TextInput>
                                                <Button
                                                    title='OK'
                                                    buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                                                    onPress={() => this.reject_ok()}
                                                />
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                            )}
                        />
                    </View>
                </View>
            );
        }
    }
}
     //console.log(JSON.stringify(json))
                // console.log( "purchaserName"+this.state.data.notification.purchaserName)
                // console.log("purchaserID"+this.state.data.notification.purchaserID)
                // var v = this.state.data.length
                // for (let i = 0; i < v; i++) {
                //     // arr.push(json.notification[i].message,json.notification[i].project
                //     arry.push(json.notification[i].project)
                //     arr.push(json.notification[i].message)
                // }
                // this.setState({ dada: arr })
                // this.setState({ project_data: arry})