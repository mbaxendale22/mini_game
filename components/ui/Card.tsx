import { View, StyleSheet, Dimensions } from 'react-native'
import Colors from '../../constants/colors'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const Card = (props: Props) => {
    const { children } = props

    return <View style={styles.card}>{children}</View>
}

export default Card

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidth < 380 ? 18 : 36,
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
