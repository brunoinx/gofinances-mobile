import AsyncStorage from '@react-native-async-storage/async-storage';
import { TransactionDTO } from '@/dtos/transactionDTO';

const key = '@gofinances:transactions';

export async function getTransactions(): Promise<TransactionDTO[]> {
  try {
    const response = await AsyncStorage.getItem(key);
    return response !== null ? JSON.parse(response) : null;
  } catch (error) {
    return error;
  }
}

export async function setTransactions(
  transaction: TransactionDTO[],
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(transaction));
  } catch (error) {
    return error;
  }
}
