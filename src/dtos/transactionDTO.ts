export type TransactionDTO = {
  amount: number
  category: 'purchases' | 'food' | 'salary' | 'car' | 'leisure' | 'studies'
  date: Date
  name: string
  transactionType: 'income' | 'outcome'
}
