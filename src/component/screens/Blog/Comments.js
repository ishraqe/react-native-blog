import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button, TextInput, TouchableOpacity, TouchableHighlight, Modal} from 'react-native';
import color from '../../../assets/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import moment from 'moment';
import { postComment, fetchBlogActivity} from '../../../store/actions';
import {  Confirm } from '../../common/index';
import RenderComment from './RenderComment';


class Comment extends Component {
    state = {
        comment : '',
        comments: 0,
        openModal: false,
        selectedComment: ''
    }

    componentWillMount() {
        if (this.props.likeActivity) {
            this.setState({
                comments: this.props.comments
            });
        }
    }

    componentWillReceiveProps(next) {
        this.setState({
            comments: next.comments
        });
    }

    componentDidMount() {
        if (this.props.blogId) {
            const blogId = this.props.blogId;
            this.props.fetch_Blog_Activity(blogId);
        }
    }

    postCommenthandler = () => {
        if (!this.state.comment.length) { 
            console.log('disabled');
        }else {
            console.log(this.state.comment);
            const comment = this.state.comment;
            const userId = this.props.user.uid;
            const userInfo = this.props.userInfo.fullname;
            const user = {
                userId, 
                userInfo
            }
            const blogId = this.props.blogId;
            this.props.post_comment({ comment, user, blogId});
            this.setState({
                comment: ''
            })
        }
    }
  
    closeModal() {
        this.setState({ openModal: false });
    }
    modalComponent = () => {
        return (
            <View style={styles.modalMain}>
                <TouchableOpacity
                    onPress={() => this.setState({ openModal: false })}
                    style={[styles.modalinsideContainer, { width: '100%', borderBottomColor: '#000', borderBottomWidth: 1 }]}
                >
                    <Icon
                        size={35}
                        name={'ios-create-outline'}
                    />
                    <Text style={styles.modalText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.modalinsideContainer}
                >
                    <Icon
                        size={35}
                        name={'ios-create-outline'}
                    />
                    <Text style={styles.modalText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.modalinsideContainer}
                >
                    <Icon
                        size={35}
                        name={'ios-remove-circle-outline'}
                    />
                    <Text style={styles.modalText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }

    openModal = () => {
        console.log(this.props.item, 'item ket');
        this.setState({ openModal: true });
    }
    renderItems = ({item}) => {
        console.log(item, 'lololol');
        
        const { commentByInfo, createdAt, text } = item.values;
        return (
            <TouchableHighlight
                onLongPress={this.openModal}
            >
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                    </View>
                    <View style={styles.commentContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameStyle}>{commentByInfo.name}</Text>
                            <Text style={styles.timeStyle}>{moment(createdAt).fromNow()}</Text>
                        </View>
                        <Text style={styles.comments}>{text}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render () {
        return (
            <View style={{flex:1}}>
                <FlatList
                    style={{ flex: 1, backgroundColor: '#fff', marginBottom: 55 }}
                    data={this.state.comments}
                    // renderItem={({ item }) => this.renderItems({item})}
                    renderItem={({ item }) => (
                        <RenderComment
                            item={item}
                        />
                    )}
                />
                <View style={styles.createComment}>
                    <TextInput
                        placeholder = {'Write a comment'}
                        maxLength={200}
                        style={{ height: 40, backgroundColor: color.borderBottomColor, borderRadius: 20 }}
                        underlineColorAndroid  = 'transparent'
                        editable={true}
                        onChangeText={(comment) => this.setState({ comment })}
                        value={this.state.comment}
                    />
                    <TouchableOpacity 
                        style={{ position: 'absolute', bottom: 12, right: 15}}
                        onPress= {this.postCommenthandler}
                    >
                        <Icon 
                            name={'md-send'}
                            size={30}
                            color={color.themeColor}
                        />
                    </TouchableOpacity>
                </View>
                <Confirm
                    visible={this.state.openModal}
                    onDecline={this.closeModal}
                >
                    {this.modalComponent()}
                </Confirm>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: color.borderBottomColor,
        padding: 15
    },
    imageContainer : {
        width: '20%'
    },
    profileImageStyle : {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    commentContainer : {
        width: '80%',
        marginLeft: -10
    },
    nameContainer : {
        flexDirection: 'row',
        justifyContent : 'space-between',
        marginBottom: 5
    },
    nameStyle : {
        color: color.fontColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    timeStyle : {
        color : color.greyColor,
        marginLeft: 5
    },
    comments : {
        width: '100%',
    },
    createComment: {
        position: 'absolute', borderTopWidth: 1,
        borderTopColor: color.borderBottomColor,
        bottom: 0, width: '100%',
        backgroundColor: '#fff',
        height: 55,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    modalinsideContainer : {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center'
    },
    modalText : {
        fontSize: 20,
        color: '#000',
        marginLeft: 10
    },
    modalMain: {
        width: '100%',
        padding: 15,
        height: '100%',
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    }

});

const mapStateToProps = ({auth, blog}) => {
    const {user, userInfo} = auth;
    const { likeActivity } = blog;

    let comments = [];
    for (var key in likeActivity.comments) {
        for (var key2 in likeActivity.comments[key]) {
            comments.push({
                key: key2,
                ownerId: key,
                values: likeActivity.comments[key][key2].comment
            }); 
        }
    } 
    return {
        user, userInfo, comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        post_comment: ({ comment, user, blogId }) => dispatch(postComment({ comment, user, blogId })),
        fetch_Blog_Activity: (blogId) => dispatch(fetchBlogActivity(blogId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);