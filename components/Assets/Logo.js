import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return (
    <Image
      source={{
        uri: "https://img.freepik.com/free-vector/bus-driver-concept-illustration_114360-6610.jpg?w=360",
      }}
      style={{ width: 250, height: 250, marginTop: -50 }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})