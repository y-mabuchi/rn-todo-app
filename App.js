import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  filter: {
    height: 30,
  },
  todolist: {
    flex: 1,
  },
  input: {
    height: 30,
    flexDirection: "row",
  },
  inputText: {
    flex: 1,
  },
  inputButton: {
    width: 100,
  },
});

const App = () => {
  const [todo, setTodo] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [inputText, setInputText] = React.useState();
  const [filterText, setFilterText] = React.useState();
  const [filteredTodo, setFilteredTodo] = React.useState([]);
  const TODO = "@todoapp.todo";

  useEffect(() => {
    loadTodo();
  }, []);

  const loadTodo = async () => {
    try {
      const todoString = await AsyncStorage.getItem(TODO);
      if (todoString) {
        const todo = JSON.parse(todoString);
        setCurrentIndex(todo.length);
        setTodo(todo);
        setFilteredTodo(todo);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveTodo = async (todo) => {
    try {
      const todoString = JSON.stringify(todo);
      await AsyncStorage.setItem(TODO, todoString);
    } catch (e) {
      console.log(e);
    }
  };

  const filter = (text) => {
    setFilterText(text);
    setFilteredTodo(todo.filter((t) => t.title.includes(text)));
  };

  const onAddItem = () => {
    const title = inputText;
    if (title == "") {
      return;
    }
    const index = currentIndex + 1;
    const newTodo = { index: index, title: title, done: false };
    const todos = [...todo, newTodo];
    setTodo(todos);
    setFilteredTodo(todos);
    setCurrentIndex(index);
    setInputText(null);
    setFilterText(null);
    saveTodo(todos);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.filter}>
        <TextInput
          onChangeText={(text) => filter(text)}
          value={filterText}
          style={styles.inputText}
          placeholder="Type filter text"
        />
      </View>
      <FlatList
        style={styles.todolist}
        data={filteredTodo}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item, index) => "todo_" + item.index}
      />
      <View style={styles.input}>
        <TextInput
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          style={styles.inputText}
        />
        <Button
          onPress={onAddItem}
          title="Add"
          color="#841584"
          style={styles.inputButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default App;
