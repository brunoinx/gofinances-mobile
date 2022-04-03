export type CategoryKeyProps =
  | 'purchases'
  | 'food'
  | 'salary'
  | 'car'
  | 'leisure'
  | 'studies'

export type TransactionDTO = {
  id: string
  amount: number
  category: CategoryKeyProps
  date: Date
  name: string
  transactionType: 'income' | 'outcome'
}
