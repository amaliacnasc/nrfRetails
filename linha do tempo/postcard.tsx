import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Pressable
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { HeaderTimeline } from './header_timeline';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HeaderPosts } from './header_posts';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';

// Tipagem para os posts
interface Post {
  idPost: number;
  imageUrl: string;
  description: string;
  participant: {
    idParticipant: number;
    name: string;
    email: string;
    companyName: string;
  };
  likes: {
    idLike: number;
    participant: {
      idParticipant: number;
      name: string;
      email: string;
      companyName: string;
    };
  }[];
}



const PostCard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDetails, setNewPostDetails] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/appevento/posts`);
      setPosts(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os posts.');
      console.error(error);
    }
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

  const createPost = async () => {
    if (!newPostTitle || !newPostDetails) {
      Alert.alert('Erro', 'Preencha todos os campos antes de postar.');
      return;
    }

    const newPost = {
      title: newPostTitle,
      details: newPostDetails,
      image: newPostImage,
    };

    try {
      const response = await axios.post(`http://localhost:8080/appevento/posts`, newPost);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setModalVisible(false);
      setNewPostTitle('');
      setNewPostDetails('');
      setNewPostImage(undefined);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o post.');
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderTimeline />

      <Pressable onPress={() => setModalVisible(true)}>
        <Text
          style={{
            position: 'relative',
            bottom: 50,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            alignSelf: 'center',
            backgroundColor: '#000',
            width: 150,
            padding: 3,
            borderRadius: 15,
            fontSize: 14,
            color: 'white',
          }}
        >
          +Adicionar Postagem
        </Text>
      </Pressable>

      <FlatList
        style={{
          padding: 10,
        }}
        data={posts}
        keyExtractor={(item) => item.idPost.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
              backgroundColor: 'white',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width: '100%',
                  height: 200,
                }}
              />
            )}
            <View style={{ padding: 16 }}>
              <Text
                style={{
                  color: '#334155',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                {item.description}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#64748b',
                }}
              >
                {`Autor: ${item.participant.name} (${item.participant.companyName})`}
              </Text>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 16 }}>
          <HeaderPosts />

          <Pressable onPress={() => setModalVisible(false)}>
            <AntDesign
              name="left"
              size={24}
              color="#054FC7"
              style={{ marginBottom: 16 }}
            />
          </Pressable>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Titulo</Text>
            <TextInput
              placeholder="Insira o titulo"
              value={newPostTitle}
              onChangeText={setNewPostTitle}
              style={{
                marginTop: 8,
                padding: 8,
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 4,
                backgroundColor: '#f9fafb',
              }}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Detalhes</Text>
            <TextInput
              placeholder="Insira os detalhes"
              value={newPostDetails}
              onChangeText={setNewPostDetails}
              style={{
                marginTop: 8,
                padding: 8,
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 4,
                backgroundColor: '#f9fafb',
              }}
            />
          </View>

          {newPostImage && (
            <Image
              source={{ uri: newPostImage }}
              style={{ width: '100%', height: 200, marginBottom: 16 }}
            />
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Pressable onPress={openImagePicker} style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="view-gallery-outline" size={32} color="#60a5fa" />
              <Text>Galeria</Text>
            </Pressable>

            <Pressable onPress={openCamera} style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="camera-outline" size={32} color="#60a5fa" />
              <Text>Câmera</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={createPost}
            style={{
              backgroundColor: '#000',
              padding: 12,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Postar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default PostCard;
