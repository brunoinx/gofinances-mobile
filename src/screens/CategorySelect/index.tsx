import React from 'react'
import { FlatList } from 'react-native'
import { Button } from '../../components/Form/Button'

import { categories } from '@/mocks/categories'
import { CategoryKeyProps } from '@/dtos/transactionDTO'

import * as S from './styles'

type CategoryProps = {
  key: CategoryKeyProps
  name: string
}

interface Props {
  category: CategoryProps
  setCategory: (category: CategoryProps) => void
  closeSelectCategory: () => void
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleCategorySelect(category: CategoryProps) {
    setCategory(category)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>

      <FlatList
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => handleCategorySelect(item as CategoryProps)}
            isActive={category.key === item.key}>
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </S.Footer>
    </S.Container>
  )
}
