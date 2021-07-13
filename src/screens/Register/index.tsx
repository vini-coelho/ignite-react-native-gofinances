import React, { useState } from 'react';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionFormButton } from '../../components/Form/TransactionFormButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

export function Register() {
  const [transactionType, setTransactionType] = useState<'up' | 'down' | ''>('');

  function handleTransactionTypeSelect(type: 'up' | 'down' ) {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome'/>
          <Input placeholder='Preço'/>

          <TransactionTypes>
            <TransactionFormButton
              title='Income'
              type='up'
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionFormButton
              title='Outcome'
              type='down'
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionTypes>

          <CategorySelectButton />
        </Fields>

        <Button title='Enviar'/>
      </Form>
    </Container>
  );
}
