import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListView = (props) => {
    return (
        <TouchableOpacity>
            <View style={styles.viewStyle}>
                <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                    style={{ width: 400, height: 400 }} />

                <Text style={styles.textStyle}>{props.placeName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        width: '100%',
        backgroundColor: '#eee',
        marginBottom: 5,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        color: '#000'
    },
    imageStyle: {
        width: 40,
        height: 40,
        borderRadius: 50,
        margin: 8
    }
});

export { ListView};