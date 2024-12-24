import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/interfaces/postInterface';
import { AntDesign } from '@expo/vector-icons';
import { createLike } from '@/services/likeService';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [likes, setLikes] = useState<number>(
    Array.isArray(post.likes) ? post.likes.length : post.likes || 0
  );
  const [liked, setLiked] = useState<boolean>(false);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);

  useEffect(() => {
    const fetchParticipantId = async () => {
      try {
        const storedParticipant = await AsyncStorage.getItem('participant');
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);
          setIdParticipant(participant.idParticipant);
        }
      } catch (error) {
       // Alert.alert("Erro", "Não foi possível recuperar o ID do participante.");
      }
    };

    fetchParticipantId();
  }, []);

  useEffect(() => {
    if (
      idParticipant &&
      Array.isArray(post.likes) &&
      post.likes.some((like) => like.participant?.idParticipant === idParticipant)
    ) {
      setLiked(true);
    }
  }, [post.likes, idParticipant]);

  const handleLike = async () => {
    if (!idParticipant) {
    //  Alert.alert("Erro", "ID do participante não encontrado.");
      return;
    }

    try {
      if (!liked) {
        await createLike({ idPost: post.idPost, idParticipant });
        setLikes((prev) => prev + 1);
      } else {
        setLikes((prev) => prev - 1);
      }
      setLiked(!liked);
    } catch (error) {
      //Alert.alert("Erro", "Não foi possível atualizar o like.");
    }
  };

  return (
    <View className="mb-5 bg-white rounded-lg shadow-md overflow-hidden">
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} className="w-full h-52" />
      )}
      <View className="p-4 relative">
        <Text className="text-gray-800 font-bold text-lg mb-2">{post.description}</Text>
        <Text className="text-gray-500 text-sm">
          {`Autor: ${post.participant.name} (${post.participant.companyName})`}
        </Text>
        <Pressable
          onPress={handleLike}
          className="absolute bottom-2 right-2 flex-row items-center"
        >
          <AntDesign
            name={liked ? "heart" : "hearto"}
            size={20}
            color={liked ? "#FF0000" : "#A3A3A3"}
          />
          <Text className="ml-1 text-sm text-gray-500">{likes}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PostCard;