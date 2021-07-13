import React from 'react';

import {
  Container,
  Category,
  Icon
} from './styles';

export function CategorySelectButton() {
  return (
    <Container>
      <Category>Categoria</Category>
      <Icon name='chevron-down' />
    </Container>
  );
}
