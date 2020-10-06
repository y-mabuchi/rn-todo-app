import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
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

  const onAddItem = () => {
    const title = inputText;
    if (title == "") {
      return;
    }
    const index = currentIndex + 1;
    const newTodo = { index: index, title: title, done: false };
    setTodo([...todo, newTodo]);
    setCurrentIndex(index);
    setInputText(null);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.filter}>
        <Text>Filterがここに配置されます</Text>
      </View>
      <ScrollView style={styles.todolist}>
        <FlatList
          data={todo}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          keyExtractor={(item, index) => "todo_" + item.index}
        />
      </ScrollView>
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
