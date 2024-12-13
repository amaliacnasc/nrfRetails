import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// Tipagem para os posts
interface Post {
  id: string;
  title: string;
  details: string;
  image?: string;
  liked: boolean;
}

const PostCard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Primeiro Post',
      details: 'Detalhes do primeiro post.',
      image: 'https://via.placeholder.com/150',
      liked: false,
    },
    {
      id: '2',
      title: 'Segundo Post',
      details: 'Detalhes do segundo post.',
      liked: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDetails, setNewPostDetails] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | undefined>(undefined);

  const toggleLike = (id: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setNewPostImage(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permissão negada', 'É necessário acessar a galeria para anexar uma imagem.');
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setNewPostImage(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permissão negada', 'É necessário acessar a câmera para tirar uma foto.');
    }
  };

  const createPost = () => {
    if (!newPostTitle || !newPostDetails) {
      Alert.alert('Erro', 'Preencha todos os campos antes de postar.');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      details: newPostDetails,
      image: newPostImage,
      liked: false,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setModalVisible(false);
    setNewPostTitle('');
    setNewPostDetails('');
    setNewPostImage(undefined);
  };

  return (
    <View style={styles.container}>
      <Button title="Criar Post" onPress={() => setModalVisible(true)} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.details}>{item.details}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <TouchableOpacity onPress={() => toggleLike(item.id)}>
              <Ionicons
                name={item.liked ? 'heart' : 'heart-outline'}
                size={24}
                color={item.liked ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Criar Novo Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={newPostTitle}
            onChangeText={setNewPostTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Detalhes"
            value={newPostDetails}
            onChangeText={setNewPostDetails}
          />
          {newPostImage && <Image source={{ uri: newPostImage }} style={styles.image} />}
          <Button title="Abrir Galeria" onPress={openImagePicker} />
          <Button title="Abrir Câmera" onPress={openCamera} />
          <Button title="Postar" onPress={createPost} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginVertical: 10,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default PostCard;
