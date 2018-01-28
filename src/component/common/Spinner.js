import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import color from '../../assets/color';

const Spinner = ({size}) =>{
    return (
        <View style ={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} color={color.themeColor} />
        </View>
    );
};

const styles = {
    spinnerStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export {Spinner};