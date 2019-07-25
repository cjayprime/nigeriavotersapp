import React, { Component } from 'react'
import { AsyncStorage, ActivityIndicator, View, StyleSheet, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class Loader extends Component {
    state = {
        id: '',
    }

    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        try {
            let userId = await AsyncStorage.getItem('userId')
            let parsed = JSON.parse(userId)
            if(userId !== null) {
                this.setState({
                    id: parsed,
                })
                Actions.home({data: this.state.id})
            }
            else {
                Actions.main()
            }
            
        }
        catch(error) {
            alert("Error fetching display picture")
        }   
    } 
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content"
                />
                 <ActivityIndicator size="large" color="#005900"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})