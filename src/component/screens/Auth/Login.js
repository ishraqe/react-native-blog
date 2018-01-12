import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView ,Dimensions} from 'react-native';
import { CustomButton, Input } from "../../common";
import validate from '../../../Utility/validation';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loginUser} from '../../../store/actions'

class Login extends Component {

    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape',        
        controls: {
            email: {
                value:'',
                valid : false,
                validationRules : {
                    isEmail : true
                },
                touched :  false
            },
            password: {
                value:'',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            }
        }
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

    loginHandler = () => {
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        
        this.props.log_user_in({email, password});
    }

    updateInputState = (key, val) => {
        this.setState( prevState => {
            return {
                controls : {
                    ...prevState.controls,
                    [key] : {
                        ...prevState.controls[key], 
                        value : val,
                        valid : validate(val, prevState.controls[key].validationRules),
                        touched : true
                    }
                }
            }
        });
    }

    renderImageContainer = () => {
        const imageContainer = (
            <View style={styles.imageContainer}>
                <Image
                    style={styles.iconStyle}
                    source={require('../../../assets/loginIcon.png')}
                />
            </View>
        );

        if (this.state.viewMode === 'potrait') {
            return imageContainer;
        }
    }

    render() {
        return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    {this.renderImageContainer()}
                    <View style={styles.inputContainer}>
                        <Input
                            secureTextEntry={false}
                            iconName={'md-mail'}
                            placeholder={'E-mail'}
                            returnKeyType={'next'}
                            keyboardType='email-address'
                            autoCorrect={false}
                            style={styles.inputStyle}
                            labelStyl={styles.labelStyle}
                            value = {this.state.controls.email.value}
                            onChangeText={val => this.updateInputState('email', val)}
                            valid = {this.state.controls.email.valid}
                            touched = {this.state.controls.email.touched}                         
                        />
                        <View style={styles.passwordButtonStyle}>
                            <Input
                                secureTextEntry={true}
                                iconName={'md-lock'}
                                placeholder={'Password'}
                                labelStyl={styles.labelStyle}
                                style={styles.inputStyle}
                                value={this.state.controls.password.value}
                                onChangeText={ val => this.updateInputState('password', val)}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}        
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            onPress={this.loginHandler}
                            disable = {
                                !this.state.controls.email.valid ||
                                !this.state.controls.password.valid
                            }
                        >
                            Login
                        </CustomButton>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height : '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom : 30
    },
    iconStyle: {
        width: '70%',
        height: '100%'
    },
    inputContainer: {
        width: '100%',
        marginBottom:2 
    },
    inputStyle: {
        color: '#000',
        paddingTop: 3,
        width: '80%'
    },
    labelStyle: {
        paddingLeft: 20,
        width: '20%'
    },
    passwordButtonStyle : {
        marginBottom: 40
    }
});

const mapDispatchToProps = dispatch => {
   return {
       log_user_in: ({ email, password }) => dispatch (loginUser({email, password}))
   };
};

export default connect(null,mapDispatchToProps)(Login);