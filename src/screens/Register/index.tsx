import React, { useState } from 'react'
import { View, StatusBar, Modal } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Button } from '@/components/Form/Button'
import { CategorySelectButton } from '@/components/Form/CategorySelectButton'
import { TransactionTypeButton } from '@/components/Form/TransactionTypeButton'

import { CategorySelect } from '@/screens/CategorySelect'

import * as S from './styles'
import { InputForm } from '@/components/Form/InputForm'

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
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  function handleTransactionsTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleRegister({ name, amount }: FormData) {
    const data = {
      name,
      amount: Number(amount),
      transactionType,
    }
    console.log(data)
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <S.HeaderTitle>Cadastro</S.HeaderTitle>
      </S.Header>

      <S.Form>
        <View>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
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
  )
}
