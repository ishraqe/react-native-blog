import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, AsyncStorage } from "react-native";
import { CustomButton } from '../../common/index';
import {Actions} from 'react-native-router-flux';



class AuthScreen extends Component {
    loginScreen = () => {
        Actions.login();
    }
    signUpScreen = () => {
        Actions.signUpScreen();
    }
    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape'
    }
    constructor(props) {
        super(props);

        Dimensions.addEventListener('change', this.updateMode);
    }

    componentWillUnmount () {
        Dimensions.removeEventListener('change', this.updateMode);
    }
    componentDidMount () {
        
        // AsyncStorage.getItem('as:auth:user')
        //     .then(
        //         user => {
        //             if (user) {
        //                 Actions.lightbox(); 
        //             }
        //         }
        //     )
        //     .catch(err => Actions.auth())
    }
    updateMode = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'potrait' : 'landscape'
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={this.state.viewMode === 'potrait' ? styles.potraitLogoContainer : styles.landscapeLogoContainer}>
                    <Image
                        style={this.state.viewMode === 'potrait' ?  styles.potraitLogoStyle : styles.landscapeLogoStyle}
                        source={require('../../../assets/story.png')}
                    />
                </View>
                <View style={this.state.viewMode === 'potrait' ? styles.potraitImageContainer : styles.landscapeImageContainer}>
                    <Image
                        style={this.state.viewMode === 'potrait' ? styles.potraitIconStyle : styles.landscapeIconStyle}
                        source={require('../../../assets/icon.png')}
                    />
                </View>
                <View style={this.state.viewMode === 'potrait' ? styles.potraitButtonContainer : styles.landscapeButtonContainer}>
                    <View style={this.state.viewMode === 'potrait' ? styles.potraitButtonWrapper : styles.landscapeButtonWrapper}>
                        <CustomButton 
                            onPress={this.signUpScreen}
                            style={this.state.viewMode === 'potrait' ? styles.potraitSignUpButton : styles.landscapeSignUpButton}
                        >
                            Sign Up
                        </CustomButton>
                    </View>
                    <View style={this.state.viewMode === 'potrait' ? styles.potraitButtonWrapper : styles.landscapeButtonWrapper}>
                        <CustomButton
                            onPress={this.loginScreen}
                        >
                            Login
                        </CustomButton>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    potraitLogoContainer: {
        flex: 1,
        alignItems: 'center',
        paddingLeft:  15,
        paddingRight: 15 
    },
    landscapeLogoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent:  'center'
    },
    potraitImageContainer: {
        flex: 1,
        marginTop:  -100 
    },
    landscapeImageContainer: {
        flex: 1,
        alignItems: 'center'
    },
    potraitButtonContainer: {
        flex: 1,
        flexDirection:  'column',
        justifyContent:'center',
        alignItems: 'center',
    },
    landscapeButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:  70,
        paddingRight: 70
    },
    potraitButtonWrapper : {
        alignItems: 'center',
        width: '100%'
    },
    landscapeButtonWrapper: {
        alignItems: 'center',
        width: '50%'
    },
    potraitSignUpButton: {
        marginBottom: 10,
       
    },
    landscapeSignUpButton: {
        
    },
    potraitIconStyle: {
        width: '100%',
        height:  '100%' 
    },
    landscapeIconStyle: {
        width: '45%',
        height: '100%'
    },
    potraitLogoStyle: {
        width:  '100%',
        height:  '20%' ,
        marginTop:  20 
    },
    landscapeLogoStyle: {
        width: '50%',
        height:  '50%'
    }
});

export default AuthScreen;