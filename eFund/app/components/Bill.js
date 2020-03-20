import React from 'react';
import { View, Text, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainFlowStyles from '../Styles/MainFlowStyles';

const Bill = ({ item }) => {
    return (
        <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.number}</Text>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <TextInput placeholder='Item' style={{ fontSize: 16 }}>{item.item}</TextInput>
                <View style={{ marginBottom: 2 }} />
            </View>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <TextInput placeholder='Price' style={{ fontSize: 16 }}>{item.price}</TextInput>
                <View style={{ marginBottom: 2 }} />
            </View>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <TextInput placeholder='qty' style={{ fontSize: 16 }}>{item.qty}</TextInput>
                <View style={{ marginBottom: 2 }} />
            </View>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <TextInput placeholder='pkr' style={{ fontSize: 16 }}>{item.pkr}</TextInput>
                <View style={{ marginBottom: 2 }} />
            </View>
        </View>
    );
};

export default Bill;