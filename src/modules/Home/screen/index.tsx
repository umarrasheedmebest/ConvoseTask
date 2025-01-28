import React from 'react';
import {
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {InterestName} from '../components';
import {HomeComponentType} from '../../../types/HomePropsType';

const HomeComponent: React.FC<HomeComponentType> = ({
  searchTerm,
  setSearchTerm,
  interests,
}) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        data={[...interests].reverse()} // Reverse to display bottom-to-top without mutating the original array
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : `key-${index}`
        } // Fallback to index if id is undefined
        renderItem={InterestName} // Pass the interest item to InterestName
        contentContainerStyle={styles.list}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search interests..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Text>Search Data</Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end', // Align list to bottom
  },
});

export default HomeComponent;
