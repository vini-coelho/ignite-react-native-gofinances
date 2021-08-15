import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

export function Profile() {
  return (
    <View>
      <Text testID='text-title'>Perfil</Text>
      <TextInput
        testID='input-name'
        placeholder='Nome'
        value='Vini'
        autoCorrect={false}
      />
      <TextInput
        testID='input-surname'
        placeholder='sobrenmome'
        value='Coelho'
      />
      <Button
        title='Salvar'
        onPress={() => {}}
      />
    </View>
  );
}
