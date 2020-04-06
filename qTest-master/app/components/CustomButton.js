import React from 'react';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const CustomButton = ({ text, navigation, routeName, style, data, data1,data_ctg}) => {
    return (
        <Button
            title={text}
            buttonStyle={{ backgroundColor: '#FF3301', padding: 14, borderRadius: 10 }}
            containerStyle={[{ marginHorizontal: 10 }, style]}
            onPress={() => navigation.navigate(routeName, {data1:data, data2:data1,data3:data_ctg})}
        />
    );
};

export default withNavigation(CustomButton);