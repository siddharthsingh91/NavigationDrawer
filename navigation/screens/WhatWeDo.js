
import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import HTML from "react-native-render-html";
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const WhatWeDo = () => {
    return (
      <Query query={gql`
      query NewQuery {
        pages(where: {id: 199}) {
          nodes {
            slug
            title
            content(format: RENDERED)
          }
        }
      }
    `}>
     {({loading, error, data })=> {
      if(loading){
        return(
          <View>
            <Text style={styles.loadText}>Loading...</Text>
          </View>
        )
      }
      console.log(data);
      return (
        <ScrollView style={{ backgroundColor: 'white', marginHorizontal: 10 }}>
        <View style={styles.container}>
          {data.pages.nodes.map((pages, key) =>{
            console.log(key);
            console.log(pages.title);
            return(
               <View key={key}>
               <Text style={styles.textColor}>{pages.title}</Text>
               <HTML source={{html: pages.content}}/>            
               <View style={styles.buttonView}>
               </View>
              </View>
              )
           })}
        </View>
        </ScrollView>
        );
     }}
    </Query>
    );
  };

export default WhatWeDo;

const stylesHtml = StyleSheet.create({
    a: {
      fontWeight: '300',
      color: '#FF3366', // make links coloured pink
    },
  });
   
  const styles = StyleSheet.create({
    loadText:{
      textAlign:'center',
      },
   container: {
   backgroundColor:'#fff',
   padding:20,
    },
    textColor:{
      color:"000",
      fontSize: 14,
      textTransform : 'uppercase',
      fontWeight : 'bold', 
      padding:10,
    },
    buttonView:{
          marginLeft:50,
          marginRight:50,
          borderWidth:2,
          borderRadius:20,
          borderColor:'#F31801',
          overflow:"hidden",
          marginBottom:10,
     }
    }); 