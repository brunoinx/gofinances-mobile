import React, { useState } from 'react'
import {
  View,
  Modal,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import uuid from 'react-native-uuid'
import * as Yup from 'yup'

import { Button } from '@/components/Form/Button'
import { InputForm } from '@/components/Form/InputForm'
import { CategorySelectButton } from '@/components/Form/CategorySelectButton'
import { TransactionTypeButton } from '@/components/Form/TransactionTypeButton'

import { CategorySelect } from '@/screens/CategorySelect'

import { RootParamsListProps } from '@/dtos/RootParamsListDTO'

import * as S from './styles'
import { Header } from '@/components/Header'
import { getTransactions, setTransactions } from '@/storage/transactions'
import { CategoryKeyProps, TransactionDTO } from '@/dtos/transactionDTO'

type CategoryProps = {
  key: CategoryKeyProps
  name: string
}

export type FormData = {
  name: string
  amount: string
}

const schema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('Somente números positivos')
    .required('Preço é obrigatório'),
})

export function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const navigation = useNavigation<RootParamsListProps>()

  const [transactionType, setTransactionType] = useState<
    'income' | 'outcome' | ''
  >('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({} as CategoryProps)

  function handleTransactionsTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  async function handleRegister({ name, amount }: FormData) {
    if (!transactionType) return Alert.alert('Selecione o tipo da transação')

    if (!category.key) return Alert.alert('Selecione a categoria')

    const newTransaction: TransactionDTO = {
      id: String(uuid.v4()),
      name,
      amount: Number(amount),
      transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const currentData = await getTransactions()

      const dataFormatted = [...currentData, newTransaction]

      setTransactions(dataFormatted)

      reset()
      setTransactionType('')
      setCategory({} as CategoryProps)

      navigation.navigate('Dashboard')
    } catch (error) {
      Alert.alert('Erro ao salvar a transação')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <Header title="Cadastro" />

        <S.Form>
          <View>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
              errors={errors.name?.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              errors={errors.amount?.message}
            />

            <S.TransactionsType>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionsTypeSelect('income')}
                isActive={transactionType === 'income'}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionsTypeSelect('outcome')}
                isActive={transactionType === 'outcome'}
              />
            </S.TransactionsType>

            <CategorySelectButton
              label={category.name || 'Categoria'}
              onPress={handleOpenSelectCategoryModal}
            />
          </View>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </S.Form>

        <Modal
          visible={categoryModalOpen}
          animationType="slide"
          onRequestClose={handleCloseSelectCategoryModal}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  )
}
