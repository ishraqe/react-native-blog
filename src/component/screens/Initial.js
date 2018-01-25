import React, {Component} from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import * as Progress from 'react-native-progress';
import { Actions } from 'react-native-router-flux';
class Initial extends Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            indeterminate: true,
        };
    }

    componentDidMount() {
        this.animate();
    }
    animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                    progress = 1;
                   Actions.auth();
                }
                this.setState({ progress });
            }, 500);
            console.log('timeout');
        }, 1500);
    }
    render () {
        return (
            <View style={styles.container}>
                <Progress.Bar
                    style={styles.progress}
                    progress={this.state.progress}
                    indeterminate={this.state.indeterminate}
                />
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container :{},
    loadingComponent : {},
    progress :{width: '100%'}
});

export default Initial;