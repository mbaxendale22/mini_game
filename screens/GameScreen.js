import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Alert,
    FlatList,
    useWindowDimensions,
} from 'react-native'
import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem'
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
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert('Incorrect', 'This hint is wrong', [
                { text: 'Sorry!', style: 'cancel' },
            ])
            return
        }

        // set max or min directions given the current guess and whether it was too high or low
        if (direction === 'lower') {
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

    // conditional layout depending on screen width > or  < 500 pixels
    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>
                    Higher or Lower?
                </InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuess('lower')}>
                            <Ionicons
                                name="md-remove"
                                size={24}
                                color="white"
                            />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuess('greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    )

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuess('lower')}>
                            <Ionicons
                                name="md-remove"
                                size={24}
                                color="white"
                            />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuess('greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </>
        )
    }
    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
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
