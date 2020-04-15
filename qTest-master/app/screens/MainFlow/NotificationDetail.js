import React, { Component,useEffect  } from 'react';
import { View, Text, Dimensions, FlatList, Modal, AsyncStorage } from 'react-native';
import Header from '../../components/Header';
import { Button, Input } from 'react-native-elements';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

class NotifierDetaler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data_: this.props.navigation.state.params.bill,
            data_project: this.props.navigation.state.params.project,
            visible: false,
            visibleB: false,
            response_: '',
            token: '',
            User: [],
            data: '',
            myToken: '',
            notification: '',
            total: 0,
            // totall: this.props.navigation.state.params.total,
            all: [],
            specif: [],
            detailed:[],
            description: '',
        }
    }

    async componentDidMount() {
        try {
          const value = await AsyncStorage.getItem('User');
          const val = JSON.parse(value);
          if (val !== null) {
            this.setState({
              User: val,
            });
            console.log('userIdii', this.state.User.user_id);
            this.get_notification();
            // console.log("userId",this.state.User.user_id)
          }
        } catch (error) {
          console.log('error getting data');
        }
    }

    get_notification() {
        var arr = [];
        var arry = [];
        fetch('http://efundapp.herokuapp.com/api/project/'+this.state.data_project, {
          method: 'Get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.User.token,
          },
        })
          .then(response => response.json())
          .then(json => {
            this.setState({
              all: json,
              specif: json.project,
              detailed: json.project.details
            });
            console.log("ALL",this.state.all)
            console.log("Specific",this.state.specif)
            console.log("Detailed",this.state.detailed)
            // console.log("aabe",json.notification[3].message[0].pkr)
            // console.log("dasdatsd", this.state.all)
            // console.log("dasdatsd", this.state.all.length)
            // var v = this.state.all.length;
            // for (let i = 0; i < v; i++) {
            //   // arr.push(json.notification[i].message,json.notification[i].project
            //  // arry.push(json.notification[i].project);
            //   arr.push(json.notification[i].message);
            // }
            // this.setState({dada:arr})
            // console.log('dada arr', JSON.stringify(arr));
            // this.dataCheck();
          })
          .catch(error => {
            console.error(error);
          });
      }

    director_accept(item) {
        console.log('dddd', item);
        fetch('http://efundapp.herokuapp.com/api/purchase/director-accept', {
          method: 'Post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.User.token,
          },
          body: JSON.stringify({
            details: item,
            project: this.state.project,
            purchaserName: this.state.purchaserName,
            purchaserID: this.state.purchaserID,
          }),
        })
          .then(response => response.json())
          .then(json => {
            this.setState({Isvisible: true});
          })
          .catch(error => {
            console.error(error);
          });
      }
      director_notification(id) {
        fetch('http://efundapp.herokuapp.com/api/notification/' + id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.User.token,
          },
        })
          .then(response => response.json())
          .then(json => {
            this.setState({token: json.mobileToken});
          })
          .catch(error => {
            console.error(error);
          });
      }
      sup_accept(item) {
        fetch('http://efundapp.herokuapp.com/api/purchase/accept-notification', {
          method: 'Post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.User.token,
          },
          body: JSON.stringify({
            details: item,
            project: this.state.project,
            purchaserName: this.state.purchaserName,
            purchaserID: this.state.purchaserID,
          }),
        })
          .then(response => response.json())
          .then(json => {
            this.setState({
              notification_id: json.notificationID,
              Requestvisible: true,
            });
            this.director_notification(this.state.notification_id);
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
              width: '100%',
              backgroundColor: '#000',
            }}
          />
        );
      };
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
            details: this.state.items,
            project: this.state.project,
            message: this.state.Msg,
            purchaserName: this.state.purchaserName,
            purchaserID: this.state.purchaserID,
          }),
        })
          .then(response => response.json())
          .then(json => {
            console.log('response:' + JSON.stringify(json));
          })
          .catch(error => {
            console.error(error);
          });
        this.setState({visible: false});
      }
    
      txt(item) {
        var str = item;
     str = str.replace(/[^a-zA-Z0-9]/g, ' ');
     str = str.replace(/  +/g, ' ') 
     str = str.replace("/ ",":")
    return str
      }  

      onClickButton () {
        this.setState({
            visible: false
        })
        this.props.navigation.replace('Notification')
        this.props.navigation.navigate('Home')
    }


    handlePress = async () => {
        this.setState({ visible: true })
        
    }
    handlePressB = async () => {
        this.setState({ visibleB: true })
        
    }

      
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                    <View style={[MainFlowStyles.cardStyle, { paddingTop: 10, paddingBottom: 10, flex: 1 }]}>
        <Text style={{fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20}}>
            {this.state.specif.project_name}
            </Text>

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
                                            <Text>{item.item}</Text>
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
                    <Text style={{alignSelf:'flex-end', paddingBottom: 20, marginTop: 20, borderBottomColor: '#FFC1B2', borderBottomWidth:1, marginRight:'5.5%'}}>{this.state.totall}</Text>
                    </View>
                </View>

                <View style={{flexDirection: "row", marginBottom: 20, marginTop: 10, marginHorizontal: "25%", elevation: 5 }}>

                    <Button
                        title='Accept'
                        buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10 }}
                        containerStyle={{ marginHorizontal: 10 }}
                        onPress={() => { this.handlePress(), { visible: true } }}
                    />
                
                    <Button
                        title='Reject'
                        buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10 }}
                        containerStyle={{ marginHorizontal: 10 }}
                        onPress={() => { this.handlePressB(), { visibleB: true } }}
                    />
               
                </View>

                <Modal animationType='fade' transparent={true} visible={this.state.visible}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View style={{ backgroundColor: 'white', paddingTop: 10, borderRadius: 20, width: width * 0.8 }}>
                            <View style={{ alignSelf: 'center', padding: 20 }}>
                                <FontAwesome name='send' color='#FF3301' size={50} />
                            </View>
                            <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#FF3301', paddingBottom: 40 }}>Request Sent To Director</Text>
                            <Button
                                title='OK'
                                buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                                onPress={() => this.onClickButton()}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal animationType='fade' transparent={true} visible={this.state.visibleB}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View style={{ backgroundColor: 'white', paddingTop: 10, borderRadius: 20, width: width * 0.8 }}>
                            <View style={{ alignSelf: 'center', padding: 20 }}>
                                <FontAwesome name='send' color='#FF3301' size={50} />
                            </View>
                            <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#FF3301', paddingBottom: 40 }}>Request Rejected</Text>
                            <Input
                                    placeholder='Enter Your Reason for Rejection.'
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    keyboardType='default'
                                    // inputStyle={{ fontSize: 14, paddingBottom: 50, textAlignVertical: 'top' }}
                                    // inputContainerStyle={{ borderColor: '#FF3301', borderWidth: 1, borderRadius: 0 }}
                                    multiline
                                    onChangeText={(value) => this.setState({ description: value })}
                                />
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
export default NotifierDetaler;
