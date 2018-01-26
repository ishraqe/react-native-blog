import React from 'react';
import {Text, Modal, View} from 'react-native';
import {CardSection} from './CardSection';
import {Button} from  './Button';

const Confirm = ({children, visible, onAccept, onDecline}) => {
    const {containerStyle, textStyle, cardSectionStyle} = styles;
    
    return (
       <Modal
        transparent 
        animationType ='slide'
        onRequestClose={()=>{}}
        visible={visible}
       >
          <View style={containerStyle}>
                {children}
          </View> 
       </Modal> 
    );    
};
const styles={
    cardSectionStyle: {
       backgroundColor: 'red',
       width: '100%',
       height: '100%'
    },
    containerStyle:{
        backgroundColor:'#fff',
        height: 300,
        width:'100%',
        position: 'absolute',
        bottom: 0

    }
}

export {Confirm};