import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Picker,
  AsyncStorage,
} from 'react-native';
import Header from '../../components/Header';
import {Button} from 'react-native-elements';
import MainFlowStyles from '../../Styles/MainFlowStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import CustomButton from '../../components/CustomButton';
var n = 1;
export default class ClaimDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: '',
      project_id: '',
      Category: [],
      CategoryCtg: [],
      Category3: [],
      selectedValue: '',
      selectedProject: '',
      selectedCtg: '',
      selectedId: '',
      User: [],
      bills: [],
      qty: 0,
      price: 0,
      pkr: 0,
      title: '',
      ctg: '',
      orderss: [],
      response_: '',
      data: '',
      ctgdata: '',
      pickerValue: '',
    };
    this.list = React.createRef();
  }
  claim_handlePress = async () => {
    console.log('claimcall');
    var aa = this.state.title;
    var ab = this.state.qty;
    var ac = this.state.price;
    var result = ac * ab;
    var project = this.state.selectedValue;
    var cat = this.state.selectedCtg;
    console.log("a",aa,"b",ab,"c",ac,"d",result,"pe",project,'cat',cat)
    var data = {
      // "payment": "50000",
      "project": project,
      "details": [
        {
          "item": aa,
          "qty": ab,
          "price": ac,
          "pkr": result,
          "category": cat,
        },
      ],
    };
    if (data.details[0].item == '') {
      console.log('nt call a api');
    } else {
      fetch('http://efundapp.herokuapp.com/api/purchase/claimpayment', {
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
          console.log(JSON.stringify(json));
          this.setState({ID: json.ID});
          console.log('your ids', this.state.ID);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  claim_ctg() {
    var array = [];
    fetch('http://efundapp.herokuapp.com/api/chart', {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        var v = this.state.Category3;
        var chat = json.chart;
        // console.log('chat', chat.length);
        for (let j = 0; j < chat.length; j++) {
          var ll = json.chart[j].items.length;
          for (let kk = 0; kk < ll; kk++) {
            // console.log("hay i aam",json.chart[j].items[kk].item_name)
            array.push({
              item_name: json.chart[j].items[kk].item_name,
              id: json.chart[j].items[kk]._id,
            });
          }
        }
        this.setState({CategoryCtg: array});
        //console.log('<aRa>', JSON.stringify(this.state.CategoryCtg));
      })
      .catch(error => {
        console.error(error);
      });
  }
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('User');
      const val = JSON.parse(value);
      if (val !== null) {
        this.setState({
          User: val,
        });
        console.log(this.state.User);
      }
    } catch (error) {
      console.log('error getting data');
    }
    var thisdata = [];
    fetch('http://efundapp.herokuapp.com/api/project', {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({data: json.project});
        var v = this.state.data.length;
        for (let i = 0; i < v; i++) {
          // console.log('valuesss:' + JSON.stringify(json.project[i]));
          thisdata.push({
            project_name: json.project[i].project_name,
            project_id: json.project[i]._id,
          });
        }
        this.setState({Category: thisdata});
        console.log('valuesss:', JSON.stringify(this.state.Category));
      })

      .catch(error => {
        console.error(error);
      });
    this.claim_ctg();
  }
  render_1 = ({item}) => (
    <KeyboardAvoidingView>
      <View
        style={[
          MainFlowStyles.cardStyle,
          {
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 20,
            marginHorizontal: 3,
          },
        ]}>
        <Text style={{fontWeight: 'bold', fontSize: 16}} />
        <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
          <TextInput
            style={{fontSize: 16}}
            placeholder="Item"
            onChangeText={title => this.setState({title})}
            ref={ref => (this.ref = ref)}
          />
          <View style={{marginBottom: 2}} />
        </View>
        <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
          <TextInput
            style={{fontSize: 16}}
            placeholder="price"
            keyboardType={'numeric'}
            onChangeText={price => this.setState({price})}
            ref={ref => (this.ref = ref)}
          />
          <View style={{marginBottom: 2}} />
        </View>
        <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
          <TextInput
            style={{fontSize: 16}}
            placeholder="qty"
            keyboardType={'numeric'}
            onChangeText={qty => this.setState({qty})}
            ref={ref => (this.ref = ref)}
          />
          <View style={{marginBottom: 2}} />
        </View>
        <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Picker
              selectedValue={this.state.selectedId}
              prompt="Select ctg"
              style={{
                width: 50,
                alignSelf: 'flex-end',
                zIndex: 5,
                marginTop: 1,
                borderWidth: 1,
                color: '#FF3301',
                fontSize: 12,
              }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedCtg: itemValue});
                this.setState({selectedId: itemValue});
                console.log(
                  'selected:value of project' + this.state.selectedId,
                );
              }}>
              {CtgItems}
            </Picker>
            <View style={{justifyContent: 'flex-end', marginBottom: 2}} />
          </View>
          <View style={{marginBottom: 2}} />
        </View>
        {/* <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
          <Text style={{fontSize: 16}}>
            {this.state.price * this.state.qty}
          </Text>
          <View style={{marginBottom: 2}} />
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
  onValueChange(value) {
    this.setState({selectedValue: value});
    this.state.pickerValue = value;
  }
  render() {
    const PickerItems = this.state.Category.map((element, index) => (
      <Picker.Item
        key={'pick' + element.project_name}
        label={'' + '    ' + element.project_name}
        value={element.project_id}
        prompt="Options"
      />
    ));
    const CtgItems = this.state.CategoryCtg.map((element2, index) => (
      <Picker.Item
        key={'pick' + element2.item_name}
        label={'' + '    ' + element2.item_name}
        value={element2.item_name}
        prompt="Options"
      />
    ));
    return (
      <View style={{flex: 1}}>
        <Header />
        <ScrollView>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              alignSelf: 'center',
              color: '#FF3301',
            }}>
            Select Project
          </Text>
          <View
            style={{
              borderColor: '#FF3301',
              borderWidth: 1,
              width: 300,
              height: 50,
              borderRadius: 30,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <Picker
              selectedValue={this.state.selectedValue}
              prompt="Select Project"
              style={{
                width: 250,
                height: 60,
                alignSelf: 'flex-end',
                zIndex: 5,
                marginTop: 1,
                borderWidth: 1,
                //flexDirection: "row-reverse",
                color: '#FF3301',
                fontSize: 12,
              }}
              // onValueChange={this..bind(this)}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedValue: itemValue});
                this.setState({selectedProject: itemValue});
                console.log(
                  'selected:value of project' + this.state.selectedValue,
                );
              }}>
              {PickerItems}
            </Picker>
          </View>
          <View
            style={[
              MainFlowStyles.cardStyle,
              {
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 20,
                marginHorizontal: 20,
                marginTop: 10,
              },
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 16}} />
            <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
              <TextInput
                style={{fontSize: 16}}
                placeholder="Item"
                onChangeText={title => this.setState({title})}
                ref={ref => (this.ref = ref)}
              />
              <View style={{marginBottom: 2}} />
            </View>
            <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
              <TextInput
                style={{fontSize: 16}}
                placeholder="price"
                keyboardType={'numeric'}
                onChangeText={price => this.setState({price})}
                ref={ref => (this.ref = ref)}
              />
              <View style={{marginBottom: 2}} />
            </View>

            <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
              <TextInput
                style={{fontSize: 16}}
                placeholder="qty"
                keyboardType={'numeric'}
                onChangeText={qty => this.setState({qty})}
                ref={ref => (this.ref = ref)}
              />
              <View style={{marginBottom: 2}} />
            </View>
            <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
              <View style={{flexDirection: 'row'}}>
                <Picker
                  selectedValue={this.state.selectedCtg}
                  prompt="Select Category"
                  style={{
                    width: 50,
                    alignSelf: 'flex-end',
                    zIndex: 5,
                    marginTop: 1,
                    borderWidth: 1,
                    color: '#FF3301',
                    fontSize: 12,
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({selectedCtg: itemValue});
                    this.setState({selectedId: itemValue});
                    console.log(
                      'selected: catogry' + this.state.selectedCtg,
                    );
                  }}>
                  {CtgItems}
                </Picker>
                <View style={{justifyContent: 'flex-end', marginBottom: 2}} />
              </View>
              <View style={{marginBottom: 2}} />
            </View>

            {/* <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
              <Text style={{fontSize: 16}}>
                {this.state.price * this.state.qty}
              </Text>
              <View style={{marginBottom: 2}} />
            </View> */}
          </View>
          <View style={{flex: 1, marginHorizontal: 20, marginTop: 10}}>
            <FlatList
              ref={this.list}
              style={{flexGrow: 0}}
              data={this.state.bills}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                this.list.current.scrollToEnd({animated: false})
              }
              renderItem={({item, index}) => {
                return (
                  <KeyboardAvoidingView>
                    <View
                      style={[
                        MainFlowStyles.cardStyle,
                        {
                          padding: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginBottom: 20,
                          marginHorizontal: 3,
                        },
                      ]}>
                      <Text style={{fontWeight: 'bold', fontSize: 16}} />
                      <View
                        style={{
                          borderBottomColor: '#FFCBBE',
                          borderBottomWidth: 1,
                        }}>
                        <TextInput
                          style={{fontSize: 16}}
                          placeholder="Item"
                          onChangeText={title => this.setState({title})}
                          ref={ref => (this.ref = ref)}
                        />
                        <View style={{marginBottom: 2}} />
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#FFCBBE',
                          borderBottomWidth: 1,
                        }}>
                        <TextInput
                          style={{fontSize: 16}}
                          placeholder="price"
                          keyboardType={'numeric'}
                          onChangeText={price => this.setState({price})}
                          ref={ref => (this.ref = ref)}
                        />
                        <View style={{marginBottom: 2}} />
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#FFCBBE',
                          borderBottomWidth: 1,
                        }}>
                        <TextInput
                          style={{fontSize: 16}}
                          placeholder="qty"
                          keyboardType={'numeric'}
                          onChangeText={qty => this.setState({qty})}
                          ref={ref => (this.ref = ref)}
                        />
                        <View style={{marginBottom: 2}} />
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#FFCBBE',
                          borderBottomWidth: 1,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Picker
                            selectedValue={this.state.selectedId}
                            prompt="Select Category"
                            style={{
                              width: 50,
                              alignSelf: 'flex-end',
                              placeholder:"qty",
                              zIndex: 5,
                              marginTop: 1,
                              borderWidth: 1,
                              color: '#FF3301',
                              fontSize: 12,
                            }}
                            onValueChange={(itemValue, itemIndex) => {
                              this.setState({selectedCtg: itemValue});
                              this.setState({selectedId: itemValue});
                              console.log(
                                'selected: ctg' +
                                  this.state.selectedCtg,
                              );
                            }}>
                            {CtgItems}
                          </Picker>
                          <View
                            style={{
                              justifyContent: 'flex-end',
                              marginBottom: 2,
                            }}
                          />
                        </View>
                        <View style={{marginBottom: 2}} />
                      </View>
                      {/* <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
          <Text style={{fontSize: 16}}>
            {this.state.price * this.state.qty}
          </Text>
          <View style={{marginBottom: 2}} />
        </View> */}
                    </View>
                  </KeyboardAvoidingView>
                );
              }}
            />
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
                let b = this.state.bills;
                var aa = this.state.title;
                var ab = this.state.qty;
                var ac = this.state.price;
                var ae = this.state.pkr;
                var result = ac * ab;
                var cat = this.state.selectedCtg;
                this.claim_handlePress();
                b.push({
                  item: aa,
                  price: ac,
                  qty: ab,
                  pkr: result,
                  category: cat,
                });
                this.setState({bills: b});
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
            </TouchableOpacity>
          </View>
          <View
            style={{marginHorizontal: 15, marginBottom: 20, marginTop: 250}}>
            {/* <CustomButton
            onPress={this.s}
              text="Claim"
              routeName="ClaimPayment"
              data={this.state.bills}
              data1={this.state.selectedValue}
              data_ctg={this.state.ctg}
            /> */}
            <TouchableOpacity
              style={{
                backgroundColor: '#FF3301',
                padding: 14,
                borderRadius: 10,
              }}
              onPress={() => {
                let b = this.state.bills;
                var aa = this.state.title;
                var ab = this.state.qty;
                var ac = this.state.price;
                var result = ac * ab;
                var cat = this.state.selectedCtg;
                this.claim_handlePress();
                b.push({
                  item: aa,
                  price: ac,
                  qty: ab,
                  pkr: result,
                  category: cat,
                });
                this.setState({bills: b});
                this.props.navigation.navigate('ClaimPayment', {
                  ID: this.state.ID,
                  data: this.state.bills,
                  data1: this.state.selectedValue,
                  data_ctg: this.state.selectedCtg,
                });
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#FFF',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                Add Image
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
