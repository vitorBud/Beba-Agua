import { View, Text, StyleSheet } from "react-native";
import { LinearProgress } from "@rneui/themed";

type Props = {
  current: number;
  goal: number;
  percentage: number;
};

export function WaterProgress({ current, goal, percentage }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{current}ml / {goal}ml</Text>
      <LinearProgress
        value={percentage}
        variant="determinate"
        color="#00BFFF"
        style={styles.progress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 20,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
  },
  progress: {
    height: 15,
    borderRadius: 10,
  },
});
