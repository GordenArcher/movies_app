import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'


interface props {
    onPress?: () => void,
    placeholder?: string,
    value?: string,
    onChangeText?: (text : string) => void
}

const Searchbar = ({ onPress, placeholder, value, onChangeText} : props) => {
    return (
        <View className='flex-row items-center bg-[#03001493] rounded-full px-5 py-4'>
          <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={"#ab8bff"} />
          <TextInput 
          onPress={onPress} 
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText} 
          placeholderTextColor={"#a8b5db"} 
          className='flex-1 size-9 ml-2 text-white'
          />
        </View>
      )
}

export default Searchbar