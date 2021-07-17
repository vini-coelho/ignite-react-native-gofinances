import React from 'react';
import { SummaryCard } from '../../components/SummaryCard';

import {
  Container,
  Header,
  Title
} from './styles';

export function Summary() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <SummaryCard
        title='Comppras'
        amount="R$1.200,00"
        color='red'
      />
    </Container>
  );
}
