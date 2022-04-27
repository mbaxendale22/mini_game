import { View, StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import React from 'react'

const Card = ({ children }) => {
    return <View style={styles.card}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.Primary800,
        borderRadius: 8,
        // box shadow for android
        elevation: 4,
        // box shadow for ios
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
})
