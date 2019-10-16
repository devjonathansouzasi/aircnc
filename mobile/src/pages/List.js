import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  AsyncStorage,
  Text,
  Alert
} from "react-native";
import logo from "../../assets/logo.png";

import SpotList from "../components/SpotList";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.0.109:3200", {
        query: { user_id }
      });
      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reseva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved === true ? "aprovada!" : "rejeitada!"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Image source={logo} style={style.logo} />
      <ScrollView style={style.scroll}>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  },
  scroll: {
    marginBottom: 20
  }
});
