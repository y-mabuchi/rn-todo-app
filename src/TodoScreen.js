import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import {
  SearchBar,
  Input,
  Button,
  ListItem,
} from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/MaterialIcons";

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
    height: 50,
    flexDirection: "row",
    paddingRight: 10,
  },
  inputText: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputButton: {
    width: 48,
    height: 48,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 48,
    backgroundColor: "#ff6347",
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
  const [selectedId, setSelectedId] = React.useState(null);
  const TODO = "@todoapp.todo";
  const platform = Platform.OS == "ios" ? "ios" : "android";

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

  const TodoItem = ({ item, onPress, icon }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <Icon2 name={icon}/>
        </ListItem>
      </TouchableOpacity>
    );
  };

  const onTapTodoItem = (todoItem) => {
    const index = todo.indexOf(todoItem);
    todoItem.done = !todoItem.done;
    todo[index] = todoItem;
    setTodo(todo);
    saveTodo(todo);
    console.log(todoItem);
  };

  const renderItem = ({ item }) => {
    let icon = item.done ? "done" : null;

    return (
      <TodoItem
        item={item}
        onPress={() => onTapTodoItem(item)}
        icon={icon}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        platform={platform}
        cancelButtonTitle="Cancel"
        onChangeText={(text) => filter(text)}
        onClear={() => setFilterText("")}
        value={filterText}
        placeholder="Type filter text"
      />
      <FlatList
        style={styles.todolist}
        data={filteredTodo}
        extraData={filteredTodo}
        renderItem={renderItem}
        keyExtractor={(item, index) => "todo_" + item.index}
      />
      <View style={styles.input}>
        <Input
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          containerStyle={styles.inputText}
        />
        <Button
          icon={
            <Icon
              name="plus"
              size={30}
              color="white"
            />
          }
          title=""
          onPress={onAddItem}
          buttonStyle={styles.inputButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
