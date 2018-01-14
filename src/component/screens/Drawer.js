import React, {Component} from 'react';
import { PropTypes } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import color from '../../assets/color';
import Icon from 'react-native-vector-icons/Ionicons';




class Drawer extends Component  {
    render () {
        return (
            <View style={[styles.container]}>
                <LinearGradient
                    colors={['#00FFFF', color.themeColor]}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={{ height: 210, width: '100%', alignItems: 'center', justifyContent: 'center', width: '100%'}}
                >  
                    <View>
                        <View style={styles.editController}>
                            <TouchableOpacity style={styles.editButtonStyle} >
                                <Text style={styles.editTextStyle}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.powerButtonStyle}>
                                <Icon
                                    size={20}
                                    name={'ios-power-outline'}
                                    style = {styles.powerIconStyle}
                                />
                            </TouchableOpacity>
                        </View> 
                        <View style={styles.profileContainer}>
                            <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                        </View>
                    </View>
                </LinearGradient>
              
               <View>
                    <Text>Setting</Text>
                    <Text>Setting</Text>
                    <Text>Setting</Text>
               </View>
            </View>
        );
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profileContainer : {
        // width : '100%',
        // height: 200,
        // backgroundColor: color.themeColor,
        // alignItems : 'center',
        // justifyContent: 'center',
        
    },
    editController: { 
        flexDirection: 'row', 
        alignItems: 'center',
        position: 'absolute',
    },
    profileImageStyle : {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    editButtonStyle: {
        marginTop: -70,
        left: -75
    },
    editTextStyle: {
        fontWeight: 'bold',
        color: '#fff'
    },
    powerButtonStyle: {
        marginTop: -70,
        right: -120,
        
    },
    powerIconStyle :{
        fontWeight: 'bold',
        color: '#fff'
    }
});


export default Drawer;