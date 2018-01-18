import React from 'react';
import { View,Text, TouchableNativeFeedback } from 'react-native';
import color from '../../assets/color';
const CustomButton = (props) => {
    const { buttonStyle, textStyle, disabledColor, disabledText } = styles;
    const content = (
        <View style={[buttonStyle, props.style, props.disable ? disabledColor : null]}>
            <Text style={[textStyle, props.disable ? disabledText : null]}>
                {props.children}
            </Text>
        </View>
    );
    if (props.disable) {
        return content;
    }
    return (
        <TouchableNativeFeedback onPress={props.onPress} >
           {content}
        </TouchableNativeFeedback>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: color.themeColor,
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: color.themeColor,
        width: '50%',
        borderRadius: 20
    },
    disabledColor : {
        borderColor: color.greyColor
    },
    disabledText : {
        color: color.greyColor
    }
};

export { CustomButton };