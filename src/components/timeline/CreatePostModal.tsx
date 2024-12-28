import React, { useState } from 'react';
import { View, Text, TextInput, Image, Modal, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    try {
      const storedParticipant = await AsyncStorage.getItem('participant');
      if (!storedParticipant) {
        Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
        return;
      }

      const participant = JSON.parse(storedParticipant);
      const idParticipant = participant.idParticipant;

      const formData = new FormData();
      formData.append('image', {
        uri: imageUrl,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);
      formData.append('idParticipant', idParticipant);
      formData.append('description', description);

      const createdPost = await createPost(formData);
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
      <View className="flex-1 p-4">
        <Pressable onPress={() => setModalVisible(false)}>
          <AntDesign name="left" size={24} color="#054FC7" className="mb-4" />
        </Pressable>

        <View className="mb-4">
          <Text className="font-bold text-lg">Descrição</Text>
          <TextInput
            placeholder="Insira a descrição"
            value={description}
            onChangeText={setDescription}
            className="mt-2 p-2 border border-gray-300 rounded bg-gray-100"
          />
        </View>

        {imageUrl && (
          <Image source={{ uri: imageUrl }} className="w-full h-52 mb-4 rounded" />
        )}

        <View className="flex-row justify-between mb-4">
          <Pressable onPress={openImagePicker} className="items-center">
            <MaterialCommunityIcons name="view-gallery-outline" size={32} color="#60a5fa" />
            <Text>Galeria</Text>
          </Pressable>

          <Pressable onPress={openCamera} className="items-center">
            <MaterialCommunityIcons name="camera-outline" size={32} color="#60a5fa" />
            <Text>Câmera</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleCreatePost}
          className="bg-black px-4 py-3 rounded-lg items-center"
        >
          <Text className="text-white font-bold">Postar</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default CreatePostModal;