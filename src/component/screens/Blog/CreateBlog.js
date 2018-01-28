import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput , ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Input, CardSection, CustomButton, Spinner} from '../../common';
import {connect, Connect} from 'react-redux';
import {postStory} from '../../../store/actions';
import color from '../../../assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
class MultilineTextInput extends Component {
    render() {
        return (
            <TextInput
                {...this.props} 
                editable={true}
                maxLength={200}
                placeholder='Share your story!!'
                style={{borderBottomWidth:1, borderBottomColor: color.borderBottomColor, paddingLeft: 10 }}
                underlineColorAndroid={'transparent'}
            />
        );
    }
}

class CreateBlog extends Component {

    state = {
        pickedImage: null,
        text: '',
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Pick an Image'}, res => {
            if (res.didCancel) {
                console.log('Cancled');
            }else if(res.error) {
                console.log('Error', res.error);
            }else {
                this.setState({
                    pickedImage: {
                        uri: res.uri
                    }
                });
                
            }
        });
    }

    renderShareButton = () => {
            if (this.props.loading) {
                return <Spinner size='large' />;
            }
            return (
                <TouchableOpacity
                    onPress={this.shareStoryHandler}
                    style={styles.gradientWrapper}>
                    <View style={styles.gradientWrapper} >
                        <LinearGradient
                            colors={['#00FFFF', color.themeColor]}
                            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                            style={styles.gradientContainer}
                        >
                            <Text style={styles.textStyle}>Share story</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            );
    }

    shareStoryHandler = () => {
      
        if (!this.state.text.length && !this.state.pickedImage) {
            console.log('disable');

        } else {
            const description = this.state.text;
            const imageUri = this.state.pickedImage.uri;
            const userInfo = this.props.userInfo;
            this.props.shareStory(description, imageUri, userInfo);
        }
    }

    renderImagePreview = () => {
        if(this.state.pickedImage) {
            return (
                <View style={styles.uploadImageForm} >
                    <Image source={this.state.pickedImage} style= {styles.imageStyle} />
                    <TouchableOpacity 
                        onPress={() => {
                            this.setState({
                                pickedImage: null
                            });
                        }}
                        style={{ position: 'absolute', top: 0, right: 1 }}
                    >
                        <Icon
                            size={30}
                            name={'ios-close-circle-outline'}

                            style={{color: '#fff'}}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <TouchableOpacity
                onPress={this.pickImageHandler}
            >
                <View style={styles.uploadImageForm}>
                    <Image style={{ height: '100%', width: '100%' }} source={require('../../../assets/image_back.png')} />
                    <Text
                        style={{position: 'absolute', top: '40%', fontSize: 18, fontWeight: '600'}}
                    >
                        Click to upload image
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ScrollView style={{  width: '100%', padding: 10}}>
                <CardSection style={styles.cardStyle}>
                    <MultilineTextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                </CardSection>
                <CardSection style={styles.cardStyle}>
                    {this.renderImagePreview()}
                </CardSection>
                <CardSection style={styles.cardStyle} >
                    {this.renderShareButton()}
                </CardSection>
            </ScrollView>
        );
    }
}

const styles=  StyleSheet.create({
    uploadImageForm: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#eee',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 5,
        position: 'relative',
        height: 200,
        backgroundColor: '#bfc3c9'
    },
    imageStyle :{
        height: '100%',
        width:'100%',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 5,

    },
    cardStyle:{
       marginTop: 20,
       borderBottomWidth: 0
    },
    gradientContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        width: '50%',
        borderRadius: 25,
        marginBottom: 20
    },
    gradientWrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 15
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
});

const mapStateToProps = ({auth, blog}) => {
    const { userInfo, user} = auth;
    const {loading} = blog;
    return {
        user, 
        userInfo,
        loading
    }
}

const mapDispatchTOProps = dispatch => {
    return {
        shareStory: (description, imageUri, userInfo) => dispatch(postStory(description, imageUri, userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchTOProps)(CreateBlog);