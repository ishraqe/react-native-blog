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
                    <TouchableOpacity
                        onPress={Actions.landing_page}
                    >
                        <View style={styles.notificationContainer} >
                            <Icon
                                size={25}
                                name={`ios-home-outline`}
                                text={`My Account`}
                            />
                            <Text style={[{ fontSize: 19 }, styles.marginTOLeft]}>Home</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={Actions.profile_page}
                    >
                        <View style={styles.notificationContainer} >
                            <Icon
                                size={25}
                                name={`ios-person-outline`}
                                text={`My Account`}
                            />
                            <Text style={[{ fontSize: 19 }, styles.marginTOLeft]}>Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={Actions.settings_page}
                    >
                        <View style={styles.notificationContainer} >
                            <Icon
                                size={25}
                                name={`ios-settings-outline`}
                                text={`My Account`}
                            />
                            <Text style={[{ fontSize: 19 }, styles.marginTOLeft]}>Settings</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.switchContainer}>
                        <View style={styles.notificationContainer}>
                            <Icon
                                size={25}
                                name={`ios-notifications-outline`}
                                text={`My Account`}
                            />
                            <Text style={[{ fontSize: 19 }, styles.marginTOLeft]}>Notifications</Text>
                        </View>
                        <Switch
                            onTintColor={color.themeColor}
                            thumbTintColor={color.themeColor}
                            value={this.state.value}
                            style={{ marginLeft: -40 }}
                            onValueChange={() => this.setState({ value: !this.state.value })}
                        />
                    </View>
                    <TouchableOpacity style={{
                        position: 'absolute', bottom: 230, paddingLeft: 10
                        }}>
                        <View style={styles.notificationContainer} >
                            <Icon
                                size={25}
                                color='red'
                                name={`ios-nuclear-outline`}
                                text={`My Account`}
                            />
                            <Text style={[styles.settingsText, styles.marginTOLeft]}>Delete My Account</Text>
                        </View>

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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom : 10
    },
    notificationContainer :{
        width: '100%',
        flexDirection: 'row',
        marginTop: 10
    },
    marginTOLeft: {
        marginLeft: 7
    }
});


export default Drawer;