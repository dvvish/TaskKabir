import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet } from "react-native";

const App = () => {
  interface User {
    id: number;
    name: string;
    email: string;
    company: {
      name: string;
    };
  }
  
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      {/* Use the json api which give 10 user data */}
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = users.filter((user) =>
      user.company.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee List</Text>
      {/*Searchbar for filter the data according to company name  */}
      <TextInput
        style={styles.input}
        placeholder="Search  The  company name..."
        value={search}
        onChangeText={handleSearch}
      />
      {/* Use FlatList to render the user data  in card format*/}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.company}>{item.company.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#bdb3b1",
  },
  card: {
    backgroundColor: "#a89f9e",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  company: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c0704",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});

export default App;
