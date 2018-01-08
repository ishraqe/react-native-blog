import React from 'react';
import { PropTypes } from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";

import { Actions } from 'react-native-router-flux';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderWidth: 2,
        borderColor: 'red',
    },
});

const TabView = () => {
    return (
        <View style={[styles.container]}>
            <Text>Tab title</Text>
        </View>
    );
};


export default TabView;