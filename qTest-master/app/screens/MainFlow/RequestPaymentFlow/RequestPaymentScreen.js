import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../../components/Header';
import CustomButton from '../../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bill from '../../../components/Bill';

class RequestPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: []
        };
        this.list = React.createRef();
    }

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
                        renderItem={({ item }) => <Bill item={item} /> }
                    />

                    <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                        onPress={() => {
                            let b = this.state.bills;
                            b.push({ number: '01', item: 'Item', price: 'Price', qty: 'Qty', ctg: 'Ctg', pkr: 'Pkr' });
                            this.setState({ bills: b });
                        }}
                    >
                        <AntDesign name='pluscircle' size={20} color='#FF3301' />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 15, marginBottom: 20, marginTop: 10 }}>
                    <CustomButton
                        text='Generate Bill'
                        routeName='GenerateBill'
                    />
                </View>
            </View>
        );
    }
}

export default RequestPayment;