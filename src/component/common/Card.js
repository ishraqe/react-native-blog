import React from 'react';
import {View} from 'react-native';


const Card = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles ={
    containerStyle : {
        shadowColor: '#000',
        shadowOffset: {width:0, height:2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        elevation: 1
    }
};

export {Card};