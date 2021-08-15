import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../global/theme';

import { Register } from '.';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

jest.mock('../../hooks/auth.tsx', () => ({
    useAuth: () => ({
      user: {
        id: 'any_id'
      }
    })
}));

describe('Register screen', () => {
  it('should open Category modal when user clicks category button', () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    );

    const categorySelectButton = getByTestId('button-categoryselect');
    const categoryModal = getByTestId('modal-category');

    fireEvent.press(categorySelectButton);

    expect(categoryModal.props.visible).toBeTruthy();
  })
})
