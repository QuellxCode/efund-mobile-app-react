import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity, TextInput, Modal, AsyncStorage } from 'react-native';
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
            Requestvisible:false,
            response_: '',
            User: [],
            data: [],
            dada:[],
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
        var arr=[];
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
                //console.log(JSON.stringify(this.state.User.token))
                this.setState({ data: json.notification })
               // 
               var v=this.state.data.length
                 for(let i=0;i<v;i++){
                   //console.log('v:'+v)
                    
                    this.setState({ dada: notification[i].message })
                 }
                 console.log("dada"+this.state.dada)
               //console.log("++"+(json.notification[].message))
                //console.log("++"+JSON.stringify(json.notification[6].message))
            })
            .catch(error => {
                console.error(error);
            });
    }
    accept()
    {
        this.setState({Requestvisible:true})
    }
    reject() {
        this.setState({ visible: true })
        //alert("sss")
    }
    render() {
        if (this.state.User.roles == "Supervisor") {
            return (
                <View style={{ flex: 1 }}>
                    <Header />
                    <Text style={{ fontSize: 30, color: "red", alignSelf: "center" }}>Notifications</Text>
                    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                        <FlatList
                            data={this.state.data}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            keyExtractor={(a, b, ) => b.toString()}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: 'white', padding: 20 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 20, color: "red", marginLeft: "1%", height: 50, width: 200 }}>Message: {item.message}</Text>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10, height: 50, width: 80 }}
                                            onPress={() =>this.accept() }>
                                            <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}
                                            >Accept</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 20, color: "red", marginLeft: "1%", height: 50, width: 200 }}>From:{item.from}</Text>

                                        <TouchableOpacity
                                            style={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10, height: 50, width: 80 }}
                                            onPress={() => this.reject()}>
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
                                                    style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#FF3301', paddingBottom: 40 }}></TextInput>
                                                <Button
                                                    title='OK'
                                                    buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                                                    onPress={() => this.setState({ visible: false })}
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

