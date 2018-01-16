import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Input, CardSection} from '../../common';
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
            />
        );
    }
}

class CreateBlog extends Component {

    state = {
        pickedImage: null,
        text: 'Useless Multiline Placeholder',
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
                this.props.shareStory();
            }
        });
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
                <CardSection>
                    <MultilineTextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                </CardSection>
                <CardSection>
                    {this.renderImagePreview()}
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

    }
});

const mapDispatchTOProps = dispatch => {
    return {
       shareStory: () => dispatch(postStory())
    };
};

export default connect(null, mapDispatchTOProps)(CreateBlog);