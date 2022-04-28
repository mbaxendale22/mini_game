import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'

const Title = ({ children }) => {
    return <Text style={styles.title}>{children}</Text>
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderColor: 'white',
        padding: 12,
    },
})
