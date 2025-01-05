import React, { useState, useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/interfaces/postInterface';
import { HeaderTimeline } from '@/components/timeline/HeaderTimeline';
import { fetchPosts } from '@/services/postService';
import PostList from '@/components/timeline/PostList';
import CreatePostModal from '@/components/timeline/CreatePostModal';
import PostSkeleton from '@/components/timeline/PostSkeleton'; 

const PostScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [canPost, setCanPost] = useState<boolean | null>(null);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipantId = async () => {
    try {
      const storedParticipant = await AsyncStorage.getItem('participant');
      if (storedParticipant) {
        const participant = JSON.parse(storedParticipant);
        setIdParticipant(participant.idParticipant);
        setCanPost(participant.postPermission === 1);
      } else {
        setCanPost(false);
      }
    } catch (error) {
      console.error('Erro ao buscar participante:', error);
      setCanPost(false);
    }
  };

  useEffect(() => {
    loadPosts();
    fetchParticipantId();
  }, []);

  if (canPost === null || loading) {
    return <PostSkeleton />;
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

      <PostList
        posts={posts}
        setPosts={setPosts}
        onRefresh={loadPosts}
        idParticipant={idParticipant}
        loading={loading} 
      />

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