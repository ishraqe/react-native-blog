import React from 'react';
import { View, Text } from 'react-native';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';


import Auth from './component/screens/Auth/Auth';
import Login from './component/screens/Auth/Login';
import SuccessScreen from './component/screens/Auth/Success';
import SignUpScreen from './component/screens/Auth/SignUp';
import Landing from './component/screens/Blog/Landing';
import SingleBlog from './component/screens/Blog/SingleBlog';
import TabView from './component/screens/Drawer';


const TabIcon = ({ selected, title }) => {
    return (
        <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
    );
}


const RouterComponent = () => {
    return (
        <Router navigationBarStyle={{ backgroundColor: '#fff' }} titleStyle={{ marginLeft: -40, color: '#3ac665', alignSelf: 'center' }} >
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
                <Scene key="lightbox" lightbox>
                <Scene key="drawer" drawer contentComponent={TabView}>
                    <Scene key="tabbar" tabs={true} tabBarPosition={'bottom'}>
                        <Scene key="tab1" title="Tab #1" hideTitle  navigationBarStyle={{ backgroundColor: 'red' }} titleStyle={{ color: 'white' }}>
                            <Scene key="tab1_1" component={Landing} title="Tab #1_1" onRight={() => alert("Right button")} rightTitle="Right" />
                        </Scene>
                        <Scene key="tab2" initial={true} title="Tab #2" >
                            <Scene key="tab2_1" component={SingleBlog} title="Tab #2_1" onLeft={() => alert("Left button!")} leftTitle="Left" />
                        </Scene>
                    </Scene>
                </Scene>
                </Scene>
            </Stack>
        </Router>
    );
};

export default RouterComponent;