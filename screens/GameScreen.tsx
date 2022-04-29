import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Alert,
    FlatList,
    useWindowDimensions,
    ListRenderItemInfo,
} from 'react-native'
import Title from '../components/ui/Title'
import GuessLogItem from '../components/game/GuessLogItem'
import GameContentNarrow from '../components/game/GameContentNarrow'
import GameContentWide from '../components/game/GameContentWide'
import DIRECTIONS from '../constants/directions'

const generateRandomNumberBetween = (
    min: number,
    max: number,
    exclude: number,
): number => {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min
    if (randomNumber === exclude) {
        return generateRandomNumberBetween(min, max, exclude)
    } else {
        return randomNumber
    }
}
let minBoundary = 1
let maxBoundary = 100

type Props = {
    userNumber: number
    onGameOver: (param: number) => void
}
const GameScreen = (props: Props) => {
    const { userNumber, onGameOver } = props
    const initialGuess = generateRandomNumberBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    // getting screen dimensions dynamically to watch for orientation changes
    const { width, height } = useWindowDimensions()

    // watch for new guesses and trigger game over function if guess matches userNumber
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
     */
    const nextGuess = (direction: string) => {
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
    const renderItem = ({ item, index }: ListRenderItemInfo<number>) => {
        return (
            <GuessLogItem
                roundNumber={guessRoundsListLength - index}
                guess={item}
            />
        )
    }

    const keyExtractor = (item: number) => item.toString()

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
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
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
