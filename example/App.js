import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker, PickerColumn, PickerItem} from 'react-native-roll-picker';

const App = () => {
  <View style={style.sectionContainer}>
    <Picker>
      <PickerColumn>
        <PickerItem label="Monday" value="Monday" />
        <PickerItem label="Tuesday" value="Tuesday" />
        <PickerItem label="Wednesday" value="Wednesday" />
        <PickerItem label="Thursday" value="Thursday" />
        <PickerItem label="Friday" value="Friday" />
      </PickerColumn>
    </Picker>
  </View>;
};

const style = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
