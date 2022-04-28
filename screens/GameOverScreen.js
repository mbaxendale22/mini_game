import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Title from '../components/ui/Title'
import Colors from '../constants/colors'
import PrimaryButton from '../components/ui/PrimaryButton'
import React from 'react'

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
    return (
        <View style={styles.rootContainer}>
            <Title>Game Over</Title>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/success.png')}
                />
            </View>
            <Text style={styles.summaryText}>
                Your phone needed{' '}
                <Text style={styles.highlight}>{roundsNumber}</Text> rounds to
                guess <Text style={styles.highlight}>{userNumber}</Text>
            </Text>
            <PrimaryButton onPress={onStartNewGame}>
                Start New Game
            </PrimaryButton>
        </View>
    )
}

const deviceWidth = Dimensions.get('window').width

export default GameOverScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderRadius: deviceWidth < 380 ? 75 : 150,
        width: deviceWidth < 380 ? 150 : 300,
        height: deviceWidth < 380 ? 150 : 300,
        borderWidth: 3,
        borderColor: Colors.Primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.Primary500,
    },
})
