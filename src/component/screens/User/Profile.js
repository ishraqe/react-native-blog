import React, {Component} from 'react';
import {
    View,
    Text, 
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView
} from 'react-native';
import { CustomButton, Confirm } from '../../../component/common/index';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../assets/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import { fetchBlogByUserId} from '../../../store/actions';
import ListView from '../../common/List';


class Profile extends Component {

    state = {
        info: null
    }
    componentWillMount() {
        if (this.props.usersPost) {
            this.setState({
                info: this.props.usersPost
            });
        }
        if (this.props.userInfo) {
            this.setState({
                userInfo : this.props.userInfo 
            })
        }
    }

    componentWillReceiveProps(next) {
        this.setState({
            info: next.usersPost,
            userInfo: next.userInfo 
        });

    }

    componentDidMount () {
        if (this.props.user) {
            const userId = this.props.user.uid;
            this.props.fetch_blogby_user({ userId });
        }
    }

    render () {
        return (
            <ScrollView style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <View style={{flex:2}}>
                            <Image 
                                source={{ uri: this.props.userInfo.profileImage }} 
                                style={styles.profileImageStyle} 
                            />
                            <Text style={styles.nameStyle}>{this.props.userInfo.fullname}</Text>
                        </View>
                        {/* <TouchableOpacity style={styles.gradientWrapper}>
                            <View style={styles.gradientWrapper} >
                                <LinearGradient
                                    colors={[color.gradientFirstColor, color.gradientSecondColor]}
                                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                    style={styles.gradientContainer}
                                >
                                    <Text style={styles.textStyle}>MAIL</Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.photoContainer}>
                        <View style={styles.photosWrapper}>
                            <FlatList
                                data={this.state.info}
                                renderItem={({ item }) => (
                                    <ListView
                                        item={item}
                                    />
                                )}
                                keyExtractor={(item, index) => index}
                            >
                            </FlatList>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
       
    }
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff'
    },
    profileContainer:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor: color.greyColor,
    },
    profileImageStyle :{
        height: 120,
        width: 120,
        borderRadius: 60,
        top: 20
    },
    nameStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 25,
        marginBottom:20
        
    },
    gradientContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        width: '50%',
        borderRadius: 25,
        marginBottom: 20
    },
    gradientWrapper: {
        flex:1,
        width: '100%',
        alignItems: 'center'
    },
    textContainer: {
        width: '100%',
        height: '100%'
    },
    photoContainer : {
        width: '100%',
        flex: 1,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    photosWrapper:{
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
    },
    info : {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    modalTopContainer : {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#eee',
        height: '10%',
        borderBottomWidth: 1,
        borderBottomColor: color.greyColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5

    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    modalImageContainer: {
        height: '100%',
        width: '100%',
    },
    modalProfileImageStyle : {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    ActivityContainer: {
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 10,
        marginBottom: 12,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconLike: {
        color: 'red',
        marginRight: 7
    },
    likeTextStyle: {
        color: 'red',
        fontSize: 18,
    },
    iconComment: {
        color: '#b5b8bc',
        marginRight: 7
    },
    commentTextStyle: {
        color: '#b5b8bc',
        fontSize: 18,
    }
});

const mapStateToProps = ({auth, blog}) => {

    const { user, userInfo } = auth;
    const usersPost = blog.usersBlog;
    console.log(usersPost, userInfo,'users post');
    
    return {
        user,
        usersPost,
        userInfo
    }
}

const mapDispatchToProps= dispatch => {
    return {
        fetch_blogby_user: ({ userId }) => dispatch(fetchBlogByUserId({userId}))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Profile);