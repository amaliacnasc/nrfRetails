import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Pressable
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { HeaderTimeline } from './header_timeline';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HeaderPosts } from './header_posts';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



// Tipagem para os posts
interface Post {
  id: string;
  title: string;
  details: string;
  image?: string;
  liked: boolean;
}

const PostCard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Primeiro Post',
      details: 'Detalhes do primeiro post.',
      image: 'https://s3-alpha-sig.figma.com/img/7653/5570/cebfc44fd8794b95275f69f7bcf9715a?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qnv0bs5VpbD~Zu0~2t1zHmqoSLFROO5xCNllcZk5R1Czbdx6a7iSRa24RC-H5j8B-Pe5YWekiGJsWF2ugnWk6z8TuvZrBf3dXVPOx9G6Jf3gDdvCPnZxFO3ivu~Fqq4tPJw-qqjplgD4fVc311RYkDHeKwy0DS0f-jZVYCEd2lMU13IDEsipaCI654vS8pnEWBnmDSXdNPVZMSowgpPs6uelnkWvVYLgDPj0VC0NRf3fkR6YexEIfzAtNqcsf7sXmnHKKh5sIZLEEd22ueScbqFuU-Hj8x7LbYaYurMLM7V-OFO5hR8ekdKAxK65iFrP-BSp84MiTF1iFojHAvEqjw__',
      liked: false,
    },
    {
      id: '2',
      title: 'Segundo Post',
      details: 'Detalhes do segundo post.',
      liked: false,
    },
  ]);
  

  const [modalVisible, setModalVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDetails, setNewPostDetails] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | undefined>(undefined);

  const toggleLike = (id: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setNewPostImage(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permissão negada', 'É necessário acessar a galeria para anexar uma imagem.');
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setNewPostImage(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permissão negada', 'É necessário acessar a câmera para tirar uma foto.');
    }
  };

  const createPost = () => {
    if (!newPostTitle || !newPostDetails) {
      Alert.alert('Erro', 'Preencha todos os campos antes de postar.');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      details: newPostDetails,
      image: newPostImage,
      liked: false,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setModalVisible(false);
    setNewPostTitle('');
    setNewPostDetails('');
    setNewPostImage(undefined);
  };



  return (
    <ScrollView>
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
                    color: 'white'
                   }}
                   >
                    +Adicionar Postagem
                   </Text>
                </Pressable>

      <FlatList
        style={{
          padding: 10,
          display: 'flex'
        }}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View 
          className='bg-white rounded-md'

          style={{
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
            
          }}
          
          >
            {item.image
             &&
              <Image source={{ uri: item.image }}

               style={{
                width: 'auto',
                height: 480,
               }}
               />}
            <View
            className='flex flex-col items-start'

            style={{
              gap: 0,
              padding: 8,
              flexDirection: 'column'
            }}
            
            >
            <Text 
            className='text-gray-700'
            style={{
              color: "#334155",
              fontWeight: 'bold',
              fontSize: 16,
              lineHeight: 24
            }}

            >

              {item.title}
              
              </Text>

            <View
            className='flex flex-row self-stretch'
            style={{
              gap: 10,
              padding: 8,
            }}

            >
              <Text 
              style={{
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 24
              }}
              >
                {item.details}
                
                </Text>

            </View>
              <View
              className=' w-24 h-16'
              style={{
                padding: 8,
                gap: 8,
                display: 'flex',
                flexShrink: 0,
                flexDirection: 'row'
                
              }}
              >
                <TouchableOpacity 
                onPress={() => toggleLike(item.id)}
                className='flex w-3 h-3'
                >

                  <Ionicons
                    name={item.liked ? 'heart' : 'heart-outline'}
                    size={24}
                    color={item.liked ? 'red' : 'gray'}
                  />
                </TouchableOpacity>
                <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: 24
                }}
                >
                  Curtir
                </Text>
              </View>
            </View>
            </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View>
          
        <HeaderPosts />

        <Pressable onPress={() => setModalVisible(false)} >
        <AntDesign 
          name="left" 
          size={24} 
          color="#054FC7" 
          style={{
            position: 'relative',
            left: 80,
            bottom: 100
          }}
          />
          </Pressable>
        
      <View
      
      style={{
      display: 'flex',
      padding: 10
      }}
      >
        <Text
        style = {{
          fontWeight: 'bold',
          fontSize: 15,
          shadowColor: '#000',
            
        }}
        >Titulo</Text>
          <TextInput
            placeholder="Insira o titulo"
            value={newPostTitle}
            onChangeText={setNewPostTitle}
            style={{
              marginTop: 6,
              padding: 5,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 2,
              borderColor: '#000',
              color: '#DBEAFE'
            }}
          />
        </View>

            <View 
              style={{
                display: 'flex',
                padding: 10
            }}>
              <Text 
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                shadowColor: '#000',
              }}
              >
                Detalhes
              </Text>

          <TextInput
            placeholder="Insira os detalhes"
            value={newPostDetails}
            onChangeText={setNewPostDetails}
            style={{
              marginTop: 6,
              padding: 5,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 2,
              color: '#DBEAFE'
            }}
          />


          </View>
          {newPostImage && <Image source={{ uri: newPostImage }} />}
            
            <View 
            style={{
              marginTop: 29,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >Inserir Imagem:</Text>

            </View>

            <View 
              style={{
                padding: 8,
                flex: 1,
                flexShrink: 0,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >

              <Pressable onPress={openImagePicker} >
                <MaterialCommunityIcons 
                name='view-gallery-outline'
                size={30}
                style={{
                  color: '#60a5fa',
                  position:'relative',
                  left: 7
                }}
                />
                <Text
                >
                  Galeria
                </Text>

              </Pressable>

              <Pressable onPress={openCamera} > 
                <Feather 
                name='camera'
                size={30}
                style={{
                  color: '#60a5fa',
                  position:'relative',
                  left: 11
                }}
                />
                <Text
                style={{
                }}
                >Câmera</Text>
              </Pressable>
          </View>

          <Pressable onPress={createPost} >
            <Text
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              alignSelf: 'center',
              backgroundColor: '#000',
              width: 150,
              padding: 3,
              borderRadius: 15,
              fontSize: 14,
              color: 'white'
            }}
            >Postar</Text>

          </Pressable>

          

        </View>
      </Modal>
    </ScrollView>
  );
};


export default PostCard;
