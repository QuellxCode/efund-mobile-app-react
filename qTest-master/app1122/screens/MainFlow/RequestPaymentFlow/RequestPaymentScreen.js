import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Text, TextInput } from 'react-native';
import Header from '../../../components/Header';
import CustomButton from '../../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import Bill from '../../../components/Bill';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainFlowStyles from '../../../Styles/MainFlowStyles'
let n = 1;
class RequestPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            qty: '',
            price: '',
            t_price: "",
            title: "",
            cat: '',
        };
        this.list = React.createRef();
    }
    Api_Call() {
        var aa = this.state.title;
        var ab = this.state.qty;
        var ac = this.state.price;
        var ad = this.state.cat;
        var ae = this.state.t_price;
        fetch('http://efundapp.herokuapp.com/api/purchase/post', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTRiY2ZkODA3YTNjNzJjZDBhYTZkYjMiLCJyb2xlcyI6IlN1cGVydmlzb3IiLCJpYXQiOjE1ODQxNTMxNDd9.Fl1kmsa4wsXik-QsEuRDCJe9l2G_o9FpauJOV-CdhyY"
            },
            body: JSON.stringify({
                "payment": "50000",
                "project": "5e4bd47e91b9bc3bd4fb4763",
                "details": [
                    {
                        "item_name": aa,
                        "item_quantity": ab,
                        "item_price": ac,
                        "category": ad,
                        "total_price": ae
                    }
                ]
            })
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
            .catch(error => {
                console.error(error);
            });
    }
    render_1 = () =>
        (
            <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}></Text>
                <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                    <TextInput style={{ fontSize: 16 }}
                        placeholder='Item'
                        onChangeText={(title) => this.setState({ title })}
                    ></TextInput>
                    <View style={{ marginBottom: 2 }} />
                </View>
                <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                    <TextInput style={{ fontSize: 16 }}
                        placeholder='price'
                        onChangeText={(price) => this.setState({ price })}

                    ></TextInput>
                    <View style={{ marginBottom: 2 }} />
                </View>
                <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                    <TextInput style={{ fontSize: 16 }}
                        placeholder='qty'
                        onChangeText={(qty) => this.setState({ qty })}

                    ></TextInput>
                    <View style={{ marginBottom: 2 }} />
                </View>
                <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput style={{ fontSize: 16 }}
                            placeholder='ctg'
                            onChangeText={(cat) => this.setState({ cat })}

                        ></TextInput>
                        <View style={{ justifyContent: 'flex-end', marginBottom: 2 }}>
                            <FontAwesome name='chevron-down' size={10} color='#FF3301' />
                        </View>
                    </View>
                    <View style={{ marginBottom: 2 }} />
                </View>
                <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                    <TextInput style={{ fontSize: 16 }}
                        placeholder='Pkr'
                        onChangeText={(t_price) => this.setState({ t_price })}
                    ></TextInput>
                    <View style={{ marginBottom: 2 }} />
                </View>
            </View>
        )
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
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
                            b.push({ number: n, item: '', price: '', qty: '', ctg: '', pkr: '' });
                            n = n + 1;
                            this.setState({ bills: b });
                            this.Api_Call();

                        }}
                    >
                        <AntDesign name='pluscircle' size={20} color='#FF3301' />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 15, marginBottom: 20, marginTop: 10 }}>
                    <CustomButton
                        text='Generate Bill'
                        routeName='GenerateBill'
                        data={this.state.bills}
                    />
                </View>
            </View>
        );
    }
}

export default RequestPayment;