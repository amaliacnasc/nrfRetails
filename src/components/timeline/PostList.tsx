import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchPosts } from '@/services/postService';
import { Post } from '@/interfaces/postInterface';
import PostCard from './PostCard';

interface FetchPostsProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostList: React.FC<FetchPostsProps> = ({ posts, setPosts }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0056D6" />
        <Text className="mt-4 text-lg font-semibold text-gray-600">Carregando posts...</Text>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Feather name="frown" size={48} color="#64748b" className="mb-4" />
        <Text className="text-lg font-semibold text-gray-600">Ainda não há posts</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="p-2"
      data={posts}
      keyExtractor={(item) => item.idPost.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  );
};

export default PostList;