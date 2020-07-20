import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Modal,
  AsyncStorage,
  Image,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Picker
} from 'react-native';
import Header from '../../components/Header';
import {Button, Input} from 'react-native-elements';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SERVER_URL} from '../../utils/config';
import { ScrollView } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";
import RNFetchBlob from 'rn-fetch-blob';
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
class NotifierDetaler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_: this.props.navigation.state.params.allData,
      data_project: this.props.navigation.state.params.project,
      visible: false,
      visibleB: false,
      visibleImg: false,
      response_: '',
      token: '',
      User: [],
      data: '',
      myToken: '',
      notification: '',
      notification_id: '',
      Requestvisible: false,
      total: 0,
      imagePath: '',
      images: [],
      // totall: this.props.navigation.state.params.total,
      all: [],
      specif: [],
      detailed: [],
      description: '',
      purchaseID: this.props.navigation.state.params.purchase,
      newDetail: [],
      stat: this.props.navigation.state.params.stat,
      notifystat: this.props.navigation.state.params.notistat,
      spinner: false,
      imageUrl: '',
      grandTotal: 0,
      pname: [],
      selectedBankNo:'',
      selectedBank:'',
      banks: [],
      cash: 0,
      bankSelected: false,
      selectedImageIndex:0,
      allNotification:[]

    };
  }
  async request_storage_runtime_permission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'ReactNativeCode Storage Permission',
          message:
            'ReactNativeCode App needs access to your storage to download Photos.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted.');
      } else {
        console.log('Storage Permission Not Granted');
      }
    } catch (err) {
      console.warn(err);
      handleError(err, false);
    }
  }
  async componentDidMount() {
    
    this.request_storage_runtime_permission();
    try {
      const value = await AsyncStorage.getItem('User');
      const val = JSON.parse(value);
      if (val !== null) {
        this.setState({
          User: val,
        });
        console.log('userIdii', this.state.User.user_id);
        this.get_notification();
        this._getBanks();
        console.log(
          'project id',
          this.state.data_project,
          '\n',
          'purchase id',
          this.state.purchaseID,
          '\n',
          'status',
          this.state.notifystat,
          '\n',
          this.state.stat,
        );
      }
    } catch (error) {
      handleError(error, false);
    }
     this.get_notification_length();
  }


// -----------------
  onValueChange (value) {
    this.setState({
      selectedBankNo : value
    });
    this.state.selectedBank = value
    console.log('bank id',this.state.selectedBank)
    var bankNo = value;
    this.getAmount(bankNo);
    this.setState({
         bankSelected: true
    })
}   

_getBanks(){
  fetch(`${SERVER_URL}/api/bankAccount/`,{
method:"GET",
  headers: {
    'Accept': 'application/json',
   'Content-Type': 'application/json',
   'X-Auth-Token': this.state.User.token,
 },
})
.then(response => response.json())
.then((responseJson)=> {
  this.setState({
      banks: responseJson.account
   })
   console.log("dsfaf",this.state.banks)
   this._getPayee();
  })
 .catch(error=>  handleError(error, false))
   }


   getAmount(bankNo){
    console.log("hello tak cash")
    fetch(`${SERVER_URL}/api/bankAccount/account-bal/`+bankNo,{
      method:"GET",
        headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json',
         'X-Auth-Token': this.state.User.token,
       },
      })
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
            cash: responseJson.account.amount,
            // account_no: responseJson.account.account_no
         })
         console.log(this.state.cash)
         console.log(bankNo)
        })
       .catch(error=>  handleError(error, false))
  }

// ----------------------
  downloadImage = () => {
    console.log('dounloaded imade', this.state.imagePath);
    console.log('dounloaded imade in', this.state.selectedImageIndex);
    console.log('dounloaded imade in', this.state.selectedImageIndex);
    
    var date = new Date();
    // var image_URL = `${SERVER_URL}/uploads/` + this.state.images[this.state.selectedImageIndex];
    var image_URL = this.state.images[this.state.selectedImageIndex];
    var ext = this.getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        Alert.alert('Image Downloaded Successfully.');
      });
  };
  getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  get_Detailed() {
    var arr = [];
    var arry = [];
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
       let arr=[];
        if(json.purchase.file.length > 0)
        {
          for(let i=0 ; i< json.purchase.file.length; i++){
            arr.push('http://efundapp.herokuapp.com/uploads/'+json.purchase.file[i])
          }

        }
        console.log('image arr ----', arr)
        this.setState({
          newDetail: json.purchase.details,
          images: arr,
          // stat: json.purchase.payment_status,
          pname: json,
        });
        console.log('Image Path', this.state.imagePath);
        console.log('Image Path ', json);
        this.get_Total();
      })
      .catch(error => {
        handleError(error, false);
      });
  }

  get_Total() {
    for (let i = 0; i < this.state.newDetail.length; i++) {
      var tol = this.state.newDetail[i].qty * this.state.newDetail[i].price;
      this.state.grandTotal = this.state.grandTotal + tol;
    }
    var g = this.state.grandTotal;
    console.log('totals', this.state.grandTotal);
    this.setState({
      grandTotal: g,
    });
  }

  loadBanks() {
    return this.state.banks.map(bank => (
       <Picker.Item label={`${bank.account_name}/${bank.name}`} value={bank._id} />
    ))
  }
  get_notification() {
    var arr = [];
    var arry = [];
    console.log('fhfjtytk');
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
        console.log('ALL', this.state.all);
        //console.log('Specific', this.state.specif);
        // console.log('Detailed', this.state.detailed);
        // console.log('AAAAA', this.state.data_);
        // console.log('Sdasdasd', this.txt(this.state.data_.message));
        // console.log('SSasadda', this.state.purchaseID);
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
        this.get_Detailed();
      })
      .catch(error => {
        handleError(error, false);
      }, console.log('not'));
  }

  director_accept() {
    this.setState({visible: true});
    // console.log('dddd', item);
    fetch(`${SERVER_URL}/api/purchase/director-accept`, {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
      body: JSON.stringify({
        details: this.state.data_.message,
        project: this.state.data_.project,
        purchaserName: this.state.data_.purchaserName,
        purchaserID: this.state.data_.purchaserID,
        request: this.state.purchaseID,
        notification_status: this.state.notifystat,
        bank_id: this.state.selectedBank,
        request_type: this.state.notifystat === 'ClaimRequest' ? 'ClaimRequest' : 'RequestPayment'
      }),
    })
      .then(response => response.json())
      .then(json => {
        this.setState({Isvisible: true});
      })
      .catch(error => {
        handleError(error, false);
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
        handleError(error, false);
      });
  }
  sup_accept() {
    this.setState({visible: true});
    fetch(`${SERVER_URL}/api/purchase/accept-notification`, {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
      body: JSON.stringify({
        details: this.state.data_.message,
        project: this.state.data_.project,
        purchaserName: this.state.data_.purchaserName,
        purchaserID: this.state.data_.purchaserID,
        request: this.state.purchaseID,
        notification_status: this.state.notifystat,
      }),
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          notification_id: json.notificationID,
          Requestvisible: true,
        });
        console.log('myresponse', this.state.notification_id);
        this.director_notification(this.state.notification_id);
      })
      .catch(error => {
        handleError(error, false);
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
    console.log(this.state.description);
    fetch(`${SERVER_URL}/api/purchase/reject-notification`, {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
      body: JSON.stringify({
        details: this.state.data_.message,
        project: this.state.data_.project,
        message: this.state.description,
        purchaserName: this.state.data_.purchaserName,
        purchaserID: this.state.data_.purchaserID,
        request: this.state.purchaseID,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log('response:' + JSON.stringify(json));
        this.onClickButtonB();
      })
      .catch(error => {
        handleError(error, false);
      });
    this.setState({visible: false});
  }

  txt(item) {
    var str = item;
    str = str.replace(/[^a-zA-Z0-9]/g, ' ');
    str = str.replace(/  +/g, ' ');
    str = str.replace('/ ', ':');
    return str;
  }

  onClickButton() {
    this.setState({
      visible: false,
    });
    this.props.navigation.replace('Notification');
    this.props.navigation.navigate('Home');
  }
  onClickButtonB() {
    this.setState({
      visibleB: false,
    });
    this.props.navigation.replace('Notification');
    this.props.navigation.navigate('Home');
  }

  onClickReject() {
    this.setState({
      visibleB: true,
    });
  }

  handlePress = async () => {
    this.setState({visible: true});
  };
  handlePressB = async () => {
    this.setState({visibleB: true});
  };
  onClickButtonImg = async () => {
    <ActivityIndicator size="large" color="#0000ff" />;
    this.setState({visibleImg: false});
  };
  showLoader = () => {
    this.setState({spinner: true});
  };
  hideLoader = () => {
    this.setState({spinner: false});
  };


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
    if (this.state.User.roles == 'Supervisor') {
      return (
        <View style={{flex: 1}}>
          {/* <Header /> */}
          <Header notificationLength={this.state.allNotification.length > 0 ? this.state.allNotification.length : 0} />
          <View style={{flex: 1, marginHorizontal: 20, marginTop: 30}}>
            <View
              style={[
                MainFlowStyles.cardStyle,
                {paddingTop: 10, paddingBottom: 10, flex: 1},
              ]}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginBottom: 20,
                }}>
                {this.state.specif.project_name}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 20,
                  marginTop: 10,
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
                style={{flexGrow: 0}}
                data={this.state.newDetail}
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
                        <Text>{item.qty * item.price}</Text>
                      </View>
                    </View>
                  );
                }}
              />
              <Text
                style={{
                  alignSelf: 'flex-end',
                  paddingBottom: 20,
                  marginTop: 20,
                  borderBottomColor: '#FFC1B2',
                  borderBottomWidth: 1,
                  marginRight: '10%',
                }}>
                Grand Total: {this.state.grandTotal}
              </Text>

              <Text
                style={{
                  alignSelf: 'flex-end',
                  paddingBottom: 20,
                  marginTop: 20,
                  borderBottomColor: '#FFC1B2',
                  borderBottomWidth: 1,
                  marginRight: '5.5%',
                }}>
                {this.state.totall}
              </Text>
              
            </View>
          </View>
          {this.state.notifystat == 'ClaimRequest' && (
            <View
              style={{alignSelf: 'center', padding: 20, flexDirection: 'row'}}>
              <Button
                buttonStyle={{
                  backgroundColor: '#FF3301',
                  padding: 14,
                  borderRadius: 10,
                }}
                onPress={() => {
                  this.setState({visibleImg: true, spinner: true});
                }}
                title="View Claim"
              />
            </View>
          )}
          {this.state.stat == 0 && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 20,
                  marginTop: 10,
                  marginHorizontal: '25%',
                  elevation: 5,
                }}>
                <Button
                  title="Accept"
                  buttonStyle={{
                    backgroundColor: '#FF3301',
                    padding: 14,
                    borderRadius: 10,
                  }}
                  containerStyle={{marginHorizontal: 10}}
                  onPress={() => {
                    this.sup_accept(), {visible: true};
                  }}
                />

                <Button
                  title="Reject"
                  buttonStyle={{
                    backgroundColor: '#FF3301',
                    padding: 14,
                    borderRadius: 10,
                  }}
                  containerStyle={{marginHorizontal: 10}}
                  onPress={() => {
                    this.onClickReject();
                  }}
                />
              </View>

              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visible}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingTop: 10,
                      borderRadius: 20,
                      width: width * 0.8,
                    }}>
                    <View style={{alignSelf: 'center', padding: 20}}>
                      <FontAwesome name="send" color="#FF3301" size={50} />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#FF3301',
                        paddingBottom: 40,
                      }}>
                      Request Sent To Director
                    </Text>
                    <Button
                      title="OK"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        borderRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                      onPress={() => this.onClickButton()}
                    />
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visibleB}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingTop: 10,
                      borderRadius: 20,
                      width: width * 0.8,
                    }}>
                    <View style={{alignSelf: 'center', padding: 20}}>
                      <FontAwesome name="send" color="#FF3301" size={50} />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#FF3301',
                        paddingBottom: 40,
                      }}>
                      Request Rejected
                    </Text>
                    <Input
                      placeholder="Enter Your Reason for Rejection."
                      autoCapitalize="none"
                      autoCompleteType="off"
                      keyboardType="default"
                      // inputStyle={{ fontSize: 14, paddingBottom: 50, textAlignVertical: 'top' }}
                      // inputContainerStyle={{ borderColor: '#FF3301', borderWidth: 1, borderRadius: 0 }}
                      multiline
                      onChangeText={value =>
                        this.setState({description: value})
                      }
                    />
                    <Button
                      title="OK"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        borderRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                      onPress={() => this.reject_ok()}
                    />
                  </View>
                </View>
              </Modal>
              {/* new modal for image */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visibleImg}>
                {/* {this.state.spinner==true && (<ActivityIndicator size="large" color="#0000ff" />)} */}
                {/* <ActivityIndicator animating={this.state.showLoader} size="small" color="#00ff00" /> */}

                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingTop: 0,
                      // borderRadius: 20,
                      borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                      // width: 300,
                      width: width * 0.9,

                    }}>
                    {/* <View style={{alignSelf: 'center', padding: 20}}>
                    </View> */}
                    <View
                    style={{
                      width: 300,
                      borderRadius: 20,
                    }}
                    >
                   <SliderBox
                      images={this.state.images}
                      sliderBoxHeight={300}
                      parentWidth={325}
                      // sliderBoxWidth={100}

                      currentImageEmitter={index => this.setState({
                        selectedImageIndex:index
                      })}
                      dotColor="#FFEE58"
                      inactiveDotColor="#90A4AE"
                     />
                     </View>
                    {/* <Image
                      source={{
                        uri:
                          'http://efundapp.herokuapp.com/uploads/' +
                          this.state.imagePath,

                        // uri:'http://efund.alliedco.pk/uploads'+this.state.imagePath,
                      }}
                      style={{height: 450, width: 250, alignSelf: 'center'}}
                    /> */}
                    <Button
                      title="Download"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        borderRadius: 0,
                      }}
                      onPress={() => this.downloadImage()}
                    />
                    <Button
                      title="OK"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        marginTop: 1,
                        borderRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                      onPress={() => this.onClickButtonImg()}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          {/* <Header  /> */}
          <Header  notificationLength={this.state.allNotification.length > 0 ? this.state.allNotification.length : 0} />
          <View style={{flex: 1, marginHorizontal: 20, marginTop: 30}}>
            <View
              style={[
                MainFlowStyles.cardStyle,
                {paddingTop: 10, paddingBottom: 10, flex: 1},
              ]}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginBottom: 20,
                }}>
                {this.state.specif.project_name}
              </Text>
              <View
            style={{
              borderColor: '#FF3301',
              borderWidth: 1,
              width: 170,
              height: 50,
              borderRadius: 30,
              justifyContent: 'center',
              alignSelf: 'center',
              
            }}>
              {/* <Text>Select Bank:</Text> */}
              <Picker
                selectedValue={this.state.selectedBankNo}
              // onValueChange={(itemValue, itemIndex) =>
              //     this.setState({selectedBank: itemValue})}>
               onValueChange={this.onValueChange.bind(this)}
              >
                 <Picker.Item label="Select a Bank" value="" /> 
                {this.loadBanks()}
              
              </Picker>
              </View>

              <View style={{ justifyContent: 'center',
              alignSelf: 'center', marginTop:'2%'}}>            
                  <Text style={{marginLeft:'3%'}}>Amount in Bank: {this.state.cash}</Text>
             
                           
              </View>

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
                style={{flexGrow: 0}}
                data={this.state.newDetail}
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
                        <Text>{item.qty * item.price}</Text>
                      </View>
                    </View>
                  );
                }}
              />
              <Text
                style={{
                  alignSelf: 'flex-end',
                  paddingBottom: 20,
                  marginTop: 20,
                  borderBottomColor: '#FFC1B2',
                  borderBottomWidth: 1,
                  marginRight: '10%',
                }}>
                Grand Total: {this.state.grandTotal}
              </Text>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  paddingBottom: 20,
                  marginTop: 20,
                  borderBottomColor: '#FFC1B2',
                  borderBottomWidth: 1,
                  marginRight: '5.5%',
                }}>
                {this.state.totall}
              </Text>
              {/* <View style={{width:'70%', marginLeft:'5%'}}> */}
              
            </View>
          </View>
          {this.state.notifystat == 'ClaimRequest' && (
            <View style={{alignSelf: 'center', padding: 20}}>
              <Button
                buttonStyle={{
                  backgroundColor: '#FF3301',
                  padding: 14,
                  borderRadius: 10,
                }}
                onPress={() => {
                  this.setState({visibleImg: true});
                }}
                title="View Claim"
              />
            </View>
          )}

          {this.state.stat == 0 && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 20,
                  marginTop: 10,
                  marginHorizontal: '25%',
                  elevation: 5,
                }}>
                <Button
                  title="Accept"
                  disabled={ this.state.bankSelected === false}
                  buttonStyle={{
                    backgroundColor: '#FF3301',
                    padding: 14,
                    borderRadius: 10,
                  }}
                  containerStyle={{marginHorizontal: 10}}
                  onPress={() => {
                    this.director_accept(), {visible: true};
                  }}
                />

                <Button
                  title="Reject"
                  buttonStyle={{
                    backgroundColor: '#FF3301',
                    padding: 14,
                    borderRadius: 10,
                  }}
                  containerStyle={{marginHorizontal: 10}}
                  onPress={() => {
                    this.onClickReject();
                  }}
                />
              </View>

              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visible}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingTop: 10,
                      borderRadius: 20,
                      width: width * 0.8,
                    }}>
                    <View style={{alignSelf: 'center', padding: 20}}>
                      <FontAwesome name="send" color="#FF3301" size={50} />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#FF3301',
                        paddingBottom: 40,
                      }}>
                      Request Sent To Accountant
                    </Text>
                    <Button
                      title="OK"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        borderRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                      onPress={() => this.onClickButton()}
                    />
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visibleB}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingTop: 10,
                      borderRadius: 20,
                      width: width * 0.8,
                    }}>
                    <View style={{alignSelf: 'center', padding: 20}}>
                      <FontAwesome name="send" color="#FF3301" size={50} />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#FF3301',
                        paddingBottom: 40,
                      }}>
                      Request Rejected
                    </Text>
                    <Input
                      placeholder="Enter Your Reason for Rejection."
                      autoCapitalize="none"
                      autoCompleteType="off"
                      keyboardType="default"
                      // inputStyle={{ fontSize: 14, paddingBottom: 50, textAlignVertical: 'top' }}
                      // inputContainerStyle={{ borderColor: '#FF3301', borderWidth: 1, borderRadius: 0 }}
                      multiline
                      onChangeText={value =>
                        this.setState({description: value})
                      }
                    />
                    <Button
                      title="OK"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        borderRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                      onPress={() => this.reject_ok()}
                    />
                  </View>
                </View>
              </Modal>
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visibleImg}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingTop: 0,
                      // borderRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      width: width * 0.9,
                      // width: 300,

                    }}>
                       <View
                    style={{
                      width: 300,
                      borderRadius: 20,
                    }}
                    >
                    {/* <View style={{alignSelf: 'center', padding: 20}}>
                    </View> */}
                    
                    {/* <Image
                      source={{
                        uri:
                          'http://efundapp.herokuapp.com/uploads/' +
                          this.state.imagePath,
                      }}
                      style={{height: 450, width: 250, alignSelf: 'center'}}
                    /> */}
                     <SliderBox
                      images={this.state.images}
                      sliderBoxHeight={300}
                      parentWidth={325}
                      
                      currentImageEmitter={index => this.setState({
                        selectedImageIndex:index
                      })}
                      dotColor="#FFEE58"
                      inactiveDotColor="#90A4AE"
                     />
                    </View>
                    <Button
                      title="Download"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        borderRadius: 0,
                      }}
                      onPress={() => this.downloadImage()}
                    />
                    <Button
                      title="OK"
                      buttonStyle={{
                        backgroundColor: '#FF3301',
                        padding: 14,
                        borderRadius: 0,
                        marginTop: 1,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                      onPress={() => this.onClickButtonImg()}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </View>
      );
    }
  }
}
export default NotifierDetaler;
