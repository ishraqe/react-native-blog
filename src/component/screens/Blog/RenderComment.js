import React, {Component} from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import color from '../../../assets/color';
import { Confirm } from '../../common/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { deletePostComment} from '../../../store/actions';

class RenderComment extends Component {
    state = {
        openModal: false,
    }

    closeModal() {
        this.setState({ openModal: false });
    }
    delete_comments = () => {
        const blogId = this.props.item.values.blogId;
        const userId = this.props.item.values.commentByInfo.id;
        const commentId = this.props.item.key;
        this.props.delete_comments({ userId, commentId, blogId});
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
                {/* <TouchableOpacity
                    style={styles.modalinsideContainer}
                >
                    <Icon
                        size={35}
                        name={'ios-create-outline'}
                    />
                    <Text style={styles.modalText}>Edit</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={styles.modalinsideContainer}
                    onPress={this.delete_comments}
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
        console.log(this.props.item);
        if (this.props.user.uid == this.props.item.ownerId) {
            this.setState({ openModal: true });
        }  
    }
    render() {
        const { commentByInfo, createdAt, text } = this.props.item.values;
        return (
            <TouchableHighlight
                onLongPress={this.openModal}
            >
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: commentByInfo.profileImage }} style={styles.profileImageStyle} />
                    </View>
                    <View style={styles.commentContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameStyle}>{commentByInfo.name}</Text>
                            <Text style={styles.timeStyle}>{moment(createdAt).fromNow()}</Text>
                        </View>
                        <Text style={styles.comments}>{text}</Text>
                    </View>
                    <Confirm
                        visible={this.state.openModal}
                        onDecline={this.closeModal}
                    >
                        {this.modalComponent()}
                    </Confirm>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: color.borderBottomColor,
        padding: 15
    },
    imageContainer: {
        width: '20%'
    },
    profileImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    commentContainer: {
        width: '80%',
        marginLeft: -10
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    nameStyle: {
        color: color.fontColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    timeStyle: {
        color: color.greyColor,
        marginLeft: 5
    },
    comments: {
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
    modalinsideContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center'
    },
    modalText: {
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

const mapStateToProps = ({ auth}) => {
    const { user, userInfo } = auth;
    return {
        user, userInfo
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        delete_comments: ({ userId, commentId, blogId }) => dispatch(deletePostComment({ userId, commentId, blogId })),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderComment);