import { Image, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { InterestType } from '../../../types';

const InterestName: ListRenderItem<InterestType> = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            {/* Icon */}
            <Image
                source={{ uri: item.avatar || 'https://via.placeholder.com/40' }}
                style={styles.icon}
            />
            {/* Text Content */}
            <View style={styles.textContainer}>
                <Text style={styles.primaryText}>{item.name.split('[')[0]} </Text>
                <Text style={styles.secondaryText}>
                    {item.name.match(/\[(.*?)\]/)?.[1]}
                </Text>
            </View>
        </View>
    );
};

export default InterestName;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    primaryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    secondaryText: {
        fontSize: 16,
        color: '#666',
    },
});
