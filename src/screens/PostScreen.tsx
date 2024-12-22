import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';

import { Post } from '@/interfaces/postInterface';
import { HeaderTimeline } from '../../linha do tempo/header_timeline';
import FetchPosts from '@/components/timeline/FetchPosts';
import CreatePostModal from '@/components/timeline/CreatePostModal';

const PostCard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

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
      />
    </View>
  );
};

export default PostCard;