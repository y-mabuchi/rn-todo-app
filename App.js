import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";

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
  },
});

const App = () => {
  const todos = [
    { index: 1, title: "原稿を書く", done: false },
    { index: 2, title: "犬の散歩をする", done: false },
  ];

  const [todo, setTodo] = React.useState(todos);

  return (
    <View style={styles.container}>
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
        <Text>テキスト入力がここに配置されます</Text>
      </View>
    </View>
  );
};

export default App;
