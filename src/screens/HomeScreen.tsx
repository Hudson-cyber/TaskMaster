import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
} from "react-native-reanimated";

import {
  Appbar,
  Button,
  Card,
  Checkbox,
  Text,
  TextInput,
  FAB,
} from "react-native-paper";
import { colors } from "../constants/colors";
import { ITask } from "../@types/task";

type TaskItemProps = {
  task: ITask;
  onToggle: (id: string) => void;
};

const TaskItem = ({ task, onToggle }: TaskItemProps) => (
  <Animated.View entering={FadeIn.duration(500)}>
    <Card style={styles.card}>
      <Card.Title
        title={task.title}
        titleStyle={task.completed ? styles.taskTextCompleted : undefined}
        left={(props) => (
          <Checkbox
            {...props}
            status={task.completed ? "checked" : "unchecked"}
            onPress={() => onToggle(task.id)}
          />
        )}
      />
    </Card>
  </Animated.View>
);

export function HomeScreen() {
  // Usando useState para gerenciar a lista de tarefas.
  // TypeScript infere o tipo 'ITask[]' a partir do valor inicial.
  const [tasks, setTasks] = useState<ITask[]>([
    { id: "1", title: "Estilizar com React Native Paper", completed: true },
    { id: "2", title: "Adicionar animações", completed: false },
  ]);

  const handleToggleTask = (id: String) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="TaskMaster" />
      </Appbar.Header>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggleTask} />
        )}
        contentContainerStyle={styles.list}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log("Adicionar nova tarefa")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 8,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: colors.placeholder,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.accent,
  },
});
