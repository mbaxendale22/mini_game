import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import React from 'react'

const InstructionText = ({ children, style }) => {
    return <Text style={[styles.instructionText, style]}>{children}</Text>
}

export default InstructionText

const styles = StyleSheet.create({
    instructionText: {
        color: Colors.Accent500,
        fontFamily: 'open-sans',
        fontSize: 24,
    },
})
