/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import { Router, Scene, Drawer, Stack } from 'react-native-router-flux'
import SplashScreen from 'react-native-splash-screen'
import Login from './components/Login'
import DrawerContent from './components/DrawerContent'
import Main from './components/Main'
import Signup from './components/Signup'
import Support from './components/Support'
import Aspirants from './components/Aspirants'
import Aspirant from './components/Aspirant'
import Home from './components/Home'
import Loader from './components/Loader'
import Update from './components/Update'
import Verify from './components/Verify'
import Guide from './components/Guide'
import Poll from './components/Poll'
import UpdateOne from './components/UpdateOne'



type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    const width = (Dimensions.get('window').height / 3)
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#005900"
          />
        <Router titleStyle={{color: '#fff'}} sceneStyle={{backgroundColor: '#fff'}}>
          <Scene key="root">
            <Stack key="root2">
              <Scene key="loader" component={Loader} title="Loader" hideNavBar= {true} />
              <Scene key="main" component={Main} title="Main" hideNavBar= {true} />
              <Scene key="login" component={Login} title="Login" hideNavBar= {true} />
              <Scene key="signup" component={Signup} title="Signup" hideNavBar= {true} />
              <Scene key="verify" component={Verify} title="Verify" hideNavBar= {true}/>
            </Stack>
            <Drawer
                hideNavBar
                key="drawer"
                contentComponent={DrawerContent}
                drawerWidth={width}
                hideDrawerButton={true}
              >
              {/* <Stack key="root3"> */}
                <Scene key="home" component={Home} title="Home" hideNavBar= {true}/>
                <Scene key="update" component={Update} title="Update" hideNavBar= {true}/>
                <Scene key="aspirants" component={Aspirants} title="Aspirants" hideNavBar= {true}/>
                <Scene key="aspirant" component={Aspirant} title="Aspirant" hideNavBar= {true} />
                <Scene key="guide" component={Guide} title="Guide" hideNavBar= {true}/>
                <Scene key="poll" component={Poll} title="Poll" hideNavBar= {true}/>
                <Scene key="updateOne" component={UpdateOne} title="UpdateOne" hideNavBar= {true}/>
                <Scene key="support" component={Support} title="Support" back={true} 
                  navigationBarStyle={{backgroundColor: '#f2f2f2'}}
                  titleStyle={{color: '#008841'}}
                  />
              {/* </Stack> */}
            </Drawer>
          </Scene>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
