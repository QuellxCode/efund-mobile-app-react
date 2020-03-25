import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Modal, AsyncStorage } from 'react-native';
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
            response_: '',
            User: '',
            data: [],
        }
        this.list = React.createRef();
    }
    componentDidMount() {
        this.get_notification();
    }
    async get_notification() {
        try {
            const value = await AsyncStorage.getItem('User');
            const val = JSON.parse(value)
            if (val !== null) {
                this.setState({
                    User: val.token,
                })
                // console.log("///"+)
            }
        } catch (error) {
            console.log('error getting data')
        }
        var token = JSON.stringify(this.state.User)
        //console.log(token)
        fetch('http://efundapp.herokuapp.com/api/notification', {
            method: 'Get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTRiY2ZkODA3YTNjNzJjZDBhYTZkYjMiLCJyb2xlcyI6IlN1cGVydmlzb3IiLCJpYXQiOjE1ODQxNTMxNDd9.Fl1kmsa4wsXik-QsEuRDCJe9l2G_o9FpauJOV-CdhyY"
            }
        })
            .then(response => response.json())
            .then(json => {
                //console.log(JSON.stringify(json.notification))
                this.setState({ data:json.notification })
            })
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <Text style ={{fontSize:20,color:"red",alignSelf:"center"}}>Notifications</Text>
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

