import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Button,
  Constants,
  Modal,
  FlatList,
  Text,
  TouchableO,
  TextInput,
  KeyboardAvoidingView,
  Picker,
  AsyncStorage,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import Header from '../../../components/Header';
import MainFlowStyles from '../../../Styles/MainFlowStyles';
import {SERVER_URL} from '../../../utils/config';
var n = 0;
var value = 0;
const rs = 0;
const result = 0;
const {width, height} = Dimensions.get('window');
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

const handleError = (error, isFatal) => {
  // fetch
  console.log(error, isFatal);
  // alert(error.name);
  alert('Something went wrong!');
};

setJSExceptionHandler((error, isFatal) => {
  console.log('caught global error');
  handleError(error, isFatal);
}, true);

class EditRequestPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_: this.props.navigation.state.params.allData,
      data_project: '',
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
      proj: '',
      show: false,
      visible: false,
      visibleB: false,
      response_: '',
      token: '',
      User: [],
      data: '',
      myToken: '',
      notification: '',
      notification_id: '',
      Requestvisible: false,
      total: 0,
      // totall: this.props.navigation.state.params.total,
      all: [],
      specif: [],
      detailed: [],
      description: '',
      purchaseID: this.props.navigation.state.params.purchase,
      newDetail: [],
      stat: this.props.navigation.state.params.stat,
      newArrayDetail: [],
      purchase_id: '',
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
        this.get_Detailed();
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

  get_Detailed() {
    var arr = [];
    var arry = [];
    console.log('purchase id', this.state.purchaseID);
    fetch(`${SERVER_URL}/api/purchase/get-purchase/` + this.state.purchaseID, {
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
          newDetail: json.purchase.details,
          data_project: json.purchase.project,
          purchase_id: json.purchase._id,
          // stat: json.purchase.payment_status,
        });
        this.get_notification();
        this.newObjInInitialArr();
        console.log('all josn', json);
        console.log('Hello detail', this.state.newDetail);
        console.log('stat', this.state.stat);
        console.log('purchase id', this.state.data_project);
        if (this.state.newArrayDetail.length < 1) {
          this.setState({
            newArrayDetail: this.state.newDetail,
          });
        }
      })
      .catch(error => {
        handleError(error, false);
      });
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


  get_notification() {
    var arr = [];
    var arry = [];
    fetch(`${SERVER_URL}/api/project/` + this.state.data_project, {
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
          detailed: json.project.details,
        });
        this.get_Detailed();
      })
      .catch(error => {
        handleError(error, false);
      });
  }

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
            disabledB: false,
            purchaseID: json.purchaseID,
          });
          console.log('adasda', this.state.purchaseID);
        })
        .catch(error => {
          handleError(error, false);
        });
    }
  };

  newObjInInitialArr() {
    let newObject = {
      id: this.props.navigation.getParam('id'),
      item: this.props.navigation.getParam('item'),
      qty: this.props.navigation.getParam('qty'),
      price: this.props.navigation.getParam('price'),
    };
    let id = newObject.id;
    let initialArr = [...this.state.newArrayDetail];
    let newArr = [];
    for (let i = 0; i < initialArr.length; i++) {
      if (id === initialArr[i]._id) {
        newArr.push(newObject);
      } else {
        newArr.push(initialArr[i]);
      }
    }
    this.setState({
      newArrayDetail: newArr,
    });
  }

  updateNewRequest() {
    console.log('body', this.state.data_project);
    console.log('body', this.state.project_id);

    fetch(`${SERVER_URL}/api/purchase/` + this.state.purchase_id, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
      body: JSON.stringify({
        details: this.state.newArrayDetail,
        project: this.state.data_project,
        // "main_id": this.state.purchase_id
        // "project": "5e9405b2c4a40a001700dc22"
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        handleError(error, false);
      });
    console.log('btn click');
    Alert.alert('Your request is updated Successfully!');
  }

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

  render() {
    const {navigation} = this.props;
    if (this.state.show === false) {
      return <View />;
    } else {
      return (
        <View style={{flex: 1}}>
          <Header notificationLength={ this.state.allNotification.length > 0 ? this.state.allNotification.length : 0} />
          {/* <Header  /> */}
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              alignSelf: 'center',
              color: '#FF3301',
            }}>
            Project Name
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              alignSelf: 'center',
              color: 'black',
            }}>
            {this.state.specif.project_name}
          </Text>

          <View style={{flex: 1, marginHorizontal: 20, marginTop: 5}}>
            <ScrollView>
              {this.state.newArrayDetail.map((item, index) => (
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
                  <View
                    style={{
                      borderBottomColor: '#FFCBBE',
                      borderBottomWidth: 1,
                    }}>
                    <Text>{item.item}</Text>
                    {/* <View style={{ marginBottom: 2 }} /> */}
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#FFCBBE',
                      borderBottomWidth: 1,
                    }}>
                    <Text>{item.qty}</Text>

                    {/* <View style={{ marginBottom: 2 }} /> */}
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#FFCBBE',
                      borderBottomWidth: 1,
                    }}>
                    <Text>{item.price}</Text>

                    {/* <View style={{ marginBottom: 2 }} /> */}
                  </View>
                  {/* <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                                    <Text>{item.pkr}</Text>

            
                                {/* <View style={{ marginBottom: 2 }} /> 
                            </View> */}
                  {this.state.data_.status == 1 ||
                  this.state.data_.status == 3 ? (
                    null
                  ) : (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FF3301',
                        padding: 6,
                        borderRadius: 4,
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('EditPage', {
                          detail: item,
                        })
                      }>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: '#FFF',
                          alignContent: 'center',
                          justifyContent: 'center',
                        }}>
                        edit
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>

            {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
                          
                       
                            <Text style={{ alignSelf: 'center', color: '#FFF', alignContent: 'center', justifyContent: "center" }}>Add New</Text>

                            
                        {/* <Text>Total: {this.state.total}</Text> 
                        
                    </View> */}
          </View>

          {this.state.data_.status == 1 ||
                  this.state.data_.status == 3 ? (
                    null
                  ) : (
          <View style={{marginHorizontal: 15, marginBottom: 20, marginTop: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF3301',
                padding: 14,
                borderRadius: 10,
              }}
              // disabled={this.state.disabledB}
              onPress={() => this.updateNewRequest()}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#FFF',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                Update Bill
              </Text>
            </TouchableOpacity>
          </View>
           )}

        </View>
      );
    }
  }
}
export default EditRequestPayment;
