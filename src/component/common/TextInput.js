import React from 'react';
import {View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../../assets/color';

const Input = (props)=>{
    const 
        {
            label, iconName, value, onChangeText, placeholder, 
            secureTextEntry,returnKeyType, keyboardType, autoCorrect,
            labelStyl, style, valid, touched
        } = props;
    
    const {inputStyle, labelStyle, containerStyle, invalidColor} = styles;
    
    return (
        <View style={containerStyle}>
            <Icon
                size={30}
                color= {color.greyColor}
                name={iconName}
                style={[styles.labelStyle, labelStyl]}
            />
            <TextInput
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                placeholder={placeholder}
                style={[inputStyle, style ]}
                value={value}
                onChangeText={onChangeText}
                returnKeyType={returnKeyType}
                keyboardType={keyboardType}
                autoCorrect={autoCorrect}
                underlineColorAndroid={ !valid && touched ? 'red' : color.themeColor }
            />
        </View>
    );
};

const styles={
    inputStyle: {
        fontSize:14,
        flex:5,
        height: 40
    },
    labelStyle:{
        flex:1,
        height: 30
    },
    containerStyle:{
        height:40,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        margin: 30
    }
}

export {Input }