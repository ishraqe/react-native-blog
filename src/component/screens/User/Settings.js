import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import color from '../../../assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomButton } from '../../common';

class Settings extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape'
    }
    constructor(props) {
        super(props);

        Dimensions.addEventListener('change', this.updateMode);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateMode);
    }

    updateMode = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'potrait' : 'landscape'
        })
    }
    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView style={{ backgroundColor: '#fff', marginBottom: 100}}>
                <View style={styles.profileImageContainer}>
                        <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                        <Text style={styles.headerText}>INFO</Text>
                        <View style={this.state.viewMode === 'potrait' ? styles.potraitIconContainer : styles.landscapeIcontainer}>
                            <TouchableOpacity>
                                <Icon
                                    size={18}
                                    color={color.themeColor}
                                    name={`ios-brush-outline`}
                                    text={`My Account`}
                                />
                            </TouchableOpacity>
                        </View>
                </View>
                <View style={styles.profileInfoContainer}>
                        <TouchableOpacity>
                            <View style={styles.profileInfoWrapper}>
                                <Text style={styles.label}>Fullname</Text>
                                <Text style={styles.input}>Blake Lively</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.profileInfoWrapper, { borderBottomColor: '#fff'}]}>
                                <Text style={styles.label}>Email</Text>
                                <Text style={styles.input}>sbstarboy007@gmail.com</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                    <View style={{
                        height: 50, width: '100%',   borderBottomWidth: 1,
                        borderBottomColor: color.borderBottomColor}}>
                        <Text style={[styles.headerText, {top: 1}]}>CHANGE PASSWORD</Text>
                    </View>
                    <View style={styles.passwordContainer}>
                        <TouchableOpacity>
                            <View style={styles.profileInfoWrapper}>
                                <Text style={styles.label}>Old Password</Text>
                                <Text style={styles.input}>........</Text>
                            </View>
                            <View style={styles.profileInfoWrapper}>
                                <Text style={styles.label}>New Password</Text>
                                <Text style={styles.input}>........</Text>
                            </View>
                            <View style={[styles.profileInfoWrapper, {borderBottomColor: '#fff'}]}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <Text style={styles.input}>........</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View 
                    style={{
                        position: 'absolute', borderTopWidth: 1,
                        borderTopColor: color.borderBottomColor, 
                        bottom: 10, width: '100%',
                        backgroundColor: '#fff',
                        height: 100
                    }}
                >
                    <TouchableOpacity style={styles.gradientWrapper}>
                        <View style={styles.gradientWrapper} >
                            <LinearGradient
                                colors={['#00FFFF', color.themeColor]}
                                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                style={styles.gradientContainer}
                            >
                                <Text style={styles.textStyle}>SAVE CHANGES</Text>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles= StyleSheet.create({
    profileImageContainer : {
        height: 250,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,        
        borderBottomColor: color.borderBottomColor
    },
    profileImageStyle: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    potraitIconContainer: { 
        backgroundColor:'#fff', 
        width: 26, 
        height: 26, 
        borderRadius: 13, 
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: '34%',
        top: '62%',
        borderWidth: 1,
        borderColor: color.borderBottomColor 
    },
    landscapeIcontainer: {
        backgroundColor: '#fff',
        width: 26,
        height: 26,
        borderRadius: 13,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: '40%',
        top: '60%',
        borderWidth: 1,
        borderColor: color.borderBottomColor
    },
    headerText :{
        fontSize: 19, 
        color: 'red',
        fontWeight: '500',
        position: 'absolute',
        bottom: 10, 
        left: 10,
        marginTop: 10
    },
    profileInfoContainer : {
        height: 160,
        width: '100%',
    },
    profileInfoWrapper : {
        height: 80,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: color.borderBottomColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    label : {
        fontSize: 19,
        color: color.greyColor,
        fontWeight: '300',
    },
    input: {
        fontSize: 19,
        color: '#000',
        fontWeight: '500',
    },
    passwordContainer : {
        width: '100%',
        height: 250
    },
    gradientContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        width: '80%',
        borderRadius: 25,
        marginBottom: 20,
        marginTop: 20,
       
    },
    gradientWrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',

    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
}); 

export default Settings;