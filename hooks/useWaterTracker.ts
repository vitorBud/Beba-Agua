import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "WATER_CONSUMPTION";
const GOAL_KEY = "WATER_GOAL";
const DEFAULT_GOAL = 2000; // em ml

export function useWaterTracker() {
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      const savedGoal = await AsyncStorage.getItem(GOAL_KEY);

      if (saved !== null) setCurrent(Number(saved));
      if (savedGoal !== null) setGoal(Number(savedGoal));
    } catch (e) {
      console.error("Erro ao carregar dados", e);
    }
  }

  async function addWater(amount: number) {
    const newAmount = current + amount;
    setCurrent(newAmount);
    await AsyncStorage.setItem(STORAGE_KEY, newAmount.toString());
  }

  async function resetWater() {
    setCurrent(0);
    await AsyncStorage.setItem(STORAGE_KEY, "0");
  }

  async function setNewGoal(newGoal: number) {
    setGoal(newGoal);
    await AsyncStorage.setItem(GOAL_KEY, newGoal.toString());
  }

  return {
    goal,
    current,
    addWater,
    resetWater,
    setNewGoal,
    percentage: Math.min(current / goal, 1),
  };
}
