import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import MainFlowStyles from '../Styles/MainFlowStyles';
import { withNavigation } from 'react-navigation';

const TwoColumnCard = ({ navigation }) => {
    return (
        <>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TouchableOpacity
                    style={[MainFlowStyles.cardStyle, { flex: 1, padding: 30, paddingVertical: 50, alignItems: 'center', justifyContent: 'center', marginRight: 20 }]}
                    onPress={() => navigation.navigate('requestPaymentFlow')}
                >
                    <Image
                        source={require('../images/RequestPaymentBig.png')}
                        style={{ marginBottom: 20 }}
                    />
                    <Text style={MainFlowStyles.cardTextStyle}>{'Request\nPayment'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[MainFlowStyles.cardStyle, { flex: 1,padding: 30, paddingVertical: 50, alignItems: 'center', justifyContent: 'center' }]}
                    onPress={() => navigation.navigate('ClaimPayment')}
                >
                    <Image
                        source={require('../images/ClaimPaymentBig.png')}
                        style={{ marginBottom: 20 }}
                    />
                    <Text style={MainFlowStyles.cardTextStyle}>{'Claim\nPayment'}</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TouchableOpacity
                    style={[MainFlowStyles.cardStyle, { flex: 1, padding: 30, paddingVertical: 50, alignItems: 'center', justifyContent: 'center', marginRight: 20 }]}
                    onPress={() => navigation.navigate('GeneratePayOrder')}
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
                    style={[MainFlowStyles.cardStyle, { flex: 1,padding: 30, paddingVertical: 50, alignItems: 'center', justifyContent: 'center' }]}
                    onPress={() => navigation.navigate('Wallet')}
                >
                    <Image
                        source={require('../images/WalletBig.png')}
                        style={{ marginBottom: 20 }}
                    />
                    <Text style={MainFlowStyles.cardTextStyle}>{'Wallet'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default withNavigation(TwoColumnCard);