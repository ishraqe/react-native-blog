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
                <Text style={textStyle}>{children}</Text>
            </CardSection>
            <CardSection style={cardSectionStyle}>
                <Button onPress={onAccept}>Yes</Button>
                <Button onPress={onDecline}>No</Button>
            </CardSection>
          </View> 
       </Modal> 
    );    
};
const styles={
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle:{
        flex:1,
        fontSize:18,
        textAlign:'center',
        lineHeight:40
    },
    containerStyle:{
        backgroundColor:'rgba(0,0,0,0.75)',
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        position: 'relative',
    }
}

export {Confirm};