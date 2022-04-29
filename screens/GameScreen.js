import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Alert,
    FlatList,
    useWindowDimensions,
} from 'react-native'
import Title from '../components/ui/Title'
import GuessLogItem from '../components/game/GuessLogItem'
import GameContentNarrow from '../components/game/GameContentNarrow'
import GameContentWide from '../components/game/GameContentWide'
import DIRECTIONS from '../constants/directions'
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
    const [guessRounds, setGuessRounds] = useState([initalGuess])

    // getting screen dimensions dynamically to watch for orientation changes
    const { width, height } = useWindowDimensions()

    // watch for new guesses and tigger game over function if guess matches userNumber
    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

    /**
     * Onclick event handler for pressing lower than or greater than buttons.
     * @param {string} direction - which button has been pressed - lower than or greater than
     * @returns {void}
     */
    const nextGuess = (direction) => {
        // prevent incorrect indication being given to device to guide next guess
        if (
            (direction === DIRECTIONS.LOWER && currentGuess < userNumber) ||
            (direction === DIRECTIONS.GREATER && currentGuess > userNumber)
        ) {
            Alert.alert('Incorrect', 'This hint is wrong', [
                { text: 'Sorry!', style: 'cancel' },
            ])
            return
        }

        // set max or min directions given the current guess and whether it was too high or low
        if (direction === DIRECTIONS.LOWER) {
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }

        // generate a new guess with new max/min boundaries
        const newRandomNumber = generateRandomNumberBetween(
            minBoundary,
            maxBoundary,
            currentGuess,
        )
        setCurrentGuess(newRandomNumber)

        // update # of guess rounds
        setGuessRounds((previousGuessRounds) => [
            newRandomNumber,
            ...previousGuessRounds,
        ])
    }

    const guessRoundsListLength = guessRounds.length

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {width > 500 ? (
                <GameContentWide
                    currentGuess={currentGuess}
                    nextGuess={nextGuess}
                />
            ) : (
                <GameContentNarrow
                    currentGuess={currentGuess}
                    nextGuess={nextGuess}
                />
            )}
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => (
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item}
                        />
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
})
