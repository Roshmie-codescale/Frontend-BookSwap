import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../styles/DashBoardStyles';
import {useNavigation} from '@react-navigation/native';
import {getBooks} from '../api/bookRoutes';
import {searchBookByNameAuthor} from '../api/bookRoutes';
import {useDispatch, useSelector} from 'react-redux';
import { addFavorite, removeFavorite } from '../app/favoritesSlice';

const DashBoardScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error loading books:', error);
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = async () => {
    try {
      const data = await searchBookByNameAuthor(searchQuery);
      setBooks(data);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Store</Text>
        {/* <Text>{data}</Text> */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name or author"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          // onSubmitEditing={() => {
          //   console.log('Search query:', searchQuery);
          // }}
          onSubmitEditing={filteredBooks}
        />
      </View>

      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Category</Text>
        </TouchableOpacity>
      </ScrollView> */}

      <FlatList
        data={books}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate('BookScreen', {bookId: item._id})
            }>
            <Image source={{uri: item.bookImage}} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>Author: {item.auther}</Text>
              <Text style={styles.text}>ISBN: {item.ISBN}</Text>
              <Text style={styles.price}>Price: {item.price}</Text>
              <View style={styles.conditionContainer}>
                <View
                  style={[
                    styles.conditionContainer,
                    {
                      backgroundColor: item.isConditionUsed
                        ? '#cce5ff'
                        : '#d4edda',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.conditionText,
                      {
                        color: item.isConditionUsed ? '#004085' : '#155724',
                      },
                    ]}>
                    {item.isConditionUsed ? 'Used' : 'New'}
                  </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => dispatch(addFavorite(item))}>
                  <Text style={styles.favoriteButtonText}>Add to Favorites ❤️ </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DashBoardScreen;
