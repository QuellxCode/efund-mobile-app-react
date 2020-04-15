import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  AsyncStorage,
  Picker,
} from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import moment from 'react-moment';
const {width, height} = Dimensions.get('window');

class ReportsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDaily: true,
      selectedWeekly: false,
      selectedMonthly: false,
      date: '',
      today: '',
      next: '',
      nextdate: '',
      details: '',
      disabled: true,
      User: [],
      daily: [],
      weekly: [],
      monthly: [],
      weeklyBills: [
        {date: 'Jan 01, 2020', bNumber: '01', status: 'Pending'},
        {date: 'Jan 01, 2020', bNumber: '02', status: 'Rejected'},
      ],
    };
  }
  async componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    that.setState({
      today: year + '-' + 0 + month + '-' + date,
    });
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
    //this.weekly();
    this.monthly();
  }
  daily() {
    var thisarr = [];
    fetch('http://efundapp.herokuapp.com/api/reports/daily', {
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
        console.error(error);
      });
  }
  weekly(date1) {
    this.setState({nextdate:date1})
    console.log("first",this.state.date)
    console.log("next",this.state.nextdate)
    fetch('http://efundapp.herokuapp.com/api/reports/weekly', {
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
        console.log('week', this.state.weekly);
      })
      .catch(error => {
        console.error(error);
      });
  }
  monthly() {
    fetch('http://efundapp.herokuapp.com/api/reports/monthly', {
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
        console.error(error);
      });
  }
  addDays(date) {
    var datee = new Date(date);
    datee.setDate(datee.getDate() + 7);
    console.log('datedyy', datee);
    this.setState({next: datee});
  }
split(date){
              var sp = date;
              var spq = sp.split('T')
              var spqw = spq[0]
              return spqw
          }
  render() {
    return (
      <View>
        <Header />
        <View style={{margin: 10}}>
          <Text style={MainFlowStyles.headerTextStyle}>Reports</Text>
          <TouchableOpacity style={{flexDirection: 'row', marginBottom: 10}}>
            <TouchableOpacity
              style={MainFlowStyles.tabStyles}
              onPress={() =>
                this.setState({
                  selectedDaily: true,
                  selectedWeekly: false,
                  selectedMonthly: false,
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
                  selectedMonthly: false,
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
                    Weekly
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
                  selectedWeekly: false,
                  selectedMonthly: true,
                })
              }>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}} />
                <View
                  style={[
                    MainFlowStyles.tabTextContainerStyle,
                    {
                      borderBottomColor: this.state.selectedMonthly
                        ? '#FF3301'
                        : 'transparent',
                      marginRight: 10,
                    },
                  ]}>
                  <Text
                    style={[
                      MainFlowStyles.tabTextStyle,
                      {color: this.state.selectedMonthly ? 'black' : 'grey'},
                    ]}>
                    Monthly
                  </Text>
                </View>
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
                          marginTop:10,
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
                 <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:10}}>
                  <Text
                        style={{
                          color: '#FF3301',
                          fontWeight: 'bold',
                          fontSize: 16,
                          marginTop:10,
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
                    this.weekly(date)
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
              return (
                <View
                  style={{
                    marginBottom: this.state.selectedDaily
                      ? index === this.state.daily.length - 1
                        ? 20
                        : 0
                      : this.state.selectedWeekly
                      ? index === this.state.weeklyBills.length - 1
                        ? 20
                        : 0
                      : index === this.state.monthly.length - 1
                      ? 20
                      : 0,
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
                        <View
                          style={{
                            flexDirection: 'row',
                            width: (width - 50) / 3,
                          }}>
                          <View />
                        </View>

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
                          <Text
                            style={{
                              color:
                                item.payment_status === 'Pending'
                                  ? '#26FF26'
                                  : item.status === 'Rejected'
                                  ? 'red'
                                  : 'grey',
                              fontSize: 14,
                            }}>
                            {item.payment_status}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#FF3301',
                        borderBottomWidth: 1,
                      }}
                    />
                    <View
                      style={{
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#FF3301',
                          fontWeight: 'bold',
                          fontSize: 16,
                          marginRight: 10,
                        }}>
                        show Details
                      </Text>
                    </View>
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
                     data={item.details}
                     keyExtractor={(item) => item.number}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return(
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
                    <Text>{item.pkr}</Text>
                </View>
            </View>
              );
            }}
                    />
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
