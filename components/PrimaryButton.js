import { View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '../constants/colors'
import React from 'react'

const PrimaryButton = ({ children, onPress }) => {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                // style can take a function which allows for conditional rendering
                // style can also take an array of style properties
                style={({ pressed }) =>
                    pressed
                        ? [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer
                }
                android_ripple={{ color: Colors.Primary600 }}
                onPress={onPress}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.Primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
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
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
})
