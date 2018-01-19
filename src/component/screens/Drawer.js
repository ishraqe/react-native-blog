import React, {Component} from 'react';
import { PropTypes } from "react";
import {
     StyleSheet,
     Text, View, 
     TouchableOpacity, 
     Image, Switch,
     TouchableWithoutFeedback 
    } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import color from '../../assets/color';
import Icon from 'react-native-vector-icons/Ionicons';




class Drawer extends Component  {
    state = {
      
        value: false
    
    }
    switchValue = () => {
       this.setState(prevState => {
           return {
              
            value : !this.state.value
               
           }
       });
    }
    render () {
        return (
            <View style={[styles.container]}>
                <LinearGradient
                    colors={['#00FFFF', color.themeColor]}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={styles.gradientContainer}
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
                        <TouchableWithoutFeedback
                            onPress={Actions.profile_page}    
                        >
                            <View style={styles.profileContainer}>
                                <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                                <Text style={styles.nameStyle} >Blake Lively</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </LinearGradient>
               <View style= {styles.settingsContainer}>
                    <View style={styles.switchContainer}>
                        <Text style={{fontSize: 19}}>Notifications</Text>
                        <Switch 
                            onTintColor={color.themeColor}
                            thumbTintColor = {'#fff'}
                            value={this.state.value}
                            onValueChange={() => this.setState({ value : !this.state.value })}
                        />
                    </View>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 19 }}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 19 }}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style= {{fontSize: 19}}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        position: 'absolute', bottom: 230, paddingLeft: 10
                        }}>
                        <Text style = {styles.settingsText}>Delete My Account</Text>
                    </TouchableOpacity>
               </View>
            </View>
        );
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradientContainer: { 
        height: '35%',
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%'
    },
    profileContainer : {
        alignItems : 'center',
        justifyContent: 'center',
        
    },
    nameStyle : {
        fontWeight: 'bold',
        fontSize: 21,
        color: '#fff'
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
        marginTop: -50,
        left: -75
    },
    editTextStyle: {
        fontWeight: 'bold',
        color: '#fff'
    },
    powerButtonStyle: {
        marginTop: -50,
        right: -128
    },
    powerIconStyle :{
        fontWeight: 'bold',
        color: '#fff'
    },
    settingsContainer : {
        width : '100%',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20
    },
    settingsText: {
        fontSize: 18,
        color: 'red'
    },
    switchContainer : {
        flexDirection: 'row',
        justifyContent : 'space-between',
        marginBottom : 10
    }
});


export default Drawer;