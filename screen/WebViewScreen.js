import React, { Component } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default class WebViewScreen extends Component {
  constructor(props) {
    super(props);
    //console.log(props.route.params);
    this.state = {
      bodayText: "",
      url: props.url
    };
  }

  IndicatorLoadingView() {
    return (
      <ActivityIndicator
        color="#263365"
        size="large"
        style={styles.IndicatorStyle}
      />
    );
  }

  render() {
    return (
      <WebView
        source={{ uri: this.state.url }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        renderLoading={this.IndicatorLoadingView}
        startInLoadingState={true}
      />
    );
  }
}
const styles = StyleSheet.create({
  IndicatorStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'space-around',
    padding: 10,
  }
});