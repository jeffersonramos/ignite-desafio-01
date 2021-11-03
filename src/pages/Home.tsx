import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function showAlertSameTitle() {
    Alert.alert(
      "Task já cadastrada",
      "Você não pode cadastrar uma task com o mesmo nome."
    );
  }

  function showAlertConfirmDelete(removeItem: Task) {
    Alert.alert(
      "Remover Task",
      "Tem certeza que deseja remover esse item?",
      [
        {
          text: "Não"
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter(task => task.id !== removeItem.id))
        }
      ]
    );
  }

  function handleAddTask(newTaskTitle: string) {

    let foundTitle = tasks.find(item => item.title === newTaskTitle);

    if(foundTitle) {
      showAlertSameTitle();
      return;
    }

    let task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    let updatedTasks = tasks.map(task => ({ ...task }));
    let foundTask = updatedTasks.find(item => item.id === id);

    if (foundTask) {
      foundTask.done = !foundTask.done;
      setTasks(updatedTasks);
    }    
  }

  function handleEditTask(id: number, taskNewTitle: string ) {
    let updatedTasks = tasks.map(task => ({ ...task }));
    let foundTask = updatedTasks.find(item => item.id === id);

    if (foundTask) {
      foundTask.title = taskNewTitle;
      setTasks(updatedTasks);
    }    
  }

  function handleRemoveTask(id: number) {

    let removeItem = tasks.find(task => task.id === id);

    if (removeItem) {      
      showAlertConfirmDelete(removeItem);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})