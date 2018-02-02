import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import color from '../../../assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomButton, Input } from '../../common';
import {connect} from 'react-redux';
import validate from '../../../Utility/validation';
import { updateUserName} from '../../../store/actions';
class Settings extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape',
            fullnameBoxTouched: false,
            emailBoxTouched: false,            
            controls: {
                email: {
                    value: '',
                    valid: true,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false
                },
                password: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 6
                    },
                    touched: false
                },
                fullname: {
                    value: '',
                    valid: true,
                    validationRules: {
                        lastName: true
                    },
                    touched: false
                }
            }
        },
        Dimensions.addEventListener('change', this.updateMode);
    }
    componentWillMount() {
        Dimensions.removeEventListener('change', this.updateMode);
        if (this.props.userInfo) {
            this.setState({
                controls: {
                    fullname: {
                        value: this.props.userInfo.fullname,
                        valid: true,
                        validationRules: {
                            lastName: true
                        },
                        touched: false
                    }
                }
            })
        }
        if (this.props.user) {
            this.setState({
                controls: {
                    email: {
                        value: '',
                        valid: true,
                        validationRules: {
                            isEmail: true
                        },
                        touched: false
                    },
                }
            })
        }
    }

    updateMode = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'potrait' : 'landscape'
        })
    }

    changeIntoInput = (type) => {
        switch (type) {
            case 'fullname':
                this.setState({
                    fullnameBoxTouched: true
                })
            break;
            case 'email': 
                this.setState({
                    emailBoxTouched: true
                })
            default:
                break;
        }
    }

    renderNameInput = () => {
        if (this.state.fullnameBoxTouched) {
            return (
                <View style={styles.profileInfoWrapper}>
                    <Text style={styles.label}>Fullname</Text>
                    <Input
                        style={styles.input}
                        secureTextEntry={false}
                        autoCorrect={false}
                        value={this.state.controls.fullname.value}
                        onChangeText={(val) => this.updateInputState('fullname', val)}
                        valid={this.state.controls.fullname.valid}
                        touched={this.state.controls.fullname.touched}
                    />
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this.changeIntoInput('fullname')}
                >
                    <View style={styles.profileInfoWrapper}>
                        <Text style={styles.label}>Fullname</Text>
                        <Text style={styles.input}>{this.state.controls.fullname.value}</Text>
                    </View>
                </TouchableOpacity>
            ); 
        }
    }
    renderEmailInput = () => {

        if (this.state.emailBoxTouched) {
            return (
                <View style={styles.profileInfoWrapper}>
                    <Text style={styles.label}>Email</Text>
                    <Input
                        style={styles.input}
                        secureTextEntry={false}
                        placeholder={'E-mail'}
                        keyboardType='email-address'
                        autoCorrect={false}
                        value={this.state.controls.email.value}
                        onChangeText={val => this.updateInputState('email', val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}  
                    />
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this.changeIntoInput('email')}
                >
                    <View style={[styles.profileInfoWrapper, { borderBottomColor: '#fff' }]}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.input}>sbstsr</Text>
                    </View>
                </TouchableOpacity>
            );
        } 
    }
    updateInputState = (key, val) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: val,
                        valid: validate(val, prevState.controls[key].validationRules),
                        touched: true
                    }
                }
            }
        });
        console.log(this.state.controls);
    }

    updateInfo = () => {
        if (this.state.controls.fullname.touched && this.state.controls.fullname.valid) {
            const userId = this.props.user.uid;
            const name = this.state.controls.fullname.value;
            this.props.updateName({ name, userId});
            this.setState({
                fullnameBoxTouched : false
            });
        }
        if (!this.state.controls.fullname.touched) {
            console.log('not touched');
        }
        
    }

    render() {
        
        console.log(this.state.controls);
        
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
                        {this.renderNameInput()}
                        {this.renderEmailInput()}
                </View>
                    <View style={{
                        height: 50, width: '100%',   borderBottomWidth: 1,
                        borderBottomColor: color.borderBottomColor}}>
                        <Text style={[styles.headerText, {top: 1}]}>CHANGE PASSWORD</Text>
                    </View>
                    <View style={styles.passwordContainer}>
                        <TouchableOpacity>
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
                        bottom: 0, width: '100%',
                        backgroundColor: '#fff',
                        height: 100
                    }}
                >
                    <TouchableOpacity 
                        style={styles.gradientWrapper}
                        onPress={this.updateInfo}
                    >
                        <View style={styles.gradientWrapper} >
                            <LinearGradient
                                colors={[color.gradientFirstColor, color.gradientSecondColor]}
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
        color: color.fontColor,
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

const mapStateToProps = ({ auth, blog }) => {
    const { user, userInfo } = auth;
    console.log(user, userInfo);

    return {
        user, userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateName: ({ name, userId }) => dispatch(updateUserName({ name, userId })) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);