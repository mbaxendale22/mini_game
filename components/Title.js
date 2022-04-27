import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/colors'
import React from 'react'

const Title = ({ children }) => {
    return <Text style={styles.title}>{children}</Text>
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.Accent500,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: Colors.Accent500,
        padding: 12,
    },
})
