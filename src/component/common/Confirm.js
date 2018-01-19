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
            <CardSection style={cardSectionStyle}>
                {children}
            </CardSection>
          </View> 
       </Modal> 
    );    
};
const styles={
    cardSectionStyle: {
       backgroundColor: '#fff',
       flex: 1
    },
    textStyle:{
        flex:1,
        fontSize:18,
        textAlign:'center',
        lineHeight:40
    },
    containerStyle:{
        backgroundColor:'#fff',
        flex:1,
        width:'100%',
    }
}

export {Confirm};