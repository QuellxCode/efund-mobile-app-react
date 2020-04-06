import React from 'react';
import { FlatList, View, Text } from 'react-native';

const Timeline = ({ data }) => {
    return (
        <FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item, index}) => {
                return (
                    <View style={{ width: 70 }}>
                        <View style={{ height: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            {index !== 0 ? (
                                <View style={{ width: 30, borderBottomColor: '#FF3301', borderBottomWidth: 1 }} />
                            ): (
                                <View style={{ width: 30 }} />
                            )}
                            <View style={{ width: 14, height: 14, borderRadius: 14 / 2, backgroundColor: item.select ? '#FF3301' : '#FFC1B2' }} />
                            {index !== data.length - 1 ? (
                                <View style={{ width: 30, borderBottomColor: '#FF3301', borderBottomWidth: 1 }} />
                            ) : (
                                <View style={{ width: 30 }} />
                            )}
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12 }}>{item.name}</Text>
                        </View>
                    </View>
                );
            }}
        />
    );
}

export default Timeline;