import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Button, Constants, FlatList, Text, TouchableO, TextInput, KeyboardAvoidingView, Picker, AsyncStorage , ScrollView} from 'react-native';
import Header from '../../../components/Header';
import CustomButton from '../../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bill from '../../../components/Bill';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainFlowStyles from '../../../Styles/MainFlowStyles'
import firebase from 'react-native-firebase';
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
            selectedProject: "",
            pkkr: '',
            User: '',
            data: '',
            check: true,
            results: 0,
            val: 0,
        };
        this.list = React.createRef();
    }
    async componentDidMount() {
          this.checkPermission();

        try {
            const value = await AsyncStorage.getItem('User');
            const val = JSON.parse(value)
            if (val !== null) {
                this.setState({
                    User: val,
                })
        
            }
        } catch (error) {
            console.log('error getting data')
        }
        var thisdata = []
        var arr = []
        fetch('http://efundapp.herokuapp.com/api/project/', {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.state.User.token,
            },
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ data: json.project })
                var v = this.state.data.length
                for (let i = 0; i < v; i++) {
                    console.log('v:' + json.project[i].project_name)
                    thisdata.push({
                        project_name: json.project[i].project_name,
                        project_id: json.project[i]._id,
                    });
                }
                this.setState({ Category: thisdata })
                //console.log("aaa" + JSON.stringify(this.state.Category));
            })

            .catch(error => {
                console.error(error);
            });

    }
  //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}
  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
          console.log("??",fcmToken)
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}



    handlePress = async () => {
        var aa = this.state.title;
        var ab = this.state.qty;
        var ac = this.state.price;
        var project = this.state.selectedValue;
        var r = this.state.price * this.state.qty
        var data = {
            "payment": "50000",
            "project": project,
            "details": [
                {
                    "item_name": aa,
                    "item_quantity": ab,
                    "item_price": ac,
                    "total_price": r
                }
            ]
        }
        if (data.details[0].item_name == '') {
            console.log('nt call a api')

        }
        else {
            fetch('http://efundapp.herokuapp.com/api/purchase/post', {
                method: 'Post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': this.state.User.token,
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    this.setState({ response_: json })
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
    // render_1 = () => (
    //     <KeyboardAvoidingView behavior="padding" >
    //         <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>

    //             <Text style={{ fontWeight: 'bold', fontSize: 16 }}></Text>
    //             <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
    //                 <TextInput style={{ fontSize: 16 }}
    //                     placeholder='Item'
    //                     onChangeText={(title) => this.setState({ title })}
    //                     ref={ref => this.ref = ref}
    //                 ></TextInput>
    //                 <View style={{ marginBottom: 2 }} />
    //             </View>
    //             <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
    //                 <TextInput style={{ fontSize: 16 }}
    //                     placeholder='price'
    //                     keyboardType={'numeric'}
    //                     onChangeText={(price) => this.setState({ price })}
    //                     ref={ref => this.ref = ref}

    //                 ></TextInput>
    //                 <View style={{ marginBottom: 2 }} />
    //             </View>
    //             <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
    //                 <TextInput style={{ fontSize: 16 }}
    //                     placeholder='qty'
    //                     keyboardType={'numeric'}
    //                     onChangeText={(qty) => this.setState({ qty })}
    //                     ref={ref => this.ref = ref}

    //                 ></TextInput>
    //                 <View style={{ marginBottom: 2 }} />
    //             </View>
    //             <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
    //                 {/* <Text style={{ fontSize: 16 }}
    //                    ref={ref => this.ref = ref}
    //                 >
    //                   {this.state.qty * this.state.price}

    //                 </Text> */}
    //                 <TextInput style={{ fontSize: 16 }}
    //                     // placeholder='qty'
    //                     // keyboardType={'numeric'}
    //                     // onChangeText={(qty) => this.setState({ qty })}
    //                      ref={ref => this.ref = ref}
    //                     // value={this.state.price * this.state.qty}
    //                     value={this.state.results}
    //                 ></TextInput>

    //                 <View style={{ marginBottom: 2 }} />
    //             </View>
    //         </View>
    //     </KeyboardAvoidingView>
    // )
    render() {
        const PickerItems = this.state.Category.map((element, index) => (
            <Picker.Item
                key={"pick" + element.project_name}
                label={"" + "    " + element.project_name}
                value={element.project_id}
                prompt='Options'
            />
        ));
        return (
            
            <View style={{ flex: 1 }}>
                <Header />
                <Text style={{ fontWeight: 'bold', fontSize: 30, alignSelf: 'center', color: '#FF3301' }}>Select Project</Text>
                <View style={{ borderColor: '#FF3301', borderWidth: 1, width: 250, height: 50, borderRadius: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }}>
                    <Picker
                        selectedValue={this.state.selectedValue}
                        prompt="Select Project"
                        style={{
                            width: 200, height: 50,
                            alignSelf: 'center',
                            marginTop: 1,
                            borderWidth: 2
                            , color: '#FF3301',
                            //alignSelf: 'flex-end',
                            // flexDirection: "row-reverse",
                            borderColor: 'red',
                            fontSize: 30
                        }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ selectedValue: itemValue })
                            console.log("selected:val" + this.state.selectedValue)

                        }}
                    >
                        {/* <Picker.Item label='   Select Project' value='' /> */}
                        {PickerItems}
                    </Picker>
                </View>
                {/* {this.state.bills.map((item, index) => ( */}
                {/* ))}    */}
                <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, marginHorizontal: 25, marginTop: 10 }]}>

                    <Text style={{ fontWeight: 'bold', fontSize: 16, alignSelf:'center' }}>Add Item</Text>
                    <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                        <TextInput style={{ fontSize: 16 }}
                            placeholder='Item'
                            onChangeText={(title) => this.setState({ title })}
                            ref={ref => this.ref = ref}
                            value={this.state.title}
                        ></TextInput>
                        <View style={{ marginBottom: 2 }} />
                    </View>
                    <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                        <TextInput style={{ fontSize: 16 }}
                            placeholder='price'
                            keyboardType={'numeric'}
                            onChangeText={(price) => this.setState({ price })}
                            ref={ref => this.ref = ref}
                            value={this.state.price}

                        ></TextInput>
                        <View style={{ marginBottom: 2 }} />
                    </View>
                    <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                        <TextInput style={{ fontSize: 16 }}
                            placeholder='qty'
                            keyboardType={'numeric'}
                            onChangeText={(qty) => this.setState({ qty, results: this.state.price * this.state.qty })}
                            ref={ref => this.ref = ref}
                            value={this.state.qty}

                        ></TextInput>
                        <View style={{ marginBottom: 2 }} />
                    </View>
                    <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                        {/* <Text style={{ fontSize: 16 }}>
                            
                         </Text> */}
                         {/* <TextInput style={{ fontSize: 16 }}
                            // placeholder='qty'
                            // keyboardType={'numeric'}
                            // onChangeText={(qty) => this.setState({ qty, results: this.state.price * this.state.qty })}
                            ref={ref => this.ref = ref}
                            value={this.state.result}

                        ></TextInput> */}
                        <View style={{ marginBottom: 2 }} />
                    </View>
                </View>
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 5 }}>
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
                    {this.state.bills.map((item, index) =>(
                       
                        <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>
            
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.number}</Text>
                            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                                {/* <TextInput style={{ fontSize: 16 }}
                                    placeholder='Item'
                                    // onChangeText={(title) => this.setState({ title })}
                                    // ref={ref => this.ref = ref}
                                ></TextInput> */}
                                    <Text>{item.item}</Text>
                                  <View style={{ marginBottom: 2 }} />
                            </View>
                            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                                {/* <TextInput style={{ fontSize: 16 }}
                                    placeholder='price'
                                    keyboardType={'numeric'}
                                    onChangeText={(price) => this.setState({ price })}
                                    ref={ref => this.ref = ref}
            
                                ></TextInput> */}
                                    <Text>{item.price}</Text>

                                <View style={{ marginBottom: 2 }} />
                            </View>
                            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                                {/* <TextInput style={{ fontSize: 16 }}
                                    placeholder='qty'
                                    keyboardType={'numeric'}
                                    onChangeText={(qty) => this.setState({ qty })}
                                    ref={ref => this.ref = ref}
            
                                ></TextInput> */}
                                    <Text>{item.qty}</Text>

                                <View style={{ marginBottom: 2 }} />
                            </View>
                            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
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

            
                                <View style={{ marginBottom: 2 }} />
                            </View>
                        </View>
                         
                                           ))}
                                            </ScrollView>

                    <View style={{ flexDirection: "row", justifyContent: "center" }}>

                        <TouchableOpacity
                            style={{ alignSelf: 'center', alignContent: 'center', backgroundColor: '#FF3301', height: 40, width: 100, borderRadius: 20, justifyContent: "center" }}
                            onPress={() => {
                                let b = this.state.bills;
                                var aa = this.state.title;
                                var ab = this.state.qty;
                                var ac = this.state.price;
                                var ae = this.state.pkr;
                                var result = ac * ab;
                                this.setState({val: result})
                                this.handlePress();
                                n = n + 1
                                b.push({ number: n, item: aa, price: ac, qty: ab, pkr: result });
                                this.setState({ bills: b, title:'', qty: '', price: '' })
                                console.log("arr from button", this.state.bills)
                                
                            }
                            }
                        >
                            <Text style={{ alignSelf: 'center', color: '#FFF', alignContent: 'center', justifyContent: "center" }}>Add New</Text>

                            {/* <AntDesign name='pluscircle' size={20} color='#FF3301' /> */}
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
                <View style={{ marginHorizontal: 15, marginBottom: 20, marginTop: 10 }}>
                    {/* <CustomButton
                        text='Generate Bill'
                        routeName='GenerateBill'
                        data={this.state.bills}
                        data1={this.state.selectedValue}
                    /> */}
                    <TouchableOpacity
                        style={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10 }}
                        onPress={() => {
                            if (this.state.check == true) {
                                let b = this.state.bills;
                                var aa = this.state.title;
                                var ab = this.state.qty;
                                var ac = this.state.price;
                                var ae = this.state.pkr;
                                var result = ac * ab
                                b.push({ title: aa, price: ac, qty: ab, pkr: result });
                                this.setState({ bills: b, check: false })
                                this.props.navigation.navigate('GenerateBill', {
                                    bill: this.state.bills,
                                    project: this.state.selectedValue
                                })
                            }
                            else {
                                this.props.navigation.navigate('GenerateBill', {
                                    bill: this.state.bills,
                                    project: this.state.selectedValue
                                })
                            }
                        }}
                    >
                        <Text
                            style={{ fontSize: 20, alignSelf: "center", color: "white" }}
                        >Generate Bill</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            
        );
    }
}
export default RequestPayment;
