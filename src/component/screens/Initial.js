import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import * as Progress from 'react-native-progress';
import { Actions } from 'react-native-router-flux';
import color from '../../assets/color';
class Initial extends Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            indeterminate: true,
            render: false
        };
    }

    componentDidMount() {
        this.animate();
        StatusBar.setHidden(true);
    }
    animate() {
        setTimeout((function () {
            this.setState({ progress: this.state.progress + (0.02 * Math.random()) });
            Actions.auth()
        }).bind(this), 3000);
    }

    render () {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/initial_back.png')} 
                    style={styles.backgroundImageStyle}
                
                />
                <View style={styles.mainContainer}>
                    <View style={{width: '100%', 
                    height: '75%', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.iconContainer}>
                            <Image source={require('../../assets/initial_icon.png')} style={styles.iconStyle} />
                        </View>
                        <Text style={styles.titleStyle}>Artisan's Story</Text>
                    </View>
                    <View style={{ height: '25%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Progress.Bar
                            style={styles.progress}
                            progress={this.state.progress}
                            color={color.themeColor}
                            unfilledColor={color.greyColor} 
                            borderWidth={0}
                            indeterminate={this.state.indeterminate}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container :{
        flex:1
    },
    backgroundImageStyle : {
        height: '100%',
        width: '100%'
    },
    mainContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer : { 
        height: 230,
        width : 230,
        marginTop: '20%'
    },
    iconStyle : {
        height : '100%',
        width : '100%'
    },
    progress :{
        width: '80%',
        marginTop: '20%',
    },
    titleStyle : {
        fontFamily: 'DancingScript-Bold',
        fontSize: 48,
        marginTop: 10,
        marginBottom: 10,
        color: '#323648'
    }
});

export default Initial;