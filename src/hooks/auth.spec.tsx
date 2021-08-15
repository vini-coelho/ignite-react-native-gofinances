import { act, renderHook } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';

jest.mock('expo-auth-session');

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    id: 'any_id',
    email: 'johndoe@gmail.com',
    given_name: 'John Doe',
    picture: 'any_picture'
  })
}))

describe('Auth hook', () => {
  it('should be able to sign in with existing Google account', async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValue({
      type: 'success',
      params: {
        access_token: 'any_token'
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('johndoe@gmail.com');
  });

  it('should not authenticate if Google authentication is canceled', async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValue({
      type: 'cancel'
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});
