import React, { useState, useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Post } from '@/interfaces/postInterface';
import { HeaderTimeline } from '@/components/timeline/HeaderTimeline';
import { fetchPosts } from '@/services/postService';
import FetchPosts from '@/components/timeline/PostList';
import CreatePostModal from '@/components/timeline/CreatePostModal';

const PostScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      //console.error('Erro ao carregar posts:', error);
    }
  };

  useEffect(() => {
    loadPosts(); 
  }, []);

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