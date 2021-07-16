import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps
} from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [ data, setData ] = useState([] as DataListProps[]);

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions =  response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions
    .map((item: DataListProps) => {
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const formattedDate = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: formattedDate
        };
    });

    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/50638499?v=4' }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Vinicius</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name='power'/>
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          type='total'
          title='Total'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard data={item} />
          )}
        />
      </Transactions>
    </Container>
  );
}
