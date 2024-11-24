import { AuthContextProps, useAuth } from '@frontend/providers';
import React from 'react';
import {  Text, View } from 'react-native';
import { Link } from 'react-router-native';
import style from "./test2.module.css"

export default function Test2() {
  const auth: AuthContextProps = useAuth();
  console.log("test2")
  return (
    <View style={style.container}>
      <Link to={'/login'} ><Text style={style.text}>zaloguj</Text></Link>
      <Text style={style.text}>{auth.isAuthenticated ? 'Zalogowany' : 'Niezalogowany'}</Text>
    </View>
  );
}
