import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Post } from '@/interfaces/postInterface';
import PostCard from './PostCard';
import PostSkeleton from './PostSkeleton';

interface PostListProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  onRefresh: () => void;
  idParticipant: number | null;
  loading: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, onRefresh, idParticipant, loading }) => {
  if (loading) {
    return <PostSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Feather name="frown" size={48} color="#64748b" />
        <Text className="text-lg font-semibold text-gray-600">Ainda não há posts</Text>
      </View>
    );
  }

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
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
    />
  );
};

export default PostList;