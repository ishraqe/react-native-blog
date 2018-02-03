import React, { Component } from 'react';
import { View, Animated,Text, FlatList, StyleSheet, RefreshControl, ScrollView, Easing } from 'react-native';
import ListView from '../../common/List';
import { fetchAllBlog, fetchUserInfo, fetchAllUserNotification } from "../../../store/actions";
import {connect} from 'react-redux';
import {Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import _ from 'lodash';
import Shimmer from 'react-native-shimmer';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../assets/color';
import { Card } from '../../common/Card';
import { CardSection } from '../../common/CardSection';


class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            triggerVariable: 0,
            info: null
        }
    }
  
    componentWillMount() {
        this.props.fetch_allBlog();
        if (this.props.allPosts) {
            this.setState({
                info: this.props.allPosts
            });
        }
    }

    componentWillReceiveProps(next) {
     
        Actions.refresh({counter: 1});
        this.setState({
            info: next.allPosts
        });
    }

    async componentDidMount() {
        const uid = this.props.user.uid;
        this.props.fetach_userInfo(uid); 
        
    }
   
    isIncreasingSequence = (newVal) => {
        if (this.state.triggerVariable !== newVal) {
            if(this.state.triggerVariable >= 0 && newVal >0 ){
                if (this.state.triggerVariable > newVal) {

                    let that = this;
                    setTimeout(function () {
                        that.setState({
                            triggerVariable: newVal - 0.1
                        });
                        // Actions.refresh({ key: 'landing_page', header: 'Timeline', hideTabBar: false, hideNavBar: false });
                    }, 0);

                } else if (this.state.triggerVariable < newVal) {
                    let that = this;
                    setTimeout(function () {
                        that.setState({
                            triggerVariable: newVal - 0.1
                        });
                        // Actions.refresh({ key: 'landing_page', title: 'Timeline', hideTabBar: true, hideNavBar: true });
                    }, 0);

                } else if (this.triggerVariable == newVal) {
                    let that = this;
                    setTimeout(function () {
                        that.setState({
                            triggerVariable: newVal - 0.1
                        });
                        // Actions.refresh({ key: 'landing_page', title: 'Timeline', hideTabBar: false, hideNavBar: false });
                    }, 0);


                }
            }
        }
    }
  
    getScroll= (event) => {
        let scrollPosition = event.nativeEvent.contentOffset.y;
        this.isIncreasingSequence(scrollPosition);
    }
    
    _onRefresh() {
        this.setState({ refreshing: true });
 
        this.setState({ refreshing: false });
    }
    renderComponent= () => {
        if (this.state.info) {
            return (
                <FlatList
                    onScroll={this.getScroll}
                    scrollEventThrottle={16}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            title='Pull to refresh'
                        />
                    }
                    data={this.state.info}
                    renderItem={({ item }) => (
                        <ListView
                            item={item}
                        />
                    )}
                    keyExtractor={(item, index) => index}
                >
                </FlatList>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Shimmer>
                        <Card>
                            <CardSection>
                                <View style={styles.coverContainerStyle}>
                                    <LinearGradient
                                        colors={['#ada996', '#f2f2f2', '#dbdbdb', '#eaeaea']}
                                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                        style={styles.coverImageStyle}
                                    >
                                    </LinearGradient>
                                </View>
                                <View style={styles.titleContainerStyle}>
                                    <LinearGradient
                                        colors={['#ada996', '#f2f2f2', '#dbdbdb', '#eaeaea']}
                                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                        style={styles.titleStyle}
                                    >
                                    </LinearGradient>
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={styles.profileContainer}>
                                        <View style={styles.profileImageContainer}>
                                            <LinearGradient
                                                colors={['#ada996', '#f2f2f2', '#dbdbdb', '#eaeaea']}
                                                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                                style={styles.profileImageStyle}
                                            >
                                            </LinearGradient>
                                        </View>
                                        <View style={styles.nameContainerStyle}>
                                            <LinearGradient
                                                colors={['#ada996', '#f2f2f2', '#dbdbdb', '#eaeaea']}
                                                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                                style={styles.nameStyle}
                                            >
                                            </LinearGradient>
                                        </View>
                                    </View>
                                    <View style={styles.timeContainer}>
                                        <LinearGradient
                                            colors={['#ada996', '#f2f2f2', '#dbdbdb', '#eaeaea']}
                                            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                            style={styles.timeStyle}
                                        >
                                        </LinearGradient>
                                    </View>
                                </View>
                            </CardSection>
                        </Card>
                    </Shimmer>
                </View>
            );
        }
    }

    render() {  
        return (
            <View style={{flex:1}} >
                {this.renderComponent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex:1,
        width: "100%"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    coverContainerStyle: {
        width: '100%',
        height: 200
    },
    coverImageStyle: {
        height: '100%',
        width: '100%'
    },
    titleContainerStyle: {
        width: '100%',
        height: 80,
        marginTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10
    },
    titleStyle: {
        height: '100%',
        width: '100%',
    },
    infoContainer: {
        width: '100%',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileContainer: {
        width: '70%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImageContainer: {
        width: '30%',
        height: '100%'
    },
    profileImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    nameContainerStyle: {
        width: '60%',
        height: '100%',
        marginTop: 10,
        marginLeft: -15
    },
    nameStyle: {
        height: 20,
        marginTop: 5

    },
    timeContainer: {
        width: '35%',
        height: '100%',
        marginTop: 10,
        marginLeft: -15
    },
    timeStyle: {
        marginTop: 15,
        height: 10,
    }
});

const mapStateToProps = (state) => {
    const { user, userInfo, email} = state.auth;
    const allPosts = state.blog.allBlog;
    const notifications = state.blog.notifications;
   
    return {
        email,
        user,
        userInfo,
        allPosts,
        notifications
    }
}

const mapDispatchTOProps = dispatch => {
    return {
        fetach_userInfo: (uid) => dispatch(fetchUserInfo(uid)),
        fetch_allBlog : () => dispatch(fetchAllBlog()),
        fetch_notification: (ownerId) => dispatch(fetchAllUserNotification({ownerId}))
    };
};

export default connect(mapStateToProps,mapDispatchTOProps)(Landing);