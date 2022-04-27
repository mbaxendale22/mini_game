import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'

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
const GameScreen = ({ userNumber }) => {
    const initalGuess = generateRandomNumberBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initalGuess)
    console.log(currentGuess)

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or Lower?</Text>
            </View>
            {/* <View>LOG ROUNDS</View> */}
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
