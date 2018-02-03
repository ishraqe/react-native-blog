import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import color from './assets/color'
/*==============================================
             Authentication Routes
=============================================*/
import Initial from './component/screens/Initial';
import Auth from './component/screens/Auth/Auth';
import Login from './component/screens/Auth/Login';
import SuccessScreen from './component/screens/Auth/Success';
import SignUpScreen from './component/screens/Auth/SignUp';

/*==============================================
             Drawer Routes
=============================================*/

import Drawer from './component/screens/Drawer';

/*==============================================
             Blog Routes
=============================================*/

import Landing from './component/screens/Blog/Landing';
import SingleBlog from './component/screens/Blog/SingleBlog';
import MyBlog from './component/screens/Blog/MyBlog';
import Search from './component/screens/Blog/Search';
import CreateBlog from './component/screens/Blog/CreateBlog';
import Notifications from './component/screens/Blog/Notifications';
import Comment from './component/screens/Blog/Comments';
 
/*==============================================
             Profile Routes
=============================================*/

import Profile from './component/screens/User/Profile';
import Settings from './component/screens/User/Settings';


class RouterComponent extends Component {
    
    renderLeftMenuButton = () => {
        return (
            <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                <Icon
                    size={30}
                    name={`ios-menu`}
                    text={`My Account`}
                    style={{ color: color.greyColor, marginLeft: 10, marginRight: 10, left: 1, }}
                />
            </TouchableOpacity>
        );
    } 

    renderLeftBackButton = () => {
        return (
            <TouchableOpacity onPress={() => Actions.pop()}>
                <Icon
                    size={30}
                    name={`ios-arrow-round-back-outline`}
                    text={`My Account`}
                    style={{ color: '#000', marginLeft: 10, marginRight: 10, left: 1, }}
                />
            </TouchableOpacity>
        );
    }
 
    render () { 
        return (
            <Router navigationBarStyle={{ backgroundColor: '#fff' }}

                titleStyle={{ color: color.themeColor, alignSelf: 'center' }}
            >
                <Stack key="root" hideNavBar={true}>
                    <Stack key="first" >
                        <Scene
                            key='initial_screen'
                            hideNavBar={true}
                            component={Initial}

                        />
                        <Scene
                            key='auth'
                            hideNavBar={true}
                            component={Auth}
                        />
                        <Scene
                            key='login'
                            component={Login}
                            title='Login'
                        />
                        <Scene
                            key='signUpScreen'
                            component={SignUpScreen}
                            title='Sign Up'
                        />
                        <Scene
                            key='successScreen'
                            component={SuccessScreen}
                            hideNavBar={true}
                        />

                    </Stack>
                    <Scene key="lightbox"  lightbox >
                        <Scene key="drawer" drawer contentComponent={Drawer}>
                            <Scene key="tabbar"
                                tabBarStyle={{ position: 'relative',
                                 overflow: 'visible',
                                 paddingLeft: 70 ,
                                 backgroundColor: '#fff'
                                }}
                                showLabel={true} activeBackgroundColor='#fff'
                                activeTintColor={color.themeColor} tabs={true}
                                tabBarPosition={'bottom'}
                                
                            >
                                <Scene
                                    key="landing_page"
                                    component={Landing}
                                    renderLeftButton={()=>this.renderLeftMenuButton()}
                                    // renderRightButton={() => (
                                    //     <TouchableOpacity onPress={() => Actions.search_tab()}>
                                    //         <Icon
                                    //             size={30}
                                    //             name={`ios-search-outline`}
                                    //             text={`My Account`}
                                    //             style={{ color: color.greyColor, marginLeft: 10, marginRight: 10, left: 1, }}
                                    //         />
                                    //     </TouchableOpacity>
                                    // )}
                                    title={'Timeline'}
                                    tabBarLabel={({ focused }) => (
                                        <View>
                                            <Icon
                                                size={40}
                                                name={`ios-list-outline`}
                                                text={`My Account`}
                                                color={focused ? color.themeColor : null }
                                            />
                                        </View>
                                    )}
                                   
                                />
                                {/* <Scene 
                                    key="search_tab" 
                                    tabBarLabel={({ focused }) => (
                                        <View>
                                            <Icon
                                                size={40}
                                                name={`ios-search-outline`}
                                                text={`My Account`}
                                            />
                                        </View>
                                    )} 
                                    labelStyle={Actions.currentScene ? '#3ac665' : 'red'} 
                                    component={Search} title="Search" 
                                    renderLeftButton={() => this.renderLeftMenuButton()}
                                /> */}
                                <Scene
                                    tabBarLabel={({ focused }) => (
                                    <View>
                                        <Icon
                                            size={40}
                                            name={`ios-add-outline`}
                                            text={`My Account`}
                                            color={focused ? color.themeColor : null}
                                        />
                                    </View>
                                )} 
                                    key="tab3_1" 
                                    component={CreateBlog} 
                                    title="Create" 
                                    renderLeftButton={() => this.renderLeftMenuButton()} 
                                />
                                <Scene 
                                    tabBarLabel = {({ focused }) => (
                                    <View>
                                    <Icon
                                        size={40}
                                        name={`ios-notifications-outline`}
                                        text={`My Account`}
                                        color={focused ? color.themeColor : null}
                                    />
                                </View>
                                )} 
                                    key="notification_page" 
                                    component={Notifications} 
                                    title="Notifications" 
                                    renderLeftButton={() => this.renderLeftMenuButton()} 
                                />
                            </Scene>
                            <Scene 
                                key='single_blog'
                                title='Post'
                                component={SingleBlog} 
                                renderLeftButton={() => this.renderLeftBackButton()}
                            />
                            <Scene
                                key='single_blog_comment'
                                title='Comment'
                                component={Comment}
                                renderLeftButton={() => this.renderLeftBackButton()}
                            />
                            <Scene 
                                key='profile_page'
                                component={Profile}
                                title={'Profile'}
                                renderLeftButton={() => this.renderLeftMenuButton()}
                            />
                            <Scene
                                key='settings_page'
                                component={Settings}
                                title={'Profile Settings'}
                                renderLeftButton={() => this.renderLeftMenuButton()}
                            />
                        </Scene>
                    </Scene>
                </Stack>
            </Router>
        );
    }
};

const styles = StyleSheet.create({
    tabViewWrapperStyle : {
        backgroundColor: color.themeColor,
        position: 'absolute',
        top:-50
    },
    searchView: {
        height: 56,
        backgroundColor: '#fff'
    }
});



export default RouterComponent;