import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/interfaces/postInterface';
import { AntDesign } from '@expo/vector-icons';
import { createLike, deleteLike } from '@/services/likeService';

interface PostCardProps {
  post: Post;
  likedByUser: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, likedByUser }) => {
  const [likes, setLikes] = useState<number>(Array.isArray(post.likes) ? post.likes.length : 0);
  const [liked, setLiked] = useState<boolean>(!!likedByUser);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const MAX_DESCRIPTION_LENGTH = 100;

  useEffect(() => {
    const fetchParticipantId = async () => {
      try {
        const storedParticipant = await AsyncStorage.getItem('participant');
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);
          setIdParticipant(participant.idParticipant);
        }
      } catch (error) {
        console.error('Erro ao buscar participante:', error);
      }
    };

    fetchParticipantId();
  }, []);

  const handleLike = async () => {
    if (!idParticipant) {
      console.error("ID do participante não encontrado.");
      return;
    }

    try {
      await createLike({ idPost: post.idPost, idParticipant });
      setLikes((prev) => prev + 1);
      setLiked(true);
    } catch (error) {
      console.error("Não foi possível adicionar o like.");
    }
  };

  const handleUnlike = async () => {
    try {
      const likeToRemove = post.likes?.find(
        (like) => like.participant?.idParticipant === idParticipant
      );

      if (likeToRemove) {
        await deleteLike(likeToRemove.idLike);
        setLikes((prev) => prev - 1);
        setLiked(false);
      }
    } catch (error) {
      console.error("Não foi possível remover o like.");
    }
  };

  return (
    <View className="mb-5 bg-white rounded-lg shadow-md overflow-hidden">
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} className="w-full h-52" />
      )}
      <View className="p-4 relative">
        <Text className="text-gray-800 font-bold text-lg mb-2">
          {expanded || post.description.length <= MAX_DESCRIPTION_LENGTH
            ? post.description
            : `${post.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`}
        </Text>
        {post.description.length > MAX_DESCRIPTION_LENGTH && (
          <Pressable onPress={() => setExpanded(!expanded)}>
            <Text className="text-blue-500 font-medium">
              {expanded ? 'Ver menos' : 'Ver mais'}
            </Text>
          </Pressable>
        )}
        <Text className="text-gray-500 text-sm mt-2">
          {`Autor: ${post.participant.name} (${post.participant.companyName})`}
        </Text>
        <Pressable
          onPress={liked ? handleUnlike : handleLike}
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