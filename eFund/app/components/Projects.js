import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainFlowStyles from '../Styles/MainFlowStyles';

const Projects = ({ item }) => {
    return (
        <View style={[MainFlowStyles.cardStyle, { padding: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, marginHorizontal: 5 }]}>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <Text onPress={() => navigation.navigate('requestPaymentFlow')} style={{ fontSize: 16 }}>{item.project}</Text>
                <View style={{ marginBottom: 2 }} />
            </View>
            <View style={{ borderBottomColor: '#FFCBBE', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 16 }}>{item.payment}</Text>
                <View style={{ marginBottom: 2 }} />
            </View>
        </View>
    );
};

export default Projects;