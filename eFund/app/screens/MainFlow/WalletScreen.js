import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import Header from '../../components/Header';
import MainFlowStyles from '../../Styles/MainFlowStyles';
const {width, height} = Dimensions.get('window');

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: [
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '500.00' },
                { date: '23/1/2020', transaction: 'Cash out via ATM', amount: '400.00' },
            ]
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                    <View style={[MainFlowStyles.cardStyle, { paddingBottom: 10, marginBottom: 10 }]}>
                        <View style={{ backgroundColor: '#FF3301', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 40, borderBottomColor: 'black', borderBottomWidth: 2 }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Wallet</Text>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Rs. 20,000</Text>
                        </View>

                        <View style={{ flexDirection: 'row', paddingBottom: 10, marginTop: 20, borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}>
                            <View style={{ width: (width - 40) / 3 }}>
                                <Text style={{ fontSize: 18, marginLeft: 10 }}>Date</Text>
                            </View>
                            <View style={{ width: (width - 40) / 3 }}>
                                <Text style={{ fontSize: 18 }}>Transaction</Text>
                            </View>
                            <View style={{ width: (width - 40) / 3, alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 18, marginRight: 10 }}>Amount</Text>
                            </View>
                        </View>
                        
                        <FlatList
                            style={{ maxHeight: height * 0.5 }}
                            data={this.state.wallet}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flexDirection: 'row', paddingBottom: 5, marginTop: 5, borderBottomColor: '#FFC1B2', borderBottomWidth: 1 }}>
                                        <View style={{ width: (width - 40) / 3, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 12, marginLeft: 10 }}>{item.date}</Text>
                                        </View>
                                        <View style={{ width: (width - 40) / 3, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>{item.transaction}</Text>
                                        </View>
                                        <View style={{ width: (width - 40) / 3, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>{item.amount}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default Wallet;