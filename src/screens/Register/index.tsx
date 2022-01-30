import React, { useState } from 'react'
import { View, StatusBar, Modal } from 'react-native'

import { Button } from '@/components/Form/Button'
import { Input } from '@/components/Form/Input'
import { CategorySelectButton } from '@/components/Form/CategorySelectButton'
import { TransactionTypeButton } from '@/components/Form/TransactionTypeButton'
import { categories } from '@/mocks/categories'

import { CategorySelect } from '@/screens/CategorySelect'

import * as S from './styles'

export function Register() {
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
          <Input
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
          />
          <Input placeholder="Preço" keyboardType="numeric" />

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

        <Button title="Enviar" onPress={() => console.log('oi')} />
      </S.Form>

      <Modal
        visible={categoryModalOpen}
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
