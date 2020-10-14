import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  filter: {
    backgroundColor: "lightgray",
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
    backgroundColor: "powderblue",
    flex: 1,
  },
  inputButton: {
    backgroundColor: "steelblue",
    width: 100,
  },
  todoItem: {
    fontSize: 20,
    backgroundColor: "white",
  },
  todoItemDone: {
    fontSize: 20,
    backgroundColor: "red",
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
    todo.forEach(t => console.log(t));
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

  const TodoItem = (props) => {
    let textStyle = styles.todoItem;
    if (props.done === true) {
      textStyle = styles.todoItemDone;
    }
    return (
      <TouchableOpacity onPress={props.onTapTodoItem}>
        <Text style={textStyle}>{props.title}</Text>
      </TouchableOpacity>
    );
  };

  const onTapTodoItem = (todoItem) => {
    console.log(todoItem);
    const index = todo.indexOf(todoItem);
    todoItem.done = !todoItem.done;
    todo[index] = todoItem;
    setTodo(todo);
    saveTodo(todo);
  };

  const renderItem = ({ item }) => (
             <TouchableOpacity
            onPress={() => onTapTodoItem(item)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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
        extraData={todo}
        renderItem={({ item }) => (
          <TodoItem
            title={item.title}
            done={item.done}
            onTapTodoItem={() => onTapTodoItem(item)}
          />
        )}
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
    </SafeAreaView>
  );
};

export default App;
