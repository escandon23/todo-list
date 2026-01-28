import { Pressable, StyleSheet, Text } from "react-native"

const GoalItem = (props) => {
    return (
       <Pressable onPress={props.handleDelete.bind(this , props.id)}>
            <Text style={styles.goalItem}>{props.text}</Text>
        </Pressable>
    )
}

export default GoalItem

const styles = StyleSheet.create({

    goalItem : {
        margin : 8 ,
        padding : 8,
        borderRadius : 6,
        backgroundColor : "#5e0acc",
        color : "white"
  }

})

