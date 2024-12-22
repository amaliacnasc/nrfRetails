import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createPost } from '@/services/postService';
import { Post } from '@/interfaces/postInterface';

interface CreatePostModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  modalVisible,
  setModalVisible,
  setPosts,
}) => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUrl(result.assets[0].uri);
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
        setImageUrl(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permissão negada', 'É necessário acessar a câmera para tirar uma foto.');
    }
  };

  const handleCreatePost = async () => {
    if (!description || !imageUrl) {
      Alert.alert('Erro', 'Preencha todos os campos antes de postar.');
      return;
    }

    const newPost = {
      idParticipant: 1, // Substitua com o ID real do participante
      imageUrl,
      description,
    };

    try {
      const createdPost = await createPost(newPost);
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
      setModalVisible(false);
      setDescription('');
      setImageUrl(undefined);
    } catch {
      Alert.alert('Erro', 'Não foi possível criar o post.');
    }
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={{ flex: 1, padding: 16 }}>
        <Pressable onPress={() => setModalVisible(false)}>
          <AntDesign
            name="left"
            size={24}
            color="#054FC7"
            style={{ marginBottom: 16 }}
          />
        </Pressable>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Descrição</Text>
          <TextInput
            placeholder="Insira a descrição"
            value={description}
            onChangeText={setDescription}
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

        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
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
          onPress={handleCreatePost}
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
  );
};

export default CreatePostModal;