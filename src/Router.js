import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import color from './assets/color'
/*==============================================
             Authentication Routes
=============================================*/

import Auth from './component/screens/Auth/Auth';
import Login from './component/screens/Auth/Login';
import SuccessScreen from './component/screens/Auth/Success';
import SignUpScreen from './component/screens/Auth/SignUp';

/*==============================================
             Drawer Routes
=============================================*/

import TabView from './component/screens/Drawer';

/*==============================================
             Blog Routes
=============================================*/

import Landing from './component/screens/Blog/Landing';
import SingleBlog from './component/screens/Blog/SingleBlog';
import MyBlog from './component/screens/Blog/MyBlog';
import Search from './component/screens/Blog/Search';
import CreateBlog from './component/screens/Blog/CreateBlog';







const TabIcon = ({ selected, title }) => {
    return (
        <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
    );
}


const RouterComponent = () => {
    return (
        <Router navigationBarStyle={{ backgroundColor: '#fff' }} titleStyle={{  color: color.themeColor, alignSelf: 'center' }} >
            <Stack key="root" hideNavBar={true}>
                <Stack key="first" >
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
                <Scene key="lightbox" initial lightbox >
                    <Scene key="drawer" drawer contentComponent={TabView}>
                        <Scene key="tabbar" tabBarStyle={{ position: 'relative', overflow: 'visible'}} showLabel={true} activeBackgroundColor='#fff' activeTintColor={color.themeColor} tabs={true} tabBarPosition={'bottom'} >
                            <Scene 
                                key="tab1_1" 
                                component={Landing} 
                                onRight={() => alert("Right button")} 
                                rightTitle="Right"
                                tabBarLabel= 'All'
                                hideNavBar 
                                tabBarIcon={({ focused }) => (
                                    <View style={{
                                        height: 80,
                                        width: 80,
                                        borderRadius: 100,
                                        backgroundColor: '#FE6D64',
                                        paddingTop: 15,
                                        position: 'absolute',
                                        overflow: 'visible',
                                        top: -20
                                    }}>
                                        <Icon
                                            size ={40}
                                            name={`ios-list-outline`}
                                            text={`My Account`}
                                        />
                                    </View>
                                )} 
                            />
                            <Scene icon={({ focused }) => (
                                <View>
                                    <Icon
                                        size={40}
                                        name={`ios-search-outline`}
                                        text={`My Account`}
                                    />
                                </View>
                            )}  
                            key="tab2_1" labelStyle={Actions.currentScene ? '#3ac665' : 'red'} component={Search} title="Search"  onLeft={() => alert("Left button!")} leftTitle="Left" />
                            <Scene icon={({ focused }) => (
                                <View>
                                    <Icon
                                        size={focused ? 60 : 20}
                                        name={`ios-add-outline`}
                                        text={`My Account`}
                                    />
                                </View>
                            )}  key="tab3_1" component={CreateBlog} title="Create"  onLeft={() => alert("Left button!")} leftTitle="Left" />
                        
                        </Scene>
                    </Scene>
                </Scene>
            </Stack>
        </Router>
    );
};

const styles = StyleSheet.create({
    tabViewWrapperStyle : {
        backgroundColor: color.themeColor,
        position: 'absolute',
        top:-50
    }
});

export default RouterComponent;