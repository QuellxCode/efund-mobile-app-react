import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainFlowStyles from '../Styles/MainFlowStyles';

const Bill = ({ item }) => {
    return (
        <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.number}</Text>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 16 }}>{item.item}</Text>
                <View style={{ marginBottom: 2 }} />
            </View>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 16 }}>{item.price}</Text>
                <View style={{ marginBottom: 2 }} />
            </View>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 16 }}>{item.qty}</Text>
                <View style={{ marginBottom: 2 }} />
            </View>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16 }}>{item.ctg} </Text>
                    <View style={{ justifyContent: 'flex-end', marginBottom: 2 }}>
                        <FontAwesome name='chevron-down' size={10} color='#FF3301' />
                    </View>
                </View>
                <View style={{ marginBottom: 2 }} />
            </View>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 16 }}>{item.pkr}</Text>
                <View style={{ marginBottom: 2 }} />
            </View>
        </View>
    );
};

export default Bill;