import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuthStore } from "../../stores/authStore";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
    login();
    router.replace("/(app)/home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput
        style={styles.input}
        placeholderTextColor="lightgray"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError("");
        }}
        returnKeyType="done"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholderTextColor="lightgray"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        returnKeyType="done"
      />

      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  link: {
    marginTop: 20,
    color: '#1E90FF',
    textAlign: 'center',
  },
});