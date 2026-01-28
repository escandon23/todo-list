import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App(){

    const [courseGoals , setCourseGoals] = useState([])
    const [modalIsVisible , setModalIsVisible] = useState(false)


      
    const startAddGoalHandler = () => {
      setModalIsVisible(true)
    }

    const endAddGoalHandler = () => {
      setModalIsVisible(false)
    }

    const addGoalHandler = (enteredGoal) => {
        setCourseGoals(prevCourseGoals => [...prevCourseGoals , {text : enteredGoal , id : Math.random().toString()}])
        endAddGoalHandler()
    }

    const handleDelete = (id) => {
      setCourseGoals(prevCourseGoals => prevCourseGoals.filter(goal => goal.id !== id))         
    }


  return (
    <>
      <StatusBar style="light"/>
      <View style={styles.appContainer}>
        <Button title ="Add new Goal" color="#a968fd" onPress={startAddGoalHandler}/>
        {modalIsVisible && <GoalInput visible={modalIsVisible} addGoalHandler = {addGoalHandler} onCancel={endAddGoalHandler} />}
          <View style={styles.goalContainer}>
            <FlatList data={courseGoals} renderItem={itemData =>  {
                return <GoalItem text={itemData.item.text} handleDelete={handleDelete} id={itemData.item.id}/>
            }

          } keyExtractor={(item,index) => (item.id)} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer : {
    flex : 1,
    paddingTop : 50,
    paddingHorizontal : 16,
    backgroundColor : "#1e085a"

  },

  goalContainer : {
    flex : 5
  }

});

