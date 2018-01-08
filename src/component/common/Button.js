import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = (props) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
            <Text style={textStyle}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#3ac665',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#3ac665',
        width: '50%',
        borderRadius: 20
    }
};

export { CustomButton };