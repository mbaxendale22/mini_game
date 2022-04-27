import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Colors from '../constants/colors'

const StartGameScreen = ({ onPickedNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState('')
    // watch for user input and update the enteredNumber state
    const handleNumberInput = (enteredText) => setEnteredNumber(enteredText)
    const resetInput = () => setEnteredNumber('')
    const handleConfirm = () => {
        const chosenNumber = parseInt(enteredNumber)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number must be between 1 and 99', [
                { text: 'Okay', style: 'destructive', onPress: resetInput },
            ])
            return
        }
        onPickedNumber(chosenNumber)
    }
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.numberInput}
                maxLength={2}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                // setting the value here makes this accesable wherever the state is updated
                value={enteredNumber}
                onChangeText={handleNumberInput}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={resetInput}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={handleConfirm}>
                        Confirm
                    </PrimaryButton>
                </View>
            </View>
        </View>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.Primary800,

        borderRadius: 8,
        // box shadow for android
        elevation: 4,
        // box shadow for ios
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.Accent500,
        borderBottomWidth: 2,
        color: Colors.Accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
})
