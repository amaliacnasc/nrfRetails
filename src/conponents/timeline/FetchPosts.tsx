import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import { fetchPosts } from '@/services/postService';
import { Post } from '@/interfaces/postInterface';

interface FetchPostsProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const FetchPosts: React.FC<FetchPostsProps> = ({ posts, setPosts }) => {
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os posts.');
    }
  };

  return (
    <FlatList
      style={{ padding: 10 }}
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
  );
};

export default FetchPosts;