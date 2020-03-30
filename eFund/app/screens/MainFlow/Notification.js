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
            project_data:[],
            project:"",
            Msg: '',
            items:''
        }
        this.list = React.createRef();
    }
    componentDidMount() {
        this._retrieveData();
    }
    _retrieveData = async () => {
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
        var arry=[];
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
                console.log(JSON.stringify(json.notification))
                // var v = this.state.data.length
                // for (let i = 0; i < v; i++) {
                //     // arr.push(json.notification[i].message,json.notification[i].project
                //     arry.push(json.notification[i].project)
                //     arr.push(json.notification[i].message)
                // }
                // this.setState({ dada: arr })
                // this.setState({ project_data: arry})
            })
            .catch(error => {
                console.error(error);
            });
    }
    accept(item) {
        this.setState({ Requestvisible: true })
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
                , "project": this.state.project
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
                "details":  this.state.items
                , "project": this.state.project
                , "message": this.state.Msg
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
        if (this.state.User.roles == "Supervisor") {
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
                                <View style={{ backgroundColor: 'white', padding: 20 }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Request: {item.message}</Text>
                                         <Text style={{ fontSize: 10, color: "blue", marginLeft: "1%", height: 50, width: 300 }}>Project Id: {item.project}</Text>  

                                    </View>
                                    <View style={{ flexDirection: 'row',justifyContent:'center' }}>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#FF3301', padding: 14, margin:10,borderRadius: 10, height: 50, width: 80 }}
                                            onPress={() =>{this.setState({project:item.project  }), this.accept(item.message)}}>
                                            <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}
                                            >Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10,margin:10,height: 50, width: 80 }}
                                            onPress={() => { this.setState({ visible: true,items:item.message,project:item.project})}}>
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
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Header />
                    <Text style={{ fontSize: 20, color: "red", alignSelf: "center" }}>Notifications</Text>
                    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                        <FlatList
                            data={this.state.data}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            keyExtractor={(a, b, ) => b.toString()}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: 'white', padding: 20 }}>
                                    <Text style={{ fontSize: 10, color: "red", marginLeft: "3%" }}>Message: {item.message}</Text>
                                    <Text style={{ fontSize: 10, color: "red", marginLeft: "3%" }}>From:{item.from}</Text>
                                    <Text style={{ fontSize: 10, color: "red", marginLeft: "3%" }}>Status:{item.status}</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            );
        }
    }
}

