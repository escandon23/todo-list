import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Button, Image, Modal, StyleSheet, TextInput, View } from "react-native"

const GoalInput = ({addGoalHandler , visible , onCancel}) => {
    
    const [enteredGoal , setEnteredGoal] = useState("")
    
    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
    }

    const handleGoal = () => {
        addGoalHandler(enteredGoal)
        setEnteredGoal("")
    }

    return(
        <>
        <StatusBar style="light"/>
         <Modal visible={visible} animationType="slide">
            <View style={styles.inputContainer}>
                 <Image source={require("../assets/images/bullseye.png")} style={styles.image}/>

                <TextInput onChangeText={goalInputHandler} value={enteredGoal} style={styles.textInput} />
            <View style={styles.buttonContainer}>
              
                <View style={styles.button}>
                    <Button color="#f31282" title="Cancel" onPress={onCancel} />
                </View>
                  <View style={styles.button}>
                    <Button color="#a87ae4"  onPress={handleGoal} title="Add Goal" />
                </View>

            </View>   
             </View>  

        </Modal>
        </>
       
      

    )

}


export default GoalInput


const styles = StyleSheet.create({
    inputContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        padding : 16,
        backgroundColor : "#311B6B"
    },
    image : {
        height : 100,
        width : 100,
        margin : 20
    },
    textInput : {
        borderWidth : 1,
        borderColor : "#e4d0ff",
        backgroundColor : "#e4d0ff",
        color :"#120438",
        borderRadius : 6,
        width : "100%",
        margin : 10,
        padding : 16
    },
    buttonContainer : {
        marginTop : 8,
        flexDirection : "row"
    },
    button : {
        width: 100,
        marginHorizontal : 8

    }

})