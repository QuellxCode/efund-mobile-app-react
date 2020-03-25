import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Text, TouchableO, TextInput, KeyboardAvoidingView, Picker, AsyncStorage } from 'react-native';
import Header from '../../../components/Header';
import CustomButton from '../../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import Bill from '../../../components/Bill';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainFlowStyles from '../../../Styles/MainFlowStyles'
var n = 1;
const rs = 0;
class RequestPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            qty: '',
            price: '',
            pkr: "",
            title: '',
            cat: '',
            orderss: [],
            response_: '',
            project_name: '',
            project_id: '',
            Category: [],
            selectedValue: "",
            selectedProject: "",
            pkkr: '',
            User:'',
        };
        this.list = React.createRef();
    }
   async componentDidMount() {
       try {
        const value = await AsyncStorage.getItem('User');
        const val = JSON.parse(value)
        if (val !== null) {
            this.setState({
                User: val,
            })
              console.log(this.state.User)
        }
    } catch (error) {
        console.log('error getting data')
    }
    var thisdata =[]
    fetch('http://efundapp.herokuapp.com/api/project/mobile', {
        method: 'Get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.User.token,
        },
    })
        .then(response => response.json())
        .then(json => {
            json.project.map(dataItem => {
                if (dataItem.project != null) {
                    thisdata.push({
                        project_name: dataItem.project,
                        project_id: dataItem._id,
                    });
                }
                this.setState({ Category: thisdata })
            });
        })

        .catch(error => {
            console.error(error);
        });
      
}
    handlePress = async () => {
        //console.log(data)
        var aa = this.state.title;
        var ab = this.state.qty;
        var ac = this.state.price;
        var ae = this.state.pkr;
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
                    //console.log(json)
                    this.setState({ response_: json })
                    alert(JSON.stringify(this.state.response_))
                    //alert(this.state.selectedValue)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
    render_1 = ({ item }) =>
        (<KeyboardAvoidingView >
            <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}></Text>
                <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                    <TextInput style={{ fontSize: 16 }}
                        placeholder='Item'
                        onChangeText={(title) => this.setState({ title })}
                        ref={ref => this.ref = ref}
                    ></TextInput>
                    <View style={{ marginBottom: 2 }} />
                </View>
                <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                    <TextInput style={{ fontSize: 16 }}
                        placeholder='price'
                        keyboardType={'numeric'}
                        onChangeText={(price) => this.setState({ price })}
                        ref={ref => this.ref = ref}

                    ></TextInput>
                    <View style={{ marginBottom: 2 }} />
                </View>
                <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                    <TextInput style={{ fontSize: 16 }}
                        placeholder='qty'
                        keyboardType={'numeric'}
                        onChangeText={(qty) => this.setState({ qty })}
                        ref={ref => this.ref = ref}

                    ></TextInput>
                    <View style={{ marginBottom: 2 }} />
                </View>
                <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16 }}>
                      {
                          this.state.price* this.state.qty
                      }
                    </Text>
                    <View style={{ marginBottom: 2 }} />
                </View>
            </View>
        </KeyboardAvoidingView>
        )
        functiion(){

        }
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
                <Picker
                    selectedValue={this.state.selectedValue}
                    prompt="Select Project"
                    style={{
                        width: 250,
                        height: 60,
                        alignSelf: 'flex-end', zIndex: 5,
                        marginTop: 1,
                        borderWidth: 1,
                        //flexDirection: "row-reverse",
                        // color: "#000",
                        fontSize: 12
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ selectedValue: itemValue, })
                        this.setState({ selectedProject: itemValue, })
                        console.log("selected:val" + this.state.selectedValue)
                    }}
                >
                    <Picker.Item label='Select a Project' value='' />
                    {PickerItems}
                </Picker>
                <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 20 }]}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}></Text>
                    <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                        <TextInput style={{ fontSize: 16 }}
                            placeholder='Item'
                            onChangeText={(title) => this.setState({ title })}
                            ref={ref => this.ref = ref}
                        ></TextInput>
                        <View style={{ marginBottom: 2 }} />
                    </View>
                    <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                        <TextInput style={{ fontSize: 16 }}
                            placeholder='price'
                            keyboardType={'numeric'}
                            onChangeText={(price) => this.setState({ price })}
                            ref={ref => this.ref = ref}

                        ></TextInput>
                        <View style={{ marginBottom: 2 }} />
                    </View>
                    <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                        <TextInput style={{ fontSize: 16 }}
                            placeholder='qty'
                            keyboardType={'numeric'}
                            onChangeText={(qty) => this.setState({ qty })}
                            ref={ref => this.ref = ref}

                        ></TextInput>
                        <View style={{ marginBottom: 2 }} />
                    </View>
                    <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 16 }}>
                        {
                          this.state.price* this.state.qty
                      }
                        </Text>
                        <View style={{ marginBottom: 2 }} />
                    </View>
                </View>
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                    <FlatList
                        ref={this.list}
                        style={{ flexGrow: 0 }}
                        data={this.state.bills}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => this.list.current.scrollToEnd({ 'animated': false })}
                        //renderItem={({ item }) => <Bill item={item} />}
                        renderItem={this.render_1}
                    />
                    <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                        onPress={() => {
                            let b = this.state.bills;
                            var aa = this.state.title;
                            var ab = this.state.qty;
                            var ac = this.state.price;
                            var ae = this.state.pkr;
                            this.handlePress()
                        
                            //this.setState({ pkr: r })
                            var result=ac*ab
                            b.push({ number: n, item: aa, price: ac, qty: ab, pkr: result });
                            n = n + 1;
                            this.setState({ bills: b })
                            console.log(this.state.bills)
                        }
                        }
                    >
                        <AntDesign name='pluscircle' size={20} color='#FF3301' />
                    </TouchableOpacity>
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
                            let b = this.state.bills;
                            var rr = this.state.price * this.state.qty
                            b.push({ number: '9', item: this.state.title, price: this.state.price, qty: this.state.qty, pkr: rr });
                            this.setState({ bills: b }),
                                this.props.navigation.navigate('GenerateBill', {
                                    bill: this.state.bills,
                                    project: this.state.selectedProject
                                })
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
