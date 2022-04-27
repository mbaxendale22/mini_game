import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import Colors from './constants/colors'
import { useState } from 'react'
export default function App() {
    const [userNumber, setUserNumber] = useState()
    const pickedNumber = (pickedNumber) => setUserNumber(pickedNumber)

    let screen = <StartGameScreen onPickedNumber={pickedNumber} />

    if (userNumber) {
        screen = <GameScreen />
    }

    return (
        <LinearGradient
            colors={[Colors.Primary700, Colors.Accent500]}
            style={styles.rootScreen}>
            <ImageBackground
                source={require('./assets/images/background.png')}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}>
                <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.5,
    },
})
