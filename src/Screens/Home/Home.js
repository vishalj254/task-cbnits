/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  InteractionManager,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import {Colors} from '../../Config/Colors';
import {FontType} from '../../Config/Fonts';
import {textPlaceholder} from '../../Config/Texts';
import {
  deleteDataAxios,
  getDataAxios,
  postDataAxios,
  putDataAxios,
} from '../../Connectivity/FetchServices';
import AppHeader from '../../Custom/AppHeader/AppHeader';
import {
  addTodo,
  completeTodo,
  deleteTodo,
  uncompleteTodo,
  updateTodo,
} from '../../Reducer/appAction';
import {images} from '../Assets';
const {width} = Dimensions.get('screen');

const userid = 97;

const inputRef = React.createRef();

function Item({item, setrefresh, refresh, settodotext, setId}) {
  const [Selection, setSelection] = useState(
    item.completed_at != null ? true : false,
  );

  const deleteItem = async () => {
    await deleteDataAxios(`users/${userid}/tasks/${item.id}`);
    deleteTodo(item.id);
    setrefresh(!refresh);
    settodotext('');
  };

  const onStatusChange = async (event) => {
    if (event) {
      const result = await putDataAxios(
        `users/${userid}/tasks/${item.id}/completed`,
      );
      if (result.id) {
        completeTodo(result.id, result);
      }
    } else {
      const result = await putDataAxios(
        `users/${userid}/tasks/${item.id}/uncompleted`,
      );
      if (result.id) {
        uncompleteTodo(result.id, result);
      }
    }
    setrefresh(!refresh);
    setSelection(event);
  };
  return (
    <View style={styles.itemMainView}>
      <View style={styles.itemChildView}>
        <CheckBox
          value={Selection}
          onValueChange={(val) => onStatusChange(val)}
          tintColors={{true: Colors.red, false: Colors.lightgrey}}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            settodotext(item.description);
            setId(item.id);
            InteractionManager.runAfterInteractions(() => {
              inputRef.current.focus();
            });
          }}>
          <Text
            style={[
              styles.itemText,
              {textDecorationLine: Selection ? 'line-through' : 'none'},
            ]}>
            {item.description}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={deleteItem}>
        <Image source={images.delete} style={styles.imageView} />
      </TouchableOpacity>
    </View>
  );
}

const Home = () => {
  const [getId, setId] = useState('');
  const [todotext, settodotext] = useState('');
  const [refresh, setrefresh] = useState(false);
  const todoData = useSelector((state) => state.todo);
  const todo = Object.values(todoData);
  const arrC = [];
  const arrUC = [];
  todo.map((item) => {
    if (item.completed_at != null) {
      arrC.push(item);
    } else {
      arrUC.push(item);
    }
  });
  arrC.sort(function (a, b) {
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
  const finalTodo = [...arrUC.reverse(), ...arrC];

  function hasWhiteSpace(val) {
    const str = val.replace(/ /g, '');
    if (str.length === 0) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    arrC.length = 0;
    arrUC.length = 0;
  }, [todo]);

  const addNewItem = async () => {
    if (hasWhiteSpace(todotext)) {
      if (getId == '') {
        let body = {
          task: {
            description: todotext,
          },
        };
        let result = await postDataAxios(`users/${userid}/tasks`, body);
        if (result.id) {
          addTodo(result.id, result);
          setrefresh(!refresh);
          settodotext('');
          setId('');
        }
      } else {
        let body = {
          task: {
            description: todotext,
          },
        };
        let result = await putDataAxios(`users/${userid}/tasks/${getId}`, body);
        if (result.id) {
          updateTodo(result.id, result);
          setrefresh(!refresh);
          settodotext('');
          setId('');
        }
      }
    } else {
      Alert.alert('Please enter note...');
    }
  };

  const fetchAllTodo = async () => {
    let result = await getDataAxios(`users/${userid}/tasks`);
    if (result.length) {
      result.map((item) => {
        addTodo(item.id, item);
      });
      setrefresh(!refresh);
    }
  };

  useEffect(() => {
    fetchAllTodo();
  }, []);

  return (
    <>
      <AppHeader />
      <View style={styles.container}>
        <View style={styles.textView}>
          <Image source={images.add} style={styles.imageView} />
          <TextInput
            style={styles.textInput}
            placeholderTextColor={Colors.red}
            placeholder={textPlaceholder}
            onSubmitEditing={addNewItem}
            onChangeText={settodotext}
            value={todotext}
            ref={inputRef}
          />
        </View>
        <FlatList
          data={finalTodo}
          renderItem={({item}) => (
            <Item
              item={item}
              setrefresh={setrefresh}
              refresh={refresh}
              settodotext={settodotext}
              setId={setId}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    alignSelf: 'center',
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    fontFamily: FontType.regularFont,
    color: Colors.red,
    left: 5,
    width: '95%',
  },
  imageView: {
    width: 16,
    height: 16,
  },
  temImageView: {
    width: 15,
    height: 17.5,
  },
  itemMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.95,
    alignSelf: 'center',
    padding: 5,
  },
  itemChildView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: FontType.regularFont,
    fontSize: 16,
    left: 5,
  },
});
