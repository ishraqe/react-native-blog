import React, { Component } from 'react';
import { View, Animated,Text, FlatList, StyleSheet, RefreshControl, ScrollView, Easing } from 'react-native';
import ListView from '../../common/List';
import { fetchAllBlog, fetchUserInfo, fetchAllUserNotification } from "../../../store/actions";
import {connect} from 'react-redux';
import {Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import _ from 'lodash';


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
        console.log(next.notifications, 'rece');
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
    
    render() {
      
        return (
            <Animated.View >
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
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex:1,
        width: "100%"
    }
});

const mapStateToProps = (state) => {
    const { user, userInfo, email} = state.auth;
    const allPosts = state.blog.allBlog;
    const notifications = state.blog.notifications;
    console.log(user , userInfo ,'from state noti');
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