import React, { useState, useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/interfaces/postInterface';
import { HeaderTimeline } from '@/components/timeline/HeaderTimeline';
import { fetchPosts } from '@/services/postService';
import FetchPosts from '@/components/timeline/PostList';
import CreatePostModal from '@/components/timeline/CreatePostModal';

const PostScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [canPost, setCanPost] = useState<boolean | null>(null);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
  };

  const checkPostPermission = async () => {
    try {
      const storedData = await AsyncStorage.getItem('participant');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setCanPost(parsedData.postPermission === 1);
      } else {
        setCanPost(false);
      }
    } catch (error) {
      //console.error('Erro ao verificar permissão:', error);
      setCanPost(false);
    }
  };

  useEffect(() => {
    loadPosts();
    checkPostPermission();
  }, []);

  if (canPost === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <HeaderTimeline />

      {canPost && (
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
      )}

      <FetchPosts posts={posts} setPosts={setPosts} />
      <CreatePostModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setPosts={setPosts}
        onPostCreated={loadPosts}
      />
    </View>
  );
};

export default PostScreen;