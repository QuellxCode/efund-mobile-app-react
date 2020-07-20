import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  AsyncStorage,
  Picker,
  UIManager,
  LayoutAnimation,
  Platform,
  StyleSheet,
} from 'react-native';
import Timeline from '../../components/Timeline';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import moment from 'react-moment';
import ExpanableList from 'react-native-expandable-section-flatlist';
import { SERVER_URL } from '../../utils/config';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

const handleError = (error, isFatal) => {
  // fetch
  console.log(error, isFatal);
  // alert(error.name);
  // alert('Something went wrong!');
};

setJSExceptionHandler((error, isFatal) => {
  console.log('caught global error');
  handleError(error, isFatal);
}, true);
const {width, height} = Dimensions.get('window');

class ReportsScreen extends Component {
  constructor(props) {
    super(props);
    // if( Platform.OS === 'android' )
    //     {

    //       UIManager.setLayoutAnimationEnabledExperimental(true);

    //     }
    this.state = {
      selectedDaily: true,
      selectedWeekly: false,
      selectedMonthly: false,
      date: '',
      today: new Date(),
      next: '',
      nextdate: '',
      details: '',
      disabled: true,
      User: [],
      daily: [],
      weekly: [],
      monthly: [],
      allNotification:[],
      weeklyBills: [
        {date: 'Jan 01, 2020', bNumber: '01', status: 'Pending'},
        {date: 'Jan 01, 2020', bNumber: '02', status: 'Rejected'},
      ],
      data: [
        {id: 1, name: 'Purchaser', select: true},
        {id: 2, name: 'Manager', select: false},
        {id: 3, name: 'Director', select: true},
        {id: 4, name: 'Accountant', select: true},
      ],
      // textLayoutHeight: 0,
      //      updatedHeight: 0,
      //      expand: false,
      buttonText: 'Show Details',
      viewdata: '',
      show: false,
    };
  }

  // expand_collapse_Function =()=>
  // {
  //     LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

  //     if( this.state.expand == false )
  //     {
  //         this.setState({
  //           updatedHeight: this.state.textLayoutHeight,
  //           expand: true,
  //           buttonText: 'Hide Details'
  //         });
  //     }
  //     else
  //     {
  //         this.setState({
  //           updatedHeight: 0,
  //           expand: false,
  //           buttonText: 'Show Details'
  //         });
  //     }
  // }

  // getHeight(height)
  // {
  //     this.setState({ textLayoutHeight: height });
  // }

  async componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    // that.setState({
    //   //  today: year + '-' + 0 + month + '-' + date,
    //    today: new Date()
    // });
    console.log('date', this.state.today)
    try {
      const value = await AsyncStorage.getItem('User');
      const val = JSON.parse(value);
      if (val !== null) {
        this.setState({
          User: val,
        });
      }
    } catch (error) {
      console.log('error getting data');
    }
    //console.log('dates', this.state.today);
    this.daily();
    this.weekly();
     this.get_notification_length();
    // this.monthly();
  }
  daily() {
    var thisarr = [];
    console.log('daily date', this.state.today)
    fetch(`${SERVER_URL}/api/reports/daily`, {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
      body: JSON.stringify({
        sDate: this.state.today,
      }),
    })
      .then(response => response.json())
      .then(json => {
        this.setState({daily: json.report});
        console.log('daily', this.state.daily);
        console.log('daily json', json);
        //console.log('daily life', this.state.daily);
        // for (let i = 0; i < this.state.daily.length; i++) {
        //   thisarr.push({
        //     item: json.report[i].details,
        //   });
        // }
        // this.setState({details: thisarr});
        // console.log('details', JSON.stringify(this.state.details));
        // console.log('details', this.state.details.length);
      })
      .catch(error => {
        handleError(error, false);
      });
  }
  weekly(date1) {
    this.setState({nextdate: date1});
    console.log('first', this.state.date);
    console.log('next', this.state.nextdate);
    fetch(`${SERVER_URL}/api/reports/weekly`, {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
      body: JSON.stringify({
        sDate: this.state.date,
        eDate: this.state.nextdate,
      }),
    })
      .then(response => response.json())
      .then(json => {
        this.setState({weekly: json.report});
        console.log('weeksss', this.state.weekly);
      })
      .catch(error => {
        handleError(error, false);
      });
  }
  monthly() {
    fetch(`${SERVER_URL}/api/reports/monthly`, {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({monthly: json.report});
        console.log('monthly', this.state.monthly);
      })
      .catch(error => {
        handleError(error, false);
      });
  }
  addDays(date) {
    var datee = new Date(date);
    datee.setDate(datee.getDate() + 7);
    console.log('datedyy', datee);
    this.setState({next: datee});
  }
  split(date) {
    var sp = date;
    var spq = sp.split('T');
    var spqw = spq[0];
    //console.log(spqw)
    var sqwww = spqw.split('-');
    var qwert = sqwww[2] + '-' + sqwww[1] + '-' + sqwww[0];
    return qwert;
  }
  details(item) {
    console.log('fuc', JSON.parse(item));
  }


  get_notification_length() {
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
        this.setState({allNotification: json.notification})
      
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        {/* <Header/> */}
        <Header notificationLength={this.state.allNotification.length > 0 ? this.state.allNotification.length : 0 }/>
        <View style={{margin: 10}}>
          <Text style={MainFlowStyles.headerTextStyle}>Reports</Text>
          <TouchableOpacity style={{flexDirection: 'row', marginBottom: 10, marginHorizontal:'20%'}}>
            <TouchableOpacity
              style={MainFlowStyles.tabStyles}
              onPress={() =>
                this.setState({
                  selectedDaily: true,
                  selectedWeekly: false,
                  // selectedMonthly: false,
                })
              }>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={[
                    MainFlowStyles.tabTextContainerStyle,
                    {
                      borderBottomColor: this.state.selectedDaily
                        ? '#FF3301'
                        : 'transparent',
                      marginLeft: 10,
                    },
                  ]}>
                  <Text
                    style={[
                      MainFlowStyles.tabTextStyle,
                      {color: this.state.selectedDaily ? 'black' : 'grey'},
                    ]}>
                    Daily
                  </Text>
                </View>
                <View style={{flex: 1}} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={MainFlowStyles.tabStyles}
              onPress={() =>
                this.setState({
                  selectedDaily: false,
                  selectedWeekly: true,
                  // selectedMonthly: false,
                })
              }>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}} />
                <View
                  style={[
                    MainFlowStyles.tabTextContainerStyle,
                    {
                      borderBottomColor: this.state.selectedWeekly
                        ? '#FF3301'
                        : 'transparent',
                    },
                  ]}>
                  <Text
                    style={[
                      MainFlowStyles.tabTextStyle,
                      {color: this.state.selectedWeekly ? 'black' : 'grey'},
                    ]}>
                    By Dates
                  </Text>
                </View>
                <View style={{flex: 1}} />
              </View>
            </TouchableOpacity>
            
          </TouchableOpacity>
          {/* {this.state.daily.map((item, index) => {})} */}
          <View>
            {this.state.selectedWeekly == true && (
              <View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text
                    style={{
                      color: '#FF3301',
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginTop: 10,
                      marginRight: 5,
                    }}>
                    First Date
                  </Text>
                  <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder={this.state.date}
                    format="YYYY-MM-DD"
                    // minDate="2016-05-01"
                    // maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={date => {
                      this.setState({date: date, disabled: false});
                      //console.log('date', this.state.date);
                      this.addDays(this.state.date);
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: '#FF3301',
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginTop: 10,
                      marginRight: 5,
                    }}>
                    Last Date
                  </Text>
                  <DatePicker
                    style={{width: 200}}
                    date={this.state.nextdate}
                    mode="date"
                    disabled={this.state.disabled}
                    placeholder={this.state.nextdate}
                    format="YYYY-MM-DD"
                    minDate={this.state.date}
                    maxDate={this.state.next}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                    }}
                    onDateChange={date => {
                      this.weekly(date);
                      // this.setState({nextdate: date});
                    }}
                  />
                </View>
                {/* <View style={{flexDirection: 'row', justifyContent: 'center',alignContent:"center",alignItems:"center"}}>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'center',
                      alignContent: 'center',
                      backgroundColor: '#FF3301',
                      height: 40,
                      width: 100,
                      marginTop:10,
                      borderRadius: 20,
                      justifyContent: 'center',
                    }}
                    onPress={() => {this.weekly()}}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#FFF',
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}>
                      Check Details
                    </Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            )}
          </View>
          <FlatList
            style={{maxHeight: height * 0.75}}
            data={
              (this.state.details,
              this.state.selectedDaily
                ? this.state.daily
                : this.state.selectedWeekly
                ? this.state.weekly
                : this.state.monthly)
            }
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              console.log('item from report', item._id);

              return (
                <View
                  style={{
                    marginBottom: this.state.selectedDaily
                      ? index === this.state.daily.length - 1
                        ? 20
                        : 0
                      // : this.state.selectedWeekly
                      : index === this.state.weeklyBills.length - 1
                        ? 20
                        : 0
                      // : index === this.state.monthly.length - 1
                      // ? 20
                      // : 0,
                  }}>
                  <View
                    style={[
                      MainFlowStyles.cardStyle,
                      {
                        marginBottom: 20,
                        marginHorizontal: 5,
                        marginTop: index === 0 ? 20 : 0,
                        flex: 1,
                      },
                    ]}>
                    <View style={{padding: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: (width - 50) / 3,
                          }}>
                          <View>
                            <AntDesign
                              name="calendar"
                              size={20}
                              color="#FF3301"
                            />
                          </View>
                          <Text> {this.split(item.date)}</Text>
                        </View>
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            width: (width - 50) / 3,
                          }}>
                          <View />
                        </View> */}

                        <View
                          style={{
                            width: (width - 50) / 3,
                            alignItems: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 16}}>
                            Bill {index + 1}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: (width - 50) / 3,
                            alignItems: 'flex-end',
                          }}>
                          {/* <Text
                            style={{
                              color:
                                item.payment_status === 'Approved'
                                  ? '#26FF26'
                                  : item.payment_status === 'Rejected'
                                  ? 'red'
                                  : 'grey',
                              fontSize: 14,
                            }}>
                            {item.payment_status}
                          </Text> */}
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#FF3301',
                        borderBottomWidth: 1,
                      }}
                    />

                    {/* {Timeline} */}

                    <View
                      style={[
                        MainFlowStyles.cardStyle,
                        {paddingBottom: 10, marginBottom: 20},
                      ]}>
                      {/* <View style={styles.currentStatusContainer}>
                        <Text style={styles.currentStatusTextStyle}>
                          Current Status:{item.notify_status}
                        </Text>
                      </View> */}
                      <View style={{padding: 10, alignItems: 'center'}}>
                        <View style={{width: 70}}>
                          <View
                            style={{
                              height: 40,
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                width: 14,
                                height: 14,
                                borderRadius: 14 / 2,
                                backgroundColor:item.notify_status > 0 || item.notify_status == 0  ? '#FF3301' : 'gray',
                                // backgroundColor:
                                //   // item.notify_status === '1'||item.notify_status === '2'||item.notify_status === '3'
                                //   item.notify_status > '0' ? '#FF3301' : 'gray',
                              }}
                            />
                            <View
                              style={{
                                width: 45,
                                borderBottomColor: '#FF3301',
                                borderBottomWidth: 1,
                              }}
                            />
                            <View
                              style={{
                                width: 14,
                                height: 14,
                                borderRadius: 14 / 2,
                                backgroundColor:item.notify_status > 1 || item.notify_status == 1  ? '#FF3301' : 'gray',
                               //  item.notify_status === '0'||item.notify_status === '3'||item.notify_status === '2'
                                      
                                    
                                // : item.notify_status === '1'
                                // ? '#FF3301'
                                // : item.notify_status === '2'
                                // ? '#FF3301'
                                // : 'green',
                              }}
                            />
                            <View
                              style={{
                                width: 45,
                                borderBottomColor: '#FF3301',
                                borderBottomWidth: 1,
                              }}
                            />
                            <View
                              style={{
                                width: 14,
                                height: 14,
                                borderRadius: 14 / 2,
                                backgroundColor:item.notify_status > 2 || item.notify_status == 2  ? '#FF3301' : 'gray',
                                // backgroundColor:
                                //   // item.notify_status === '3'||item.notify_status === '1'||item.notify_status === '0'
                                //   // item.notify_status > '0'&&  item.notify_status > '1'&&  item.notify_status > '2'
                                //   item.notify_status > '2' ? '#FF3301' : 'gray',
                              }}
                            />
                            <View
                              style={{
                                width: 45,
                                borderBottomColor: '#FF3301',
                                borderBottomWidth: 1,
                              }}
                            />
                            <View
                              style={{
                                width: 14,
                                height: 14,
                                borderRadius: 14 / 2,
                                backgroundColor:item.notify_status > 3 || item.notify_status == 3  ? '#FF3301' : 'gray',
                                // backgroundColor:
                                //   // item.notify_status === '2'||item.notify_status === '1'||item.notify_status === '0'
                                //   //item.notify_status > '0'&&  item.notify_status > '1'&&  item.notify_status > '2'&&  item.notify_status > '3'
                                //   item.notify_status > '3' ? '#FF3301' : 'gray',
                              }}
                            />
                          </View>
                          {/* )} */}
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}>
                            <Text style={{fontSize: 12}}>Purchaser</Text>
                            <Text style={{marginLeft: 7, fontSize: 12}}>
                              Supervisor
                            </Text>
                            <Text style={{marginLeft: 7, fontSize: 12}}>
                              Director
                            </Text>
                            <Text style={{marginLeft: 7, fontSize: 12}}>
                              Accountant
                            </Text>
                          </View>
                        </View>
                        {/* <Timeline data={this.state.data} /> */}
                        {/* <FlatList
                          data={this.state.data}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item, index}) => {
                            return (
                              <View style={{width: 70}}>
                                <View
                                  style={{
                                    height: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                  }}>
                                  {index !== 0 ? (
                                    <View
                                      style={{
                                        width: 30,
                                        borderBottomColor: '#FF3301',
                                        borderBottomWidth: 1,
                                      }}
                                    />
                                  ) : (
                                    <View style={{width: 30}} />
                                  )}
                                  
                                  <View
                                    style={{
                                      width: 14,
                                      height: 14,
                                      borderRadius: 14 / 2,
                                      backgroundColor: item.select
                                        ? '#FF3301'
                                        : '#FFC1B2',
                                    }}
                                  />
                                  
                                  {index !== this.state.data.length - 1 ? (
                                    <View
                                      style={{
                                        width: 30,
                                        borderBottomColor: '#FF3301',
                                        borderBottomWidth: 1,
                                      }}
                                    />
                                  ) : (
                                    <View style={{width: 30}} />
                                  )}
                                </View>
                                <View
                                  style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Text style={{fontSize: 12}}>
                                    {item.name}
                                  </Text>
                               <Text>nhjj</Text>
                                </View>
                              </View>
                            );
                          }}
                        /> */}
                      </View>
                    </View>

                    <View
                      style={{
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            viewdata: item._id,
                            show: !this.state.show,
                          })
                        }>
                        <Text
                          style={{
                            color: '#FF3301',
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginRight: 10,
                          }}>
                          {this.state.viewdata === item._id &&
                          this.state.show == true
                            ? 'Hide Details'
                            : 'Show Details'}
                        </Text>
                        {/* <View style={{ justifyContent: 'flex-end', marginBottom: 4 }}>
                                                <FontAwesome name='chevron-down' size={12} color='#FF3301' />
                                            </View> */}
                      </TouchableOpacity>
                    </View>
                    {/* <View style = {{ height: this.state.updatedHeight, overflow: 'hidden' }}>
                      <View onLayout = {( value ) => this.getHeight( value.nativeEvent.layout.height )}> */}
                    {/* <View style={{ flexDirection: 'row', borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}> */}
                    {this.state.viewdata === item._id &&
                      this.state.show == true && (
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              paddingBottom: 20,
                              marginTop: 20,
                              borderBottomColor: '#FFC1B2',
                              borderBottomWidth: 1,
                            }}>
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
                            data={item.details}
                            keyExtractor={item => item.number}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => {
                              return (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    paddingBottom: 20,
                                    marginTop: 20,
                                    borderBottomColor: '#FFC1B2',
                                    borderBottomWidth: 1,
                                  }}>
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
                                    <Text>{item.pkr}</Text>
                                  </View>
                                </View>
                              );
                            }}
                          />
                        </View>
                      )}
                    {/* </View> */}
                    {/* </View>
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
}

export default ReportsScreen;

// import React, { Component } from 'react';
// import { View, Text, Dimensions } from 'react-native';
// import { Card } from 'react-native-elements';

// const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

// export default class ReportsScreen extends Component {
// render(){
//     return(
//         <View style={{}}>
//             <Card>
//             <Text>COMING SOON</Text>
//             <Text>WORK UNDER DEVELOPMENT</Text>
//             </Card>
//         </View>
//     )
// }
// }
const styles = StyleSheet.create({
  welcomeTextStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  currentStatusContainer: {
    borderBottomColor: '#FF3301',
    borderBottomWidth: 1,
    padding: 10,
  },
  currentStatusTextStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});
