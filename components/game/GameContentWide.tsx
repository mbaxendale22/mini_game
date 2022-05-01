import { StyleSheet, Text, View } from 'react-native'
import NumberContainer from './NumberContainer'
import PrimaryButton from '../ui/PrimaryButton'
import { Ionicons } from '@expo/vector-icons'
import DIRECTIONS from '../../constants/directions'
import React from 'react'

type Props = {
    currentGuess: number
    nextGuess: (direction: string) => void
}

const GameContentWide = (props: Props) => {
    const { currentGuess, nextGuess } = props
    return (
        <>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuess(DIRECTIONS.LOWER)}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        onPress={() => nextGuess(DIRECTIONS.GREATER)}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </>
    )
}

export default GameContentWide

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
})
