import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
/**
 * Generates the target number for the game
 * @param {number} min - lowest possible value for target number.
 * @param {number} max - highest possible value for target number.
 * @param {number} exclude - The user entered number - prevents match on first try
 * @returns {number} - returns the target number
 */

const generateRandomNumberBetween = (min, max, exclude) => {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min
    if (randomNumber === exclude) {
        return generateRandomNumberBetween(min, max, exclude)
    } else {
        return randomNumber
    }
}
let minBoundary = 1
let maxBoundary = 100
const GameScreen = ({ userNumber, onGameOver }) => {
    const initalGuess = generateRandomNumberBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initalGuess)

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver()
        }
    }, [currentGuess, userNumber, onGameOver])

    /**
     * Generates the target number for the game.
     * @param {string} direction - whether the next guess will be higher or lower the the previous one
     * @returns {number} - returns the target number
     */
    const nextGuess = (direction) => {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert('Incorrect', 'This hint is wrong', [
                { text: 'Sorry!', style: 'cancel' },
            ])
            return
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }

        console.log(maxBoundary, minBoundary)
        const newRandomNumber = generateRandomNumberBetween(
            minBoundary,
            maxBoundary,
            currentGuess,
        )
        setCurrentGuess(newRandomNumber)
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText>Higher or Lower?</InstructionText>
                <View>
                    <PrimaryButton onPress={() => nextGuess('lower')}>
                        -
                    </PrimaryButton>
                    <PrimaryButton onPress={() => nextGuess('greater')}>
                        +
                    </PrimaryButton>
                </View>
            </Card>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
})
