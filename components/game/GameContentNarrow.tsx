import { StyleSheet, View } from 'react-native'
import NumberContainer from './NumberContainer'
import InstructionText from '../ui/InstructionText'
import PrimaryButton from '../ui/PrimaryButton'
import Card from '../ui/Card'
import { Ionicons } from '@expo/vector-icons'
import DIRECTIONS from '../../constants/directions'
import React from 'react'

type Props = {
    currentGuess: number
    nextGuess: (direction: string) => void
}

const GameContentNarrow = (props: Props) => {
    const { currentGuess, nextGuess } = props
    return (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>
                    Higher or Lower?
                </InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={() => nextGuess(DIRECTIONS.LOWER)}>
                            <Ionicons
                                name="md-remove"
                                size={24}
                                color="white"
                            />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={() => nextGuess(DIRECTIONS.GREATER)}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    )
}

export default GameContentNarrow

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 12,
    },
})
