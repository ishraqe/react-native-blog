import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Input, CardSection, CustomButton} from '../../common';
import {connect, Connect} from 'react-redux';
import {postStory} from '../../../store/actions';


class MultilineTextInput extends Component {
    render() {
        return (
            <TextInput
                {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable={true}
                maxLength={200}
                placeholder='Share your story!!'
                style={{borderWidth:1, borderColor: '#eee'}}
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

    shareStoryHandler = () => {
        const description = this.state.text;
        const imageUri = this.state.pickedImage.uri;
        const imageData = this.state.pickedImage.path;
        
        this.props.shareStory(description, imageUri );
    }

    renderImagePreview = () => {
        if(this.state.pickedImage) {
            return (
                <View style={styles.uploadImageForm} >
                    <Image source={this.state.pickedImage} style= {styles.imageStyle} />
                </View>
            );
        }
        return (
            <TouchableOpacity
                style={styles.uploadImageForm}
                onPress={this.pickImageHandler}
            >
                <View>
                    <Text>Click to upload image</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff', height: '100%', padding: 10}}>
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
                    <CustomButton
                        style={{width: '100%'}}
                        onPress={this.shareStoryHandler}
                    >
                        Share
                    </CustomButton>
                </CardSection>
            </View>
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
    }
});

const mapDispatchTOProps = dispatch => {
    return {
        shareStory: (description, imageUri) => dispatch(postStory(description, imageUri))
    };
};

export default connect(null, mapDispatchTOProps)(CreateBlog);