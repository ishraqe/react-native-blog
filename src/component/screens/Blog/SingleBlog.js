import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { CardSection, Confirm, CustomButton } from '../../common/index';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import color from '../../../assets/color';
import { connect } from 'react-redux';
import { deleteBlogPost} from '../../../store/actions';



class SingleBlog extends Component {
    state = {
        showMoreModal : false
    }

    componentWillMount() {
        console.log(this.props.post);
    }
    deleteModalHandler = () => {
        const userId = this.props.post.ownerId;
        const blogId = this.props.post.key;
        this.props.deleteBlog({userId, blogId});
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
                >
                    <Icon
                        size= {35}
                        name={'ios-create-outline'}
                    />
                    <Text style={styles.modalText}>Edit</Text>
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
 
    
    render() {
        const { imageUrl, createdAt, blogDescription } = this.props.post.values;
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
                                        <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />  
                                    <Text style={styles.nameStyle}>Name</Text>
                                    </View>
                                    <Text style={styles.timeStyle} >{moment(createdAt).fromNow()}</Text>
                                </View>
                                {this.renderMoreButton()}
                            </View>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.description}>{blogDescription}</Text>    
                            </View>
                            <View style={styles.ActivityContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon
                                        size={30}
                                        name={'ios-heart-outline'}
                                        style= {styles.iconLike}
                                    />
                                <Text style={styles.likeTextStyle} >18</Text> 
                                </View>
                                <View style={styles.iconContainer}>
                                    <Icon
                                        size={30}
                                        name={'ios-text-outline'}
                                        style={styles.iconComment}
                                    />
                                    <Text style={styles.commentTextStyle} >26</Text>
                                </View>
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
        height : 60,
        width : '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom : 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileInfoContainer : {
        height: '100%',
        width: '100%',
    },
    profileNameContainer: {
         width: '100%', 
         height: '100%', 
         flexDirection: 'row', 
         alignItems: 'center' 
    },
    nameStyle : {
        marginLeft: 10,
        color: '#000',
        fontSize: 18 
    },
    timeStyle : {
        fontSize: 12,
        fontWeight: '100'
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
        minHeight: 270
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
        color : 'red',
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
    return {
        user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBlog: ({userId, blogId}) => dispatch(deleteBlogPost({userId, blogId})),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);    