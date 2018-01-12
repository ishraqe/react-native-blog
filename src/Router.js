import React from 'react';
import { View, Text } from 'react-native';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';


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
        <Router navigationBarStyle={{ backgroundColor: '#fff' }} titleStyle={{  color: '#3ac665', alignSelf: 'center' }} >
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
                <Scene key="lightbox"  lightbox style={{color: 'green'}}>
                    <Scene key="drawer" drawer contentComponent={TabView}>
                        <Scene key="tabbar" tabs={true} tabBarPosition={'bottom'} labelStyle={{ color: 'red', fontSize: 20 }}>
                            <Scene key="tab1_1" component={Landing} tabBarLabel={`My Account`}  onRight={() => alert("Right button")} rightTitle="Right" />
                            <Scene key="tab2_1" component={Search} title="Search"  onLeft={() => alert("Left button!")} leftTitle="Left" />
                            <Scene key="tab3_1" component={CreateBlog} title="Create"  onLeft={() => alert("Left button!")} leftTitle="Left" />
                            <Scene key="tab4_1" component={MyBlog} title="My Blog"  onLeft={() => alert("Left button!")} leftTitle="Left" />
                        </Scene>
                    </Scene>
                </Scene>
            </Stack>
        </Router>
    );
};

export default RouterComponent;