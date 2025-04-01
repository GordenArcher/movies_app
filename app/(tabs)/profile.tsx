import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { icons } from '@/constants/icons';
import Toast from 'react-native-toast-message';
import { MovieContext } from '@/utils/MovieContext';
import Logo from '@/components/Logo';

export default function Profile() {
  const { username, updateUsername, savedMovies } = useContext(MovieContext);
  const [editName, setEditName] = useState(username);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveName = () => {
    updateUsername(editName);
    setIsEditing(false);
    Toast.show({
      type: 'success',
      text1: 'Username Updated',
      text2: `You're now known as ${editName || 'Guest'}`,
    });
  };

  return (
    <View className="flex-1 bg-[#030014] px-5">
      <View className="flex justify-center items-center mt-5">
        <Logo />
        <Text className="text-white font-bold text-lg">Profile</Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <Image
          source={icons.person}
          className="size-20 mb-5"
          tintColor="#fff"
        />
        {isEditing ? (
          <View className="w-full items-center">
            <TextInput
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter your name"
              placeholderTextColor="#888"
              className="text-white text-base border border-gray-500 rounded p-2 w-3/4 text-center"
            />
            <TouchableOpacity
              onPress={handleSaveName}
              className="bg-violet-500 mt-3 px-5 py-2 rounded"
            >
              <Text className="text-white font-bold">Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text className="text-white text-xl font-bold mb-2">{username}</Text>
            <Text className="text-gray-500 text-base">
              Saved Movies: {savedMovies.length}
            </Text>
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className="bg-violet-500 mt-5 px-5 py-2 rounded"
            >
              <Text className="text-white font-bold">Edit Name</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Toast />
    </View>
  );
}