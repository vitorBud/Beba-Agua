import { View, Text, Pressable, StyleSheet, SafeAreaView, Animated } from "react-native";
import { useWaterTracker } from "../../hooks/useWaterTracker";
import { WaterProgress } from "../../components/WaterProgress";
import { useEffect, useRef } from "react";

export default function HomeScreen() {
  const { current, goal, addWater, resetWater, percentage } = useWaterTracker(); // 👈 certifique-se de ter resetWater no hook

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAddWater = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    addWater(200);
  };

  const getMotivation = () => {
    if (percentage >= 100) return "🎉 Meta alcançada!";
    if (percentage >= 75) return "Quase lá, continue assim!";
    if (percentage >= 50) return "Você está indo bem!";
    return "Vamos lá, mantenha-se hidratado!";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>💧 Beba Água</Text>

      <WaterProgress current={current} goal={goal} percentage={percentage} />

      <Text style={styles.motivation}>{getMotivation()}</Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable style={styles.button} onPress={handleAddWater}>
          <Text style={styles.buttonText}>+ 200ml</Text>
        </Pressable>
      </Animated.View>

      <Pressable style={styles.resetButton} onPress={resetWater}>
        <Text style={styles.resetButtonText}>Resetar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#E6F7FF",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#0077B6",
  },
  motivation: {
    fontSize: 18,
    marginTop: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#00BFFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 40,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  resetButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});
