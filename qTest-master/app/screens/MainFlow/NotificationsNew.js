import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, AsyncStorage } from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');

class NotificationsNewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAll: true,
            selectedApproved: false,
            selectedRejected: false,
            User: [],
            all: [
                // { date: 'Jan 01, 2020', bNumber: '01', id: 'John Doe', status: true },
                // { date: 'Jan 01, 2020', bNumber: '02', id: 'John Doe', status: false },
                // { date: 'Jan 01, 2020', bNumber: '03', id: 'John Doe', status: false },
                // { date: 'Jan 01, 2020', bNumber: '04', id: 'John Doe', status: true },
                // { date: 'Jan 01, 2020', bNumber: '05', id: 'John Doe', status: false },
                // { date: 'Jan 01, 2020', bNumber: '06', id: 'John Doe', status: false },
                // { date: 'Jan 01, 2020', bNumber: '06', id: 'John Doe', status: true },
                // { date: 'Jan 01, 2020', bNumber: '06', id: 'John Doe', status: false },
                // { date: 'Jan 01, 2020', bNumber: '06', id: 'John Doe', status: false},
            ],
            approved: [
                // { date: 'Jan 01, 2020', bNumber: '01', id: 'John Doe', status: 1 },
                // { date: 'Jan 01, 2020', bNumber: '02', id: 'John Doe', status: 1 }
            ],
            rejected: [
                // { date: 'Jan 01, 2020', bNumber: '01', id: 'John Doe', status: 0 },
                // { date: 'Jan 01, 2020', bNumber: '02', id: 'John Doe', status: 0 },
                // { date: 'Jan 01, 2020', bNumber: '03', id: 'John Doe', status: 0 },
                // { date: 'Jan 01, 2020', bNumber: '04', id: 'John Doe', status: 0 }
            ]
        };
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
            fetch('http://efundapp.herokuapp.com/api/notification', {
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
                  all: json.notification,
                });
                console.log("aabe",json.notification[3].message[0].pkr)
                console.log("dasdatsd", this.state.all)
                console.log("dasdatsd", this.state.all.length)
                var v = this.state.all.length;
                for (let i = 0; i < v; i++) {
                  // arr.push(json.notification[i].message,json.notification[i].project
                 // arry.push(json.notification[i].project);
                  arr.push(json.notification[i].message);
                }
                this.setState({dada:arr})
                // console.log('dada arr', JSON.stringify(arr));
                this.dataCheck();
              })
              .catch(error => {
                console.error(error);
              });
          }

          dataCheck(){
            for(let i=0; i<this.state.all.length; i++){
                if(this.state.all[i].status == 0){
                    this.state.rejected.push(this.state.all[i])
                }
                else{
                    this.state.approved.push(this.state.all[i])
                }
            }
            console.log("rejs", this.state.rejected)
            console.log("asasd", this.state.approved)
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

    render() {
        if (this.state.User.roles == 'Supervisor') {
        return (
            <View>
                <Header />
                <View style={{ margin: 10 }}>
                    <Text style={MainFlowStyles.headerTextStyle}>Notifications</Text>

                    <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TouchableOpacity
                            style={MainFlowStyles.tabStyles}
                            onPress={() => this.setState({ selectedAll: true, selectedApproved: false, selectedRejected: false })}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[MainFlowStyles.tabTextContainerStyle, { borderBottomColor: this.state.selectedAll ? '#FF3301' : 'transparent', marginLeft: 10 }]}>
                                    <Text style={[MainFlowStyles.tabTextStyle, { color: this.state.selectedAll ? 'black' : 'grey' }]}>ALL</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={MainFlowStyles.tabStyles}
                            onPress={() => this.setState({ selectedAll: false, selectedApproved: true, selectedRejected: false })}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{flex: 1}} />
                                <View style={[MainFlowStyles.tabTextContainerStyle, {borderBottomColor: this.state.selectedApproved ? '#FF3301' : 'transparent'}]}>
                                    <Text style={[MainFlowStyles.tabTextStyle, { color: this.state.selectedApproved ? 'black' : 'green' }]}>APPROVED</Text>
                                </View>
                                <View style={{flex: 1}} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={MainFlowStyles.tabStyles}
                            onPress={() => this.setState({ selectedAll: false, selectedApproved: false, selectedRejected: true })}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }} />
                                <View style={[MainFlowStyles.tabTextContainerStyle, { borderBottomColor: this.state.selectedRejected ? '#FF3301' : 'transparent', marginRight: 10 }]}>
                                    <Text style={[MainFlowStyles.tabTextStyle, { color: this.state.selectedRejected ? 'black' : 'red' }]}>REJECTED</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <FlatList
                        style={{ maxHeight: height * 0.75 }}
                        data={this.state.selectedAll ? this.state.all : this.state.selectedApproved ? this.state.approved : this.state.rejected}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("NotificationDeta", {project:item.project})} >
                                <View style={{ marginBottom: this.state.selectedAll ? (index === this.state.all.length - 1 ? 20 : 0) : (this.state.selectedApproved ? (index === this.state.approved.length - 1 ? 20 : 0) : (index === this.state.rejected.length - 1 ? 20 : 0)) }}>
                                    <View style={[MainFlowStyles.cardStyle, { marginBottom: 20, marginHorizontal: 5, marginTop: index === 0 ? 20 : 0, flex: 1, borderColor: item.status == 0 ? 'red' : 'green', borderWidth:2 }]}>
                                        <View style={{ padding: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'row', width: (width - 50) / 3 }}>
                                                    <View>
                                                        <AntDesign name='calendar' size={20} color='#FF3301' />
                                                    </View>
                                                    <Text> {item.date}</Text>
                                                </View>

                                                {/* <View style={{ width: (width - 50) / 3, alignItems: 'center' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bill {item.bNumber}</Text>
                                                </View> */}

                                                <View style={{ width: (width - 40) / 2, alignItems: 'flex-end', marginLeft:'10%' }}>
                                                    <Text style={{ fontSize: 16 }}>Refrence ID: {item.purchaserName}</Text>
                                                </View>
                                            </View>
                                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bill {index + 1}</Text>
                                        </View>
                                        {/* <View style={{ borderBottomColor: '#FF3301', borderBottomWidth: 1 }} />
                                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center' }}>
                                            <Text style={{ color: '#FF3301', fontWeight: 'bold', fontSize: 16, marginRight: 10 }}>Show Details</Text>
                                            <View style={{ justifyContent: 'flex-end', marginBottom: 4 }}>
                                                <FontAwesome name='chevron-down' size={12} color='#FF3301' />
                                            </View>
                                        </View> */}
                                    </View>
                                </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </View>
        );
                    }
                    else if (this.state.User.roles == 'Purchaser') {
                        return (
                            <View>
                                <Header />
                                <View style={{ margin: 10 }}>
                                    <Text style={MainFlowStyles.headerTextStyle}>Notifications</Text>
                
                                    <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <TouchableOpacity
                                            style={MainFlowStyles.tabStyles}
                                            onPress={() => this.setState({ selectedAll: true, selectedApproved: false, selectedRejected: false })}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={[MainFlowStyles.tabTextContainerStyle, { borderBottomColor: this.state.selectedAll ? '#FF3301' : 'transparent', marginLeft: 10 }]}>
                                                    <Text style={[MainFlowStyles.tabTextStyle, { color: this.state.selectedAll ? 'black' : 'grey' }]}>ALL</Text>
                                                </View>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                        </TouchableOpacity>
                
                                        <TouchableOpacity
                                            style={MainFlowStyles.tabStyles}
                                            onPress={() => this.setState({ selectedAll: false, selectedApproved: true, selectedRejected: false })}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{flex: 1}} />
                                                <View style={[MainFlowStyles.tabTextContainerStyle, {borderBottomColor: this.state.selectedApproved ? '#FF3301' : 'transparent'}]}>
                                                    <Text style={[MainFlowStyles.tabTextStyle, { color: this.state.selectedApproved ? 'black' : 'green' }]}>APPROVED</Text>
                                                </View>
                                                <View style={{flex: 1}} />
                                            </View>
                                        </TouchableOpacity>
                
                                        <TouchableOpacity
                                            style={MainFlowStyles.tabStyles}
                                            onPress={() => this.setState({ selectedAll: false, selectedApproved: false, selectedRejected: true })}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }} />
                                                <View style={[MainFlowStyles.tabTextContainerStyle, { borderBottomColor: this.state.selectedRejected ? '#FF3301' : 'transparent', marginRight: 10 }]}>
                                                    <Text style={[MainFlowStyles.tabTextStyle, { color: this.state.selectedRejected ? 'black' : 'red' }]}>REJECTED</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                
                                    <FlatList
                                        style={{ maxHeight: height * 0.75 }}
                                        data={this.state.selectedAll ? this.state.all : this.state.selectedApproved ? this.state.approved : this.state.rejected}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ marginBottom: this.state.selectedAll ? (index === this.state.all.length - 1 ? 20 : 0) : (this.state.selectedApproved ? (index === this.state.approved.length - 1 ? 20 : 0) : (index === this.state.rejected.length - 1 ? 20 : 0)) }}>
                                                    <View style={[MainFlowStyles.cardStyle, { marginBottom: 20, marginHorizontal: 5, marginTop: index === 0 ? 20 : 0, flex: 1, borderColor: item.status == 0 ? 'red' : 'green', borderWidth:2 }]}>
                                                        <View style={{ padding: 10 }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View style={{ flexDirection: 'row', width: (width - 50) / 3 }}>
                                                                    <View>
                                                                        <AntDesign name='calendar' size={20} color='#FF3301' />
                                                                    </View>
                                                                    <Text> {item.date}</Text>
                                                                </View>
                
                                                                {/* <View style={{ width: (width - 50) / 3, alignItems: 'center' }}>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bill {item.bNumber}</Text>
                                                                </View> */}
                
                                                                <View style={{ width: (width - 40) / 2, alignItems: 'flex-end', marginLeft:'10%' }}>
                                                                    <Text style={{ fontSize: 16 }}>Refrence ID: {item.purchaserName}</Text>
                                                                </View>
                                                            </View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bill {index + 1}</Text>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.message}</Text>
                                                        </View>
                                                        {/* <View style={{ borderBottomColor: '#FF3301', borderBottomWidth: 1 }} />
                                                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center' }}>
                                                            <Text style={{ color: '#FF3301', fontWeight: 'bold', fontSize: 16, marginRight: 10 }}>Show Details</Text>
                                                            <View style={{ justifyContent: 'flex-end', marginBottom: 4 }}>
                                                                <FontAwesome name='chevron-down' size={12} color='#FF3301' />
                                                            </View>
                                                        </View> */}
                                                    </View>
                                                </View>
                                            );
                                        }}
                                    />
                                </View>
                            </View>
                        );
                    }
                    else{
                        return (
                            <View>
                                <Header />
                                <View style={{ margin: 10 }}>
                                    <Text style={MainFlowStyles.headerTextStyle}>Notifications</Text>
                
                                    <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <TouchableOpacity
                                            style={MainFlowStyles.tabStyles}
                                            onPress={() => this.setState({ selectedAll: true, selectedApproved: false, selectedRejected: false })}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={[MainFlowStyles.tabTextContainerStyle, { borderBottomColor: this.state.selectedAll ? '#FF3301' : 'transparent', marginLeft: 10 }]}>
                                                    <Text style={[MainFlowStyles.tabTextStyle, { color: this.state.selectedAll ? 'black' : 'grey' }]}>ALL</Text>
                                                </View>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                        </TouchableOpacity>
                
                                        <TouchableOpacity
                                            style={MainFlowStyles.tabStyles}
                                            onPress={() => this.setState({ selectedAll: false, selectedApproved: true, selectedRejected: false })}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{flex: 1}} />
                                                <View style={[MainFlowStyles.tabTextContainerStyle, {borderBottomColor: this.state.selectedApproved ? '#FF3301' : 'transparent'}]}>
                                                    <Text style={[MainFlowStyles.tabTextStyle, { color: this.state.selectedApproved ? 'black' : 'green' }]}>APPROVED</Text>
                                                </View>
                                                <View style={{flex: 1}} />
                                            </View>
                                        </TouchableOpacity>
                
                                        <TouchableOpacity
                                            style={MainFlowStyles.tabStyles}
                                            onPress={() => this.setState({ selectedAll: false, selectedApproved: false, selectedRejected: true })}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }} />
                                                <View style={[MainFlowStyles.tabTextContainerStyle, { borderBottomColor: this.state.selectedRejected ? '#FF3301' : 'transparent', marginRight: 10 }]}>
                                                    <Text style={[MainFlowStyles.tabTextStyle, { color: this.state.selectedRejected ? 'black' : 'red' }]}>REJECTED</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                
                                    <FlatList
                                        style={{ maxHeight: height * 0.75 }}
                                        data={this.state.selectedAll ? this.state.all : this.state.selectedApproved ? this.state.approved : this.state.rejected}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate("NotificationDeta", {project:item.project})} >
                                                <View style={{ marginBottom: this.state.selectedAll ? (index === this.state.all.length - 1 ? 20 : 0) : (this.state.selectedApproved ? (index === this.state.approved.length - 1 ? 20 : 0) : (index === this.state.rejected.length - 1 ? 20 : 0)) }}>
                                                    <View style={[MainFlowStyles.cardStyle, { marginBottom: 20, marginHorizontal: 5, marginTop: index === 0 ? 20 : 0, flex: 1, borderColor: item.status == 0 ? 'red' : 'green', borderWidth:2 }]}>
                                                        <View style={{ padding: 10 }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View style={{ flexDirection: 'row', width: (width - 50) / 3 }}>
                                                                    <View>
                                                                        <AntDesign name='calendar' size={20} color='#FF3301' />
                                                                    </View>
                                                                    <Text> {item.date}</Text>
                                                                </View>
                
                                                                {/* <View style={{ width: (width - 50) / 3, alignItems: 'center' }}>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bill {item.bNumber}</Text>
                                                                </View> */}
                
                                                                <View style={{ width: (width - 40) / 2, alignItems: 'flex-end', marginLeft:'10%' }}>
                                                                    <Text style={{ fontSize: 16 }}>Refrence ID: {item.purchaserName}</Text>
                                                                </View>
                                                            </View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bill {index + 1}</Text>
                                                        </View>
                                                        {/* <View style={{ borderBottomColor: '#FF3301', borderBottomWidth: 1 }} />
                                                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center' }}>
                                                            <Text style={{ color: '#FF3301', fontWeight: 'bold', fontSize: 16, marginRight: 10 }}>Show Details</Text>
                                                            <View style={{ justifyContent: 'flex-end', marginBottom: 4 }}>
                                                                <FontAwesome name='chevron-down' size={12} color='#FF3301' />
                                                            </View>
                                                        </View> */}
                                                    </View>
                                                </View>
                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>
                            </View>
                        );
                    }
    }
}

export default NotificationsNewScreen;
