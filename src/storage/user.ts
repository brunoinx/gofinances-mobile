import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDTO } from '@/dtos/UserDTO';

const key = '@gofinances:user';

export async function getUserStorage(): Promise<UserDTO | null> {
  try {
    const response = await AsyncStorage.getItem(key);
    return response !== null ? JSON.parse(response) : null;
  } catch (error) {
    return error;
  }
}

export async function setUserStorage(user: UserDTO | null): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(user));
  } catch (error) {
    return error;
  }
}
