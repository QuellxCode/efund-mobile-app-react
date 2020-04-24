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
  Constants,
  TouchableO,
  ToastAndroid,
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
      ID: '',
      disabledB: true,
      total: 0,
      purchaseID: '',
      proj: '',
      show: false,
      totalC: 0,
    };
    this.list = React.createRef();
  }
  claim_handlePress = async () => {
    console.log('aRRAY', this.state.bills);
    fetch('http://efundapp.herokuapp.com/api/purchase/claimpayment', {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': this.state.User.token,
      },
      body: JSON.stringify({
        project: this.state.selectedValue,
        details: this.state.bills,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json));
        this.setState({ID: json.ID});
        console.log('your ids', this.state.ID);
        this.props.navigation.navigate('ClaimPayment', {
          ID: this.state.ID,
          data: this.state.bills,
          data1: this.state.selectedValue,
        });
      })
      .catch(error => {
        console.error(error);
      });
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
                width: 150,
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
  loadProjects() {
    return this.state.Category.map(proj => (
      <Picker.Item label={proj.project_name} value={proj._id} />
    ));
  }
  activate_() {
    if (this.state.bills != []) {
      this.state.disabledB = false;
    }
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
    // return (
    //   <View style={{flex: 1}}>
    //     <Header />
    //     <ScrollView>
    //       <Text
    //         style={{
    //           fontWeight: 'bold',
    //           fontSize: 30,
    //           alignSelf: 'center',
    //           color: '#FF3301',
    //         }}>
    //         Select Project
    //       </Text>
    //       <View
    //         style={{
    //           borderColor: '#FF3301',
    //           borderWidth: 1,
    //           width: 300,
    //           height: 50,
    //           borderRadius: 30,
    //           justifyContent: 'center',
    //           alignSelf: 'center',
    //           marginTop: 10,
    //         }}>
    //         <Picker
    //           selectedValue={this.state.selectedValue}
    //           prompt="Select Project"
    //           style={{
    //             width: 250,
    //             height: 60,
    //             alignSelf: 'flex-end',
    //             zIndex: 5,
    //             marginTop: 1,
    //             borderWidth: 1,
    //             //flexDirection: "row-reverse",
    //             color: '#FF3301',
    //             fontSize: 12,
    //           }}
    //           // onValueChange={this..bind(this)}
    //           onValueChange={(itemValue, itemIndex) => {
    //             this.setState({selectedValue: itemValue});
    //             this.setState({selectedProject: itemValue});
    //             console.log(
    //               'selected:value of project' + this.state.selectedValue,
    //             );
    //           }}>
    //           {PickerItems}
    //         </Picker>
    //       </View>
    //       <View
    //         style={[
    //           MainFlowStyles.cardStyle,
    //           {
    //             padding: 10,
    //             flexDirection: 'row',
    //             justifyContent: 'space-around',
    //             marginBottom: 20,
    //             marginHorizontal: 20,
    //             marginTop: 10,
    //           },
    //         ]}>
    //         <Text style={{fontWeight: 'bold', fontSize: 16}} />
    //         <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
    //           <TextInput
    //             style={{fontSize: 16}}
    //             placeholder="Item"
    //             onChangeText={title => this.setState({title})}
    //             ref={ref => (this.ref = ref)}
    //           />
    //           <View style={{marginBottom: 2}} />
    //         </View>
    //         <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
    //           <TextInput
    //             style={{fontSize: 16}}
    //             placeholder="price"
    //             keyboardType={'numeric'}
    //             onChangeText={price => this.setState({price})}
    //             ref={ref => (this.ref = ref)}
    //           />
    //           <View style={{marginBottom: 2}} />
    //         </View>

    //         <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
    //           <TextInput
    //             style={{fontSize: 16}}
    //             placeholder="qty"
    //             keyboardType={'numeric'}
    //             onChangeText={qty => this.setState({qty})}
    //             ref={ref => (this.ref = ref)}
    //           />
    //           <View style={{marginBottom: 2}} />
    //         </View>
    //         <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
    //           <View style={{flexDirection: 'row'}}>
    //             <Picker
    //               selectedValue={this.state.selectedCtg}
    //               prompt="Select Category"
    //               style={{
    //                 width: 50,
    //                 alignSelf: 'flex-end',
    //                 zIndex: 5,
    //                 marginTop: 1,
    //                 borderWidth: 1,
    //                 color: '#FF3301',
    //                 fontSize: 12,
    //               }}
    //               onValueChange={(itemValue, itemIndex) => {
    //                 this.setState({selectedCtg: itemValue});
    //                 this.setState({selectedId: itemValue});
    //                 console.log('selected: catogry' + this.state.selectedCtg);
    //               }}>
    //               {CtgItems}
    //             </Picker>
    //             <View style={{justifyContent: 'flex-end', marginBottom: 2}} />
    //           </View>
    //           <View style={{marginBottom: 2}} />
    //         </View>

    //         {/* <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
    //           <Text style={{fontSize: 16}}>
    //             {this.state.price * this.state.qty}
    //           </Text>
    //           <View style={{marginBottom: 2}} />
    //         </View> */}
    //       </View>
    //       <View style={{flex: 1, marginHorizontal: 20, marginTop: 10}}>
    //         <FlatList
    //           ref={this.list}
    //           style={{flexGrow: 0}}
    //           data={this.state.bills}
    //           keyExtractor={(item, index) => index.toString()}
    //           showsVerticalScrollIndicator={false}
    //           onContentSizeChange={() =>
    //             this.list.current.scrollToEnd({animated: false})
    //           }
    //           renderItem={({item, index}) => {
    //             return (
    //               <KeyboardAvoidingView>
    //                 <View
    //                   style={[
    //                     MainFlowStyles.cardStyle,
    //                     {
    //                       padding: 10,
    //                       flexDirection: 'row',
    //                       justifyContent: 'space-around',
    //                       marginBottom: 20,
    //                       marginHorizontal: 3,
    //                     },
    //                   ]}>
    //                   <Text style={{fontWeight: 'bold', fontSize: 16}} />
    //                   <View
    //                     style={{
    //                       borderBottomColor: '#FFCBBE',
    //                       borderBottomWidth: 1,
    //                     }}>
    //                     <TextInput
    //                       style={{fontSize: 16}}
    //                       placeholder="Item"
    //                       onChangeText={title => this.setState({title})}
    //                       ref={ref => (this.ref = ref)}
    //                     />
    //                     <View style={{marginBottom: 2}} />
    //                   </View>
    //                   <View
    //                     style={{
    //                       borderBottomColor: '#FFCBBE',
    //                       borderBottomWidth: 1,
    //                     }}>
    //                     <TextInput
    //                       style={{fontSize: 16}}
    //                       placeholder="price"
    //                       keyboardType={'numeric'}
    //                       onChangeText={price => this.setState({price})}
    //                       ref={ref => (this.ref = ref)}
    //                     />
    //                     <View style={{marginBottom: 2}} />
    //                   </View>
    //                   <View
    //                     style={{
    //                       borderBottomColor: '#FFCBBE',
    //                       borderBottomWidth: 1,
    //                     }}>
    //                     <TextInput
    //                       style={{fontSize: 16}}
    //                       placeholder="qty"
    //                       keyboardType={'numeric'}
    //                       onChangeText={qty => this.setState({qty})}
    //                       ref={ref => (this.ref = ref)}
    //                     />
    //                     <View style={{marginBottom: 2}} />
    //                   </View>
    //                   <View
    //                     style={{
    //                       borderBottomColor: '#FFCBBE',
    //                       borderBottomWidth: 1,
    //                     }}>
    //                     <View style={{flexDirection: 'row'}}>
    //                       <Picker
    //                         selectedValue={this.state.selectedId}
    //                         prompt="Select Category"
    //                         style={{
    //                           width: 50,
    //                           alignSelf: 'flex-end',
    //                           placeholder: 'qty',
    //                           zIndex: 5,
    //                           marginTop: 1,
    //                           borderWidth: 1,
    //                           color: '#FF3301',
    //                           fontSize: 12,
    //                         }}
    //                         onValueChange={(itemValue, itemIndex) => {
    //                           this.setState({selectedCtg: itemValue});
    //                           this.setState({selectedId: itemValue});
    //                           console.log(
    //                             'selected: ctg' + this.state.selectedCtg,
    //                           );
    //                         }}>
    //                         {CtgItems}
    //                       </Picker>
    //                       <View
    //                         style={{
    //                           justifyContent: 'flex-end',
    //                           marginBottom: 2,
    //                         }}
    //                       />
    //                     </View>
    //                     <View style={{marginBottom: 2}} />
    //                   </View>
    //                   {/* <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
    //       <Text style={{fontSize: 16}}>
    //         {this.state.price * this.state.qty}
    //       </Text>
    //       <View style={{marginBottom: 2}} />
    //     </View> */}
    //                 </View>
    //               </KeyboardAvoidingView>
    //             );
    //           }}
    //         />
    //         <TouchableOpacity
    //           style={{
    //             alignSelf: 'center',
    //             alignContent: 'center',
    //             backgroundColor: '#FF3301',
    //             height: 40,
    //             width: 100,
    //             borderRadius: 20,
    //             justifyContent: 'center',
    //           }}
    //           onPress={() => {
    //             let b = this.state.bills;
    //             var aa = this.state.title;
    //             var ab = this.state.qty;
    //             var ac = this.state.price;
    //             var ae = this.state.pkr;
    //             var result = ac * ab;
    //             var cat = this.state.selectedCtg;
    //             //this.claim_handlePress();
    //             b.push({
    //               item: aa,
    //               price: ac,
    //               qty: ab,
    //               pkr: result,
    //               category: cat,
    //             });
    //             this.setState({bills: b});
    //           }}>
    //           <Text
    //             style={{
    //               alignSelf: 'center',
    //               color: '#FFF',
    //               alignContent: 'center',
    //               justifyContent: 'center',
    //             }}>
    //             Add New
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //       <View
    //         style={{marginHorizontal: 15, marginBottom: 20, marginTop: 250}}>
    //         {/* <CustomButton
    //         onPress={this.s}
    //           text="Claim"
    //           routeName="ClaimPayment"
    //           data={this.state.bills}
    //           data1={this.state.selectedValue}
    //           data_ctg={this.state.ctg}
    //         /> */}
    //         <TouchableOpacity
    //           style={{
    //             backgroundColor: '#FF3301',
    //             padding: 14,
    //             borderRadius: 10,
    //           }}
    //           onPress={() => {
    //             let b = this.state.bills;
    //             var aa = this.state.title;
    //             var ab = this.state.qty;
    //             var ac = this.state.price;
    //             var result = ac * ab;
    //             var cat = this.state.selectedCtg;
    //             this.claim_handlePress();
    //             b.push({
    //               item: aa,
    //               price: ac,
    //               qty: ab,
    //               pkr: result,
    //               category: cat,
    //             });
    //             this.setState({bills: b});
    //           }}>
    //           <Text
    //             style={{
    //               alignSelf: 'center',
    //               color: '#FFF',
    //               alignContent: 'center',
    //               justifyContent: 'center',
    //             }}>
    //             Add Image
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </ScrollView>
    //   </View>
    // );

    return (
      <View style={{flex: 1}}>
        <Header />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            alignSelf: 'center',
            color: '#FF3301',
          }}>
          Claim Payment
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
            marginTop: 10,
          }}>
          <Picker
            selectedValue={this.state.selectedValue}
            prompt="Select Project"
            style={{
              width: 250,
              height: 60,
              alignSelf: 'center',
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
              marginBottom: 10,
              marginHorizontal: 25,
              marginTop: 10,
            },
          ]}>
          <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
            <TextInput
              style={{fontSize: 16}}
              placeholder="Item"
              onChangeText={title => this.setState({title})}
              ref={ref => (this.ref = ref)}
              value={this.state.title}
            />
            <View style={{marginBottom: 2}} />
          </View>

          <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
            <TextInput
              style={{fontSize: 16}}
              placeholder="Qty"
              keyboardType={'numeric'}
              onChangeText={qty =>
                this.setState({qty, results: this.state.price * this.state.qty})
              }
              ref={ref => (this.ref = ref)}
              value={this.state.qty}
            />
            <View style={{marginBottom: 2}} />
          </View>
          <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
            <TextInput
              style={{fontSize: 16}}
              placeholder="Rate"
              keyboardType={'numeric'}
              onChangeText={price => this.setState({price})}
              ref={ref => (this.ref = ref)}
              value={this.state.price}
            />
            <View style={{marginBottom: 2}} />
          </View>
          <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
            <Picker
              selectedValue={this.state.selectedCtg}
              prompt="Select Category"
              style={{
                width: 120,
                alignSelf: 'center',
                zIndex: 5,
                marginTop: 1,
                borderWidth: 1,
                color: '#FF3301',
                fontSize: 12,
              }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedCtg: itemValue});
                this.setState({selectedId: itemValue});
                console.log('selected: catogry' + this.state.selectedCtg);
              }}>
              {CtgItems}
            </Picker>
            <View style={{marginBottom: 2}} />
          </View>
          <View style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
            <TextInput
              style={{fontSize: 16}}
              placeholder="Total"
              keyboardType={'numeric'}
              ref={ref => (this.ref = ref)}
              defaultValue={'Total'}
              editable={false}
            />
            <View style={{marginBottom: 2}} />
          </View>
        </View>
        <View style={{flex: 1, marginHorizontal: 20, marginTop: 5}}>
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
                {/* <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {item.number}
                </Text> */}
                <View
                  style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
                  <Text>{item.item}</Text>
                  <View style={{marginBottom: 2}} />
                </View>
                <View
                  style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
                  <Text>{item.qty}</Text>

                  <View style={{marginBottom: 2}} />
                </View>
                <View
                  style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
                  <Text>{item.price}</Text>

                  <View style={{marginBottom: 2}} />
                </View>

                <View
                  style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
                  <Text>{item.category}</Text>

                  <View style={{marginBottom: 2}} />
                </View>
                <View
                  style={{borderBottomColor: '#FFCBBE', borderBottomWidth: 1}}>
                  <Text>{item.pkr}</Text>

                  <View style={{marginBottom: 2}} />
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text>Total: {this.state.totalC}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                } else {
                  let b = this.state.bills;
                  var aa = this.state.title;
                  var ab = this.state.qty;
                  var ac = this.state.price;
                  var ae = this.state.pkr;
                  var result = ac * ab;
                  var cat = this.state.selectedCtg;
                  var totall =
                    this.state.totalC + this.state.qty * this.state.price;
                  this.setState({
                    val: result,
                    totalC: totall,
                  });
                  n = n + 1;
                  b.push({
                    item: aa,
                    price: ac,
                    qty: ab,
                    pkr: result,
                    category: cat,
                  });
                  this.setState({
                    bills: b,
                    title: '',
                    qty: '',
                    price: '',
                    selectedCtg: '',
                  });
                  this.activate_();
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
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginHorizontal: 15, marginBottom: 20, marginTop: 10}}>
          <TouchableOpacity
            style={{backgroundColor: '#FF3301', padding: 14, borderRadius: 10}}
            disabled={this.state.disabledB}
            onPress={() => {
              this.claim_handlePress();
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#FFF',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              Add Claim Image
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
