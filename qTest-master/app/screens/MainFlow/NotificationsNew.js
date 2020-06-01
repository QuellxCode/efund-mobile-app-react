import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, AsyncStorage, Alert } from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SERVER_URL } from '../../utils/config';
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
            fetch(`${SERVER_URL}/api/notification`, {
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
                // console.log("aabe",json.notification[3].message[0].pkr)
                console.log("ALL DATA", this.state.all)
                //console.log("dasdatsd", this.state.all.length)
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
                if(this.state.all[i].status == 2){
                    this.state.rejected.push(this.state.all[i])
                }
                else if(this.state.all[i].status == 1 || this.state.all[i].status == 3 ){
                    this.state.approved.push(this.state.all[i])
                }
            }
            console.log("rejs", this.state.rejected)
            console.log("asasd", this.state.approved)
          }

          director_accept(item) {
            console.log('dddd', item);
            fetch(`${SERVER_URL}/api/purchase/director-accept`, {
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
            fetch(`${SERVER_URL}/api/notification/` + id, {
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
            fetch(`${SERVER_URL}/api/purchase/accept-notification`, {
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
            fetch(`${SERVER_URL}/api/purchase/reject-notification`, {
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

          split(date){
              var sp = date;
              var spq = sp.split('T')
              var spqw = spq[0]
              // console.log(spqw)
    var sqwww = spqw.split('-');
    // console.log(sqwww)
     var qwert = sqwww[2]+'-'+sqwww[1]+'-'+sqwww[0];
     return qwert;
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
                        renderItem={({ item, index }) => item.type !== 'final' && 
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("NotificationDeta", {project:item.project, allData:item, purchase: item.request, stat: item.payment, notistat: item.notification_status})} >
                                <View style={{ marginBottom: this.state.selectedAll ? (index === this.state.all.length - 1 ? 20 : 0) : (this.state.selectedApproved ? (index === this.state.approved.length - 1 ? 20 : 0) : (index === this.state.rejected.length - 1 ? 20 : 0)) }}>
                                    <View style={[MainFlowStyles.cardStyle, { marginBottom: 20, marginHorizontal: 5, marginTop: index === 0 ? 20 : 0, flex: 1, borderColor: item.payment == "Rejected" ? 'red' : item.payment == "Approved" ? 'green': 'grey', borderWidth:2 }]}>
                                        <View style={{ padding: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'row', width: (width - 50) / 3 }}>
                                                    <View>
                                                        <AntDesign name='calendar' size={20} color='#FF3301' />
                                                    </View>
                                                    <Text> {this.split(item.date)}</Text>
                                                </View>

                                             
                                                <View style={{ width: (width - 40) / 2, alignItems: 'flex-end', marginLeft:'10%' }}>
                                                    <Text style={{ fontSize: 16 }}>Refrence ID: {item.purchaserName}</Text>
                                                </View>
                                            </View>
                                            <View style={{paddingTop:5}}/>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'row', width: (width - 50) / 3 }}>
                                                   
                                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bill {index + 1}</Text>

                                                </View>

                                                <View style={{ width: (width - 40) / 2, alignItems: 'flex-end', marginLeft:'10%' }}>
                                                    <Text style={{ fontSize: 14 }}>{item.notification_status}</Text>
                                         
                                                </View>
                                            </View>
                                        </View>
                                      </View>
                                </View>
                                </TouchableOpacity>
                          }
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
                                        renderItem={({ item, index }) => item.type !== 'final' && 
                                            <TouchableOpacity onPress={() => item.status == 5 ? Alert.alert('Amount Add to Wallet'): this.props.navigation.navigate("EditRequestPaymentScreen", {project:item.project, allData:item, purchase: item.request, stat: item.payment})} >
                                                <View style={{ marginBottom: this.state.selectedAll ? (index === this.state.all.length - 1 ? 20 : 0) : (this.state.selectedApproved ? (index === this.state.approved.length - 1 ? 20 : 0) : (index === this.state.rejected.length - 1 ? 20 : 0)) }}>
                                                    <View style={[MainFlowStyles.cardStyle, { marginBottom: 20, marginHorizontal: 5, marginTop: index === 0 ? 20 : 0, flex: 1, borderColor: item.payment == "Rejected" ? 'red' : item.payment == "Approved" ? 'green': 'grey', borderWidth:2 }]}>
                                                        <View style={{ padding: 10 }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View style={{ flexDirection: 'row', width: (width - 50) / 3 }}>
                                                                    <View>
                                                                        <AntDesign name='calendar' size={20} color='#FF3301' />
                                                                    </View>
                                                                    <Text> {this.split(item.date)} </Text>
                                                                </View>
                
                                                               
                                                                <View style={{ width: (width - 40) / 2, alignItems: 'flex-end', marginLeft:'10%' }}>
                                                                    <Text style={{ fontSize: 16 }}>Refrence ID: {item.purchaserName}</Text>
                                                                </View>
                                                            </View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bill {index + 1}</Text>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}> {item.status == 0 ? "Request sent for approval. Please wait!": 
                                                            item.status == 1 ? "Your request has accepted by Supervisor.": item.status == 2 ? item.message : item.status == 3 ? "Your request has accepted by Director." : item.status == 5 ? item.message : '' }</Text>
                                                           
                                                        </View>
                                                                                                           </View>
                                                </View>
                                      </TouchableOpacity>
                        }
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
                                                
                                                 <TouchableOpacity onPress={() => this.props.navigation.navigate( item.type === 'final' ? "DirectorNotification" : "NotificationDeta" , {project:item.project, allData:item, purchase: item.request, stat: item.payment, notistat: item.notification_status})} >
                                               
                                                <View style={{ marginBottom: this.state.selectedAll ? (index === this.state.all.length - 1 ? 20 : 0) : (this.state.selectedApproved ? (index === this.state.approved.length - 1 ? 20 : 0) : (index === this.state.rejected.length - 1 ? 20 : 0)) }}>
                                                    <View style={[MainFlowStyles.cardStyle, { marginBottom: 20, marginHorizontal: 5, marginTop: index === 0 ? 20 : 0, flex: 1, borderColor: item.payment == "Rejected" ? 'red' : item.payment == "Approved" ? 'green': 'grey', borderWidth:2 }]}>
                                                        <View style={{ padding: 10 }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View style={{ flexDirection: 'row', width: (width - 50) / 3 }}>
                                                                    <View>
                                                                        <AntDesign name='calendar' size={20} color='#FF3301' />
                                                                    </View>
                                                                    <Text> {this.split(item.date)} </Text>
                                                                </View>
                
                                                               
                                                                <View style={{ width: (width - 40) / 2, alignItems: 'flex-end', marginLeft:'10%' }}>
                                                                    <Text style={{ fontSize: 16 }}>Refrence ID: {item.purchaserName}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{paddingTop:5}}/>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'row', width: (width - 50) / 3 }}>
                                                   
                                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bill {index + 1}</Text>
                                                </View>

                                                <View style={{ width: (width - 40) / 2, alignItems: 'flex-end', marginLeft:'10%' }}>
                                                    <Text style={{ fontSize: 14 }}>{item.notification_status}</Text>
                                                </View>
                                            </View>
                                                        </View>
                                                       
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
