import * as React from 'react';
import { Button, View, useWindowDimensions, TouchableHighlight, TouchableOpacity, Colors, StyleSheet, Text, Image} from 'react-native';
import {   createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import HomeScreen from './navigation/screens/HomeScreen';
import ContactUs from './navigation/screens/ContactUs';
import Services from './navigation/screens/Services';
import Certifications from './navigation/screens/Certifications';
import WhatWeDo from './navigation/screens/WhatWeDo';
import Blog from './navigation/screens/Blog';
import Post from './navigation/screens/Post';
import logo from './images/logo.png';

const client = new ApolloClient({
  uri : 'https://dlh.sanditsolution.com/graphql'
})

const Drawer = createDrawerNavigator();



//For custom header in drawer start
const CustomDrawer = props => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={styles.logoHeadFont}>DLH TECHNOLOGY CONSULTING</Text>
            <Text style={styles.logoSubHeadFont}>TRUTH IN JUSTICE AND TECHNOLOGY</Text>
          </View>
          <Image
          source={logo}
         style = {{ width: 200, height: 120, borderRadius: 10 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
      >
        <Text style={styles.copyRightText}>Copyright @ {new Date().getFullYear()}</Text>
        <Text style={styles.copyRightText}>DLH Technology Consulting</Text>
      </TouchableOpacity> 
    </View>
  );
};
//For custom header in drawer end


export default function App() {

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>  
      <Drawer.Navigator initialRouteName="HomeScreen" 
      
      //Below setting is for adding header and footer 
      //for drawer
      drawerContent={props => <CustomDrawer {...props} /> }  
      
       screenOptions={({ route }) => ({
        drawerStyle : drawerTheme.colors,
        drawerType: isLargeScreen ? 'permanent' : 'back',
        drawerActiveTintColor : "#fff",
        drawerActiveBackgroundColor : "#1ca7ff",
        drawerInactiveTintColor : "#464a4a",
        drawerInactiveBackgroundColor : "#ddd",
        //drawerStyle: isLargeScreen ? null : { width: '80%' },
        overlayColor: 'transparent',

       headerShown: true,
       
    drawerLabelStyle: {
      marginLeft: -2,
      fontSize: 15
    },
    drawerType: "slide",
    headerStyle: {
      height: 80, // Specify the height of your custom header
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      elevation: 0,
      shadowOpacity: 0,
    },

    headerTitle: () => {
      return (
        <View
           style={styles.headerStyleTwo}>
            <Image
         source={logo}
         style = {{ width: 100, height: 60, borderRadius: 10 }}
          /> 
        </View>
      );
    },
    // HERE IS THIS MAGIC LINE OF CODE

    headerTitleAlign: "center",

    // THAT'S ALL YOU NEED IN DN6 :)

    headerRight: () => (
    <TouchableHighlight onPress={()=>{}} style={styles.callOnTop}>
     <View style={styles.callOnTopText}>
      <Ionicons name="call-sharp"  size={20} color="#000" />
     </View>
 </TouchableHighlight>
    ),

    drawerIcon: ({ focused, color, size }) => {
      let iconName;
      let rn = route.name;

      if (rn === 'HOME') {
        iconName = focused ? 'home' : 'home-outline';
        color = focused ? '#fff' : '#000';

      } else if (rn === 'CONTACT US') {
        iconName = focused ? 'call' : 'call-outline';
        color = focused ? '#fff' : '#000';

      } else if (rn === 'SERVICES') {
        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        color = focused ? '#fff' : '#000';
      }
      else if (rn === 'CERTIFICATIONS') {
        iconName = focused ? 'reader' : 'reader-outline';
        color = focused ? '#fff' : '#000';
      }
      else if (rn === 'WHAT WE DO') {
        iconName = focused ? 'ribbon' : 'ribbon-outline';
        color = focused ? '#fff' : '#000';
      }
      else if (rn === 'BLOG') {
        iconName = focused ? 'newspaper' : 'newspaper-outline';
        color = focused ? '#fff' : '#000';
      }     
      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    }

      }) }>
        <Drawer.Screen name="HOME" component={HomeScreen} options={{ drawerLabel: 'Home', headerShown: true, headerStyle : styles.headerStyle}}/>
        <Drawer.Screen name="CONTACT US" component={ContactUs}  options={{ drawerLabel: 'Contact Us' }}/>
        <Drawer.Screen name="SERVICES" component={Services} options={{ drawerLabel: 'Services' }}/>
        <Drawer.Screen name="CERTIFICATIONS" component={Certifications}  options={{ drawerLabel: 'Certifications' }}/>
        <Drawer.Screen name="WHAT WE DO" component={WhatWeDo} options={{ drawerLabel: 'What We Do' }}/>
        <Drawer.Screen name="BLOG" component={Blog} options={{ drawerLabel: 'Blog' }}/>
      </Drawer.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle:{
    textAlign:"center", 
    },
    headerStyleTwo:{
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
    },
    logoHeadFont:{
     fontSize: 14,
     textAlign: 'center'
    },
    logoSubHeadFont:{
      fontSize: 10,
      textAlign: 'center'
     },
     copyRightText:{
      textAlign:'center',
      fontSize:10,
     },
     callOnTop:{
      marginRight: 16,
      marginTop: 0,
      padding: 6,
      backgroundColor: '#ccc',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
     },
     callOnTopText: {
      color: '#fff',
      textAlign: 'center',
    }
  }); 


  const drawerTheme = StyleSheet.create({
    colors: {
      backgroundColor: '#263365', borderRadius:10,  width: '80%'
    } }); 