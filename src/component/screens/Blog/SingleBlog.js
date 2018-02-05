import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { CardSection, Confirm, CustomButton } from '../../common/index';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import color from '../../../assets/color';
import { connect } from 'react-redux';
import { deleteBlogPost, fetchBlogActivity, likeAction} from '../../../store/actions';
import {Actions} from 'react-native-router-flux';


class SingleBlog extends Component {
    state = {
        showMoreModal : false,
        like: '',
        comment: ''
    }

    async componentDidMount() {
        if (this.props.post.key) {
            const blogId = this.props.post.key;
        await this.props.fetch_Blog_Activity({ blogId });
        }
        if (this.props.likeActivity && this.props.likeActivity.likes != 0) {
            this.setState({
                like: this.props.likeActivity.likes,
            });
        } else {
            this.setState({
                like: '',
            });
        }

        if (this.props.likeActivity && this.props.likeActivity.comments != 0) {
            this.setState({
                comment: this.props.likeActivity.comments
            });
        } 
    }
    deleteModalHandler = () => {
        const userId = this.props.post.ownerId;
        const blogId = this.props.post.key;
        this.props.deleteBlog({userId, blogId});
    }
    likeHandler = () => {
        const userId = this.props.user.uid;
        const blogId = this.props.post.key;
        console.log(userId, blogId);
        
        this.props.give_like({ blogId, userId});
    }
    modalComponent = () => {
        return (  
           <View style={styles.modalMain}>
                <TouchableOpacity
                    onPress={()=> this.setState({showMoreModal: false})}
                    style={[styles.modalinsideContainer,{ width: '100%', borderBottomColor: '#000', borderBottomWidth:1}]}
                >
                    <Icon
                    size={35}
                    name={'ios-create-outline'}
                />
                <Text style={styles.modalText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.modalinsideContainer}
                    onPress={this.deleteModalHandler}
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
    renderMoreButton = () => {
        if (this.props.user && this.props.user.uid === this.props.post.ownerId) {
            return (

                <View style={{
                    marginLeft: -40,
                    marginTop: 10
                }}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            showMoreModal: true
                        });
                    }}
                >
                    <Icon
                        size={40}
                            name={'md-more'}
                        style={styles.moreIcon}
                    />
                </TouchableOpacity>
                </View>
            );
        }
    }
    alreadyLiked = () => {
        const userId = this.props.user.uid;
        console.log(userId, 'uid');
        
        if (this.state.like ) {
            if (this.state.like.hasOwnProperty(userId)) {
                return true;                
            }
        }else {
            return false;
        }
    }
 
    render() {
        const { imageUrl, createdAt, blogDescription, creatorInfo } = this.props.post.values;
        return (
                    <ScrollView style={{backgroundColor: '#fff'}} 
                    >
                        <View style={{flex:1}}>
                            <View style = {styles.coverContainer}>
                                <Image source={{ uri: imageUrl}} style={styles.coverImageStyle} />
                            </View>
                            <View style= {styles.profileContainer}>
                                <View style={styles.profileInfoContainer}>
                                    <View style={styles.profileNameContainer}>
                                <Image source={{ uri: creatorInfo.userInfo.profileImage }} style={styles.profileImageStyle} />  
                                <Text style={styles.nameStyle}>{creatorInfo.userInfo.fullname}</Text>
                                    </View>
                                    <Text style={styles.timeStyle} >{moment(createdAt).fromNow()}</Text>
                                </View>
                                {this.renderMoreButton()}
                            </View>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.description}>{blogDescription}</Text>    
                            </View>
                            <View style={styles.ActivityContainer}>
                                <TouchableOpacity
                                    onPress={this.likeHandler}
                                >
                                    <View style={styles.iconContainer}>
                                        <Icon
                                            color = {this.alreadyLiked() ? 'red': null}
                                            size={30}
                                            name={'ios-heart-outline'}
                                            style= {styles.iconLike}
                                        />
                                <Text style={styles.likeTextStyle} >{Object.keys(this.state.like).length}</Text> 
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                            onPress={() => Actions.single_blog_comment({ blogId: this.props.post.key, ownerid: this.props.post.values.creatorInfo.ownerId})}
                                >
                                    <View style={styles.iconContainer}>
                                        <Icon
                                            size={30}
                                            name={'ios-text-outline'}
                                            style={styles.iconComment}
                                        />
                                <Text style={styles.commentTextStyle} >{Object.keys(this.state.comment).length}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> 
                        
                            <Confirm
                                visible={this.state.showMoreModal}
                                onDecline = {this.onDecline}
                            >
                                {this.modalComponent()}
                            </Confirm>
                        </View>
                    </ScrollView>
                       
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        margin :2
    },
    coverContainer : {
        width: '100%',
        height: 250,
    },
    coverImageStyle : {
        height: '100%',
        width: null,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    profileContainer : {
        height : 70,
        width : '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom : 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: color.borderBottomColor
    },
    profileInfoContainer : {
        height: '100%',
        width: '100%',
        marginBottom: 10
    },
    profileNameContainer: {
         width: '100%', 
         height: '100%', 
         flexDirection: 'row', 
         alignItems: 'center' 
    },
    nameStyle : {
        marginLeft: 10,
        fontWeight: 'bold',
        color: color.fontColor,
        fontSize: 20,
    },
    timeStyle : {
        fontSize: 12,
        fontWeight: '100',
        marginLeft: 50,
        marginTop: -15,
      
    },
    profileImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 50,
        marginBottom: 10
    },
    moreIcon :{
       
    },
    descriptionContainer : {
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        minHeight: 250
    },
    description : {
        width: '100%',
        fontSize: 18,
        color: '#323648'
    },
    ActivityContainer : {
        width: '100%',
        height: 50,
        flexDirection : 'row',
        justifyContent : 'space-between',
        position: 'absolute',
        bottom: 0,
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 10,
        marginTop: 10,
        borderTopColor:'#ddd',
        borderTopWidth :1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#fff'
    },
    iconContainer : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    iconLike : {
        marginRight :7
    },
    likeTextStyle : {
        color: 'red',
        fontSize: 18,
    },
    iconComment : {
        color: '#b5b8bc',
        marginRight: 7
    },
    commentTextStyle : {
        color: '#b5b8bc',
        fontSize: 18,
    },
    modalinsideContainer : {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom:  20,
        alignItems: 'center'
    },
    modalText :{
        fontSize:  20,
        color: '#000',
        marginLeft: 10
    },
    modalMain: { 
        width: '100%',
        padding: 15,
        height: '100%', 
        backgroundColor: '#fff' ,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    }
});

const mapStateToProps = state => {
    const {user} = state.auth; 
    const { likeActivity}  = state.blog;
    console.log(likeActivity);
    return {
        user,
        likeActivity
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBlog: ({userId, blogId}) => dispatch(deleteBlogPost({userId, blogId})),
        fetch_Blog_Activity: ({ blogId }) => dispatch(fetchBlogActivity( {blogId})),
        give_like: ({ blogId, userId }) => dispatch(likeAction({ blogId, userId }))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);    