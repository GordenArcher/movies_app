import { View, Text, ImageBackground, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const _layout = () => {

  interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
  }

  const TabIcon: React.FC<TabIconProps> = ({ focused, icon, title }) => {
    return focused ? (
      <View className="flex-row justify-center items-center w-full min-w-[112px] min-h-16 mt-4 rounded-full overflow-hidden bg-[#6B73FF]">
        <View className="absolute inset-0 bg-[#000DFF] opacity-50" />
          <Image source={icon} tintColor="#FFFFFF" className="size-5 z-10" />
        <Text className="text-white font-semibold ml-2 text-base z-10">{title}</Text>
      </View>
    ) : (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "rgba(30, 30, 45, 0.8)",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 60,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      {[
        { name: "index", title: "Home", icon: icons.home },
        { name: "search", title: "Search", icon: icons.search },
        { name: "saved", title: "Saved", icon: icons.save },
        { name: "profile", title: "Profile", icon: icons.person },
      ].map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icon} title={title} />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default _layout;
