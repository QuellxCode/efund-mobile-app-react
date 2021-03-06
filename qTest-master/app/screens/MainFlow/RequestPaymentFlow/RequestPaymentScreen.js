import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  ActivityIndicator,
  Constants,
  FlatList,
  Text,
  TouchableO,
  TextInput,
  KeyboardAvoidingView,
  Picker,
  AsyncStorage,
  ScrollView,
  ToastAndroid,
  Dimensions
  
} from 'react-native';
import Header from '../../../components/Header';
import CustomButton from '../../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bill from '../../../components/Bill';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainFlowStyles from '../../../Styles/MainFlowStyles';
import { SERVER_URL } from '../../../utils/config';
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
var n = 0;
var value = 0;
const rs = 0;
const result = 0;
class RequestPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      qty: 0,
      price: 0,
      pkr: 0,
      title: '',
      cat: '',
      orderss: [],
      response_: '',
      project_name: '',
      project_id: '',
      Category: [],
      selectedValue: null,
      selectedProject: '',
      selVal: '',
      selProj: '',
      pkkr: '',
      User: '',
      data: '',
      check: true,
      results: 0,
      val: 0,
      disabledB: true,
      total: 0,
      purchaseID: '',
      proj: '',
      show: false,
      spinner:false,
      allNotification:[]
    };
    this.list = React.createRef();
  }
  async componentDidMount() {
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
    var thisdata = [];
    var arr = [];
    fetch(`${SERVER_URL}/api/project`, {
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
          data: json.project,
          proj: json.project,
          show: true,
        });
        console.log('ffffff', this.state.proj);
        var v = this.state.data.length;
        for (let i = 0; i < v; i++) {
          console.log('v:' + json.project[i].project_name);
          thisdata.push({
            project_name: json.project[i].project_name,
            project_id: json.project[i]._id,
          });
        }
        this.setState({Category: thisdata});
        console.log('aaaaaa' + JSON.stringify(this.state.Category));
      })

      .catch(error => {
        handleError(error, false);
      });
      this.get_notification_length();
     
  }
  showLoader = () => {
    this.setState({spinner: true});
  };
  hideLoader = () => {
    this.setState({spinner: false});
  };
  loadProjects() {
    return this.state.proj.map(proj => (
      <Picker.Item label={proj.project_name} value={proj._id} />
    ));
  }

  handlePress = async () => {
    var aa = this.state.title;
    var ab = this.state.qty;
    var ac = this.state.price;
    var project = this.state.selectedValue;
    var r = this.state.price * this.state.qty;
    var data = {
      // "payment": "50000",
      project: project,
      details: [
        {
          item: aa,
          qty: ab,
          price: ac,
          pkr: r,
        },
      ],
    };
    if (data.details[0].item == '') {
      console.log('nt call a api');
    } else {
      fetch(`${SERVER_URL}/api/purchase/post`, {
        method: 'Post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': this.state.User.token,
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.setState({
            response_: json,
            purchaseID: json.purchaseID,
            disabledB: false,
          });
          console.log('adasda', this.state.purchaseID);
        })
        .catch(error => {
          handleError(error, false);
        });
    }
  };
  
  activate_() {
    if (this.state.bills != []) {
      this.state.disabledB = false;
    }
  }

  onValueChange(value) {
    this.setState({
      selVal: value,
    });
    this.state.selProj = value;
    console.log(this.state.selProj);
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
    const screenHeight = Math.round(Dimensions.get('window').height) / 2;

    if (this.state.show === false) {
      return <ActivityIndicator
          color="red"
          style={{paddingVertical: screenHeight}}
        />
    } else {
      return (
        <View style={{flex: 1}}>
          <Header notificationLength={this.state.allNotification.length > 0 ? this.state.allNotification.length : 0}/>
          {/* <Header /> */}
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              alignSelf: 'center',
              color: '#FF3301',
            }}>
            Request Payment
          </Text>
          <View
            style={{
              borderColor: '#FF3301',
              borderWidth: 1,
              width: 250,
              height: 50,
              borderRadius: 30,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            {/* <Picker
                        selectedValue={this.state.selectedValue}
                        prompt="Select Project"
                        style={{
                            width: 600, height: 50,
                            alignSelf: 'center',
                            alignContent:"center",
                            justifyContent:'center',
                            marginTop: 1,
                            borderWidth: 2,
                            color: '#FF3301',
                            borderColor: 'red',
                            fontSize: 30
                        }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ selectedValue: itemValue })
                            this.setState({selectedProject: itemValue});
                            console.log("selected:val" + this.state.selectedValue)

                        }}
                    >
                        {PickerItems}
                    </Picker> */}

            <Picker
              selectedValue={this.state.selVal}
              // onValueChange={(itemValue, itemIndex) =>
              //     this.setState({selectedBank: itemValue})}>
              onValueChange={this.onValueChange.bind(this)}>
              <Picker.Item label="Select a Project" value="" />
              {this.loadProjects()}
            </Picker>
          </View>
          {/* {this.state.bills.map((item, index) => ( */}
          {/* ))}    */}
          <View
            style={[
              MainFlowStyles.cardStyle,
              {
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
                marginHorizontal: 25,
                marginTop: 10,
              },
            ]}>
            <Text
              style={{fontWeight: 'bold', fontSize: 12, alignSelf: 'center'}}>
              Add Item
            </Text>
            <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
              <TextInput
                style={{fontSize: 16, width:50}}
                placeholder="Item"
                onChangeText={title => this.setState({title})}
                ref={ref => (this.ref = ref)}
                value={this.state.title}
              />
              <View style={{marginBottom: 2}} />
            </View>
            <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
              <TextInput
                style={{fontSize: 16,  width:40}}
                placeholder="Qty"
                keyboardType={'numeric'}
                onChangeText={qty =>
                  this.setState({
                    qty,
                    results: this.state.price * this.state.qty,
                  })
                }
                ref={ref => (this.ref = ref)}
                value={this.state.qty}
              />
              <View style={{marginBottom: 2}} />
            </View>
            <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
              <TextInput
                style={{fontSize: 16, width:50}}
                placeholder="Rate"
                keyboardType={'numeric'}
                onChangeText={price => this.setState({price})}
                ref={ref => (this.ref = ref)}
                value={this.state.price}
              />
              <View style={{marginBottom: 2}} />
            </View>
            <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
              <TextInput
                style={{fontSize: 16, width:50}}
                placeholder="Total"
                keyboardType={'numeric'}
                defaultValue="Total"
                //onChangeText={(qty) => this.setState({ qty, results: this.state.price * this.state.qty })}
                ref={ref => (this.ref = ref)}
                //value={this.state.results}
                editable={false}
              />
              {/* <Text style={{ fontSize: 16 }}>
                            
                         </Text> */}
              {/* <TextInput style={{ fontSize: 16 }}
                            // placeholder='qty'
                            // keyboardType={'numeric'}
                            // onChangeText={(qty) => this.setState({ qty, results: this.state.price * this.state.qty })}
                            ref={ref => this.ref = ref}
                            value={this.state.result}

                        ></TextInput> */}
              <View style={{marginBottom: 2}} />
            </View>
          </View>
          <View style={{flex: 1, marginHorizontal: 20, marginTop: 5}}>
            {/* <FlatList
                        ref={this.list}
                        style={{ flexGrow: 0 }}
                        data={this.state.bills}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => this.list.current.scrollToEnd({ 'animated': false })}
                        //renderItem={({ item }) => <Bill item={item} />}
                        renderItem={this.render_1}
                    /> */}
            <ScrollView>
              {this.state.bills.map((item, index) => (
                <View
                  style={[
                    MainFlowStyles.cardStyle,
                    {
                      padding: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginBottom: 20,
                      marginHorizontal: 5,
                    },
                  ]}>
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    {item.number}
                  </Text>
                  <View
                    style={{
                      borderBottomColor: '#FFCBBE',
                      borderBottomWidth: 1,
                    }}>
                    {/* <TextInput style={{ fontSize: 16 }}
                                    placeholder='Item'
                                    // onChangeText={(title) => this.setState({ title })}
                                    // ref={ref => this.ref = ref}
                                ></TextInput> */}
                    <Text>{item.item}</Text>
                    <View style={{marginBottom: 2}} />
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#FFCBBE',
                      borderBottomWidth: 1,
                    }}>
                    {/* <TextInput style={{ fontSize: 16 }}
                                    placeholder='price'
                                    keyboardType={'numeric'}
                                    onChangeText={(price) => this.setState({ price })}
                                    ref={ref => this.ref = ref}
            
                                ></TextInput> */}
                    <Text>{item.qty}</Text>

                    <View style={{marginBottom: 2}} />
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#FFCBBE',
                      borderBottomWidth: 1,
                    }}>
                    {/* <TextInput style={{ fontSize: 16 }}
                                    placeholder='qty'
                                    keyboardType={'numeric'}
                                    onChangeText={(qty) => this.setState({ qty })}
                                    ref={ref => this.ref = ref}
            
                                ></TextInput> */}
                    <Text>{item.price}</Text>

                    <View style={{marginBottom: 2}} />
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#FFCBBE',
                      borderBottomWidth: 1,
                    }}>
                    {/* <Text style={{ fontSize: 16 }}
                                   ref={ref => this.ref = ref}
                                >
                                  {this.state.qty * this.state.price}
            
                                </Text> */}
                    {/* <TextInput style={{ fontSize: 16 }}
                                    // placeholder='qty'
                                    // keyboardType={'numeric'}
                                    // onChangeText={(qty) => this.setState({ qty })}
                                     ref={ref => this.ref = ref}
                                    // value={this.state.price * this.state.qty}
                                    value={this.state.results}
                                ></TextInput> */}
                    <Text>{item.pkr}</Text>

                    <View style={{marginBottom: 2}} />
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Total: {this.state.total}</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {/* <Text>"Total ", {this.state.total}</Text> */}

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  alignContent: 'center',
                  backgroundColor: '#FF3301',
                  height: 40,
                  width: 100,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  if (
                    this.state.item == '' ||
                    this.state.price == 0 ||
                    this.state.qty == 0
                  ) {
                    console.log('empty');
                    ToastAndroid.show('Add an Item', ToastAndroid.SHORT);
                  } 
                  else if (
                    this.state.selProj == ''
                  ) {
                    console.log('empty');
                    ToastAndroid.show('Add a Project First', ToastAndroid.SHORT);
                  }
                  else {
                    let b = this.state.bills;
                    var aa = this.state.title;
                    var ab = this.state.qty;
                    var ac = this.state.price;
                    var ae = this.state.pkr;
                    var result = ac * ab;
                    var totall =
                      this.state.total + this.state.qty * this.state.price;
                    this.setState({
                      val: result,
                      total: totall,
                    });
                    // this.handlePress();
                    n = n + 1;
                    b.push({item: aa, price: ac, qty: ab, pkr: result});
                    this.setState({bills: b, title: '', qty: '', price: ''});
                    this.activate_();
                    console.log(
                      'arr from button',
                      this.state.bills,
                      this.state.qty,
                      this.state.price,
                      this.state.total,
                    );
                  }
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#FFF',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  Add New
                </Text>

                {/* <AntDesign name='pluscircle' size={20} color='#FF3301' /> */}
              </TouchableOpacity>

              {/*                         
                        <Text>Total: {this.state.total}</Text>
                         */}
            </View>
          </View>

          <View style={{marginHorizontal: 15, marginBottom: 20, marginTop: 10}}>
            {/* <CustomButton
                        text='Generate Bill'
                        routeName='GenerateBill'
                        data={this.state.bills}
                        data1={this.state.selectedValue}
                    /> */}
            <TouchableOpacity
              style={{
                backgroundColor: '#FF3301',
                padding: 14,
                borderRadius: 10,
              }}
              disabled={this.state.disabledB}
              onPress={() => {
                // if (this.state.check == true) {
                //     // let b = this.state.bills;
                //     // var aa = this.state.title;
                //     // var ab = this.state.qty;
                //     // var ac = this.state.price;
                //     // var ae = this.state.pkr;
                //     // var result = ac * ab
                //     // b.push({ title: aa, price: ac, qty: ab, pkr: result });
                //     //  this.setState({ bills: b, check: false })
                //      this.handlePress();
                //     this.props.navigation.navigate('', {
                //         bill: this.state.bills,
                //         project: this.state.selectedValue
                //     })
                //     this.setState({bill: ''})
                // }
                // else {
                this.props.navigation.navigate('GenerateBill', {
                  bill: this.state.bills,
                  project: this.state.selProj,
                  total: this.state.total,
                  purchase: this.state.purchaseID,
                });
                this.setState({bill: ''});

                // }
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#FFF',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                Generate Bill
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
export default RequestPayment;
