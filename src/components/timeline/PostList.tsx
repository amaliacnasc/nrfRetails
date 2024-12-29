import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchPosts } from '@/services/postService';
import { Post } from '@/interfaces/postInterface';
import PostCard from './PostCard';
import PostSkeleton from './PostSkeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FetchPostsProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostList: React.FC<FetchPostsProps> = ({ posts, setPosts }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);

  useEffect(() => {
    const fetchParticipantId = async () => {
      try {
        const storedParticipant = await AsyncStorage.getItem('participant');
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);
          setIdParticipant(participant.idParticipant);
        }
      } catch {}
    };

    fetchParticipantId();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) return <PostSkeleton />;

  if (posts.length === 0)
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Feather name="frown" size={48} color="#64748b" />
        <Text className="text-lg font-semibold text-gray-600">Ainda não há posts</Text>
      </View>
    );

  return (
    <FlatList
      className="p-2"
      data={posts}
      keyExtractor={(item) => item.idPost.toString()}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          likedByUser={
            !!idParticipant &&
            Array.isArray(item.likes) &&
            item.likes.some((like) => like.participant?.idParticipant === idParticipant)
          }
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default PostList;