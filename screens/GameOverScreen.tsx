import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    useWindowDimensions,
} from 'react-native'
import Title from '../components/ui/Title'
import Colors from '../constants/colors'
import PrimaryButton from '../components/ui/PrimaryButton'
import React from 'react'

type Props = {
    roundsNumber: number
    userNumber: number
    onStartNewGame: () => void
}

const GameOverScreen = (props: Props) => {
    const { roundsNumber, userNumber, onStartNewGame } = props
    const { width, height } = useWindowDimensions()

    // variable to control image size depending on screen orientation
    let imageSize = 300

    if (width < 380) {
        imageSize = 150
    }

    if (height < 400) {
        imageSize = 80
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    }
    return (
        <View style={styles.rootContainer}>
            <Title>Game Over</Title>
            <View style={[styles.imageContainer, imageStyle]}>
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
