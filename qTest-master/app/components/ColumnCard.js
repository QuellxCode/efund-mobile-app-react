import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import MainFlowStyles from '../Styles/MainFlowStyles';
import { withNavigation } from 'react-navigation';

const ColumnCard = ({ navigation }) => {
    return (
        <>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TouchableOpacity
                    style={[MainFlowStyles.cardStyle, { flex: 1, padding: 30, paddingVertical: 50, alignItems: 'center', justifyContent: 'center', marginRight: 20 }]}
                    onPress={() => navigation.navigate('generate')}
                >
                    <Image
                        source={require('../images/GenerateOrderBig.png')}
                        style={{ marginBottom: 20 }}
                    />
                    <Text style={MainFlowStyles.cardTextStyle}>{'Generate\nOrder'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[MainFlowStyles.cardStyle, { flex: 1,padding: 30, paddingVertical: 50, alignItems: 'center', justifyContent: 'center' }]}
                    onPress={() => navigation.navigate('Reports')}
                >
                    <Image
                        source={require('../images/ReportsBig.png')}
                        style={{ marginBottom: 20 }}
                    />
                    <Text style={MainFlowStyles.cardTextStyle}>{'Reports'}</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TouchableOpacity
                    style={[MainFlowStyles.cardStyle, { flex: 1, padding: 30, paddingVertical: 50, alignItems: 'center', justifyContent: 'center', marginRight: 20 }]}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Image
                        source={require('../images/SettingsBig.png')}
                        style={{ marginBottom: 20 }}
                    />
                    <Text style={MainFlowStyles.cardTextStyle}>{'Settings'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1,padding: 30, paddingVertical: 50, alignItems: 'center', justifyContent: 'center' }}
                />
                    
            </View>
        </>
    );
};

export default withNavigation(ColumnCard);