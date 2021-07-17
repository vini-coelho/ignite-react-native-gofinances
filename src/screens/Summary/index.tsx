import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { categories } from '../../utils/categories';

import { SummaryCard } from '../../components/SummaryCard';

import {
  Container,
  Header,
  Title,
  Content
} from './styles';

interface TransactionData {
  id: string;
  type: 'up' | 'down';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Summary() {
  const [totalByCategory, setTotalByCategory] = useState([] as CategoryData[]);

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: TransactionData[] = response ? JSON.parse(response) : [];

    const expenses = responseFormatted
    .filter(expense => expense.type === 'down');

    const totalForCurrentCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach(expense => {
        if (expense.category === category.key){
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        totalForCurrentCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          color: category.color
        });
      }
    });

    setTotalByCategory(totalForCurrentCategory)
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {
          totalByCategory.map(item => (
            <SummaryCard
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  );
}
