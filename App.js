import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import CadastrarCliente from './src/screens/CadastrarCliente';
import BuscarCliente from './src/screens/BuscarCliente';
import ApiBanner from './src/components/ApiBanner';
import { useApiStatus } from './src/hooks/useApiStatus';

const Tab = createBottomTabNavigator();

export default function App() {
  const { online, checando, verificar } = useApiStatus();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#1e293b',
              borderTopColor: '#334155',
              borderTopWidth: 1,
              height: 60,
              paddingBottom: 8,
              paddingTop: 6,
            },
            tabBarActiveTintColor: '#6366f1',
            tabBarInactiveTintColor: '#475569',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
            headerStyle: {
              backgroundColor: '#1e293b',
              shadowColor: 'transparent',
              elevation: 0,
              borderBottomColor: '#334155',
              borderBottomWidth: 1,
            },
            headerTintColor: '#f1f5f9',
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
          }}
        >
          <Tab.Screen
            name="Cadastrar"
            component={CadastrarCliente}
            options={{
              title: 'Cadastrar Cliente',
              tabBarLabel: 'Cadastrar',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size - 4, color }}>➕</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Buscar"
            component={BuscarCliente}
            options={{
              title: 'Buscar Cliente',
              tabBarLabel: 'Buscar',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size - 4, color }}>🔍</Text>
              ),
            }}
          />
        </Tab.Navigator>

        {/* Banner global de API offline — aparece em todas as telas */}
        <ApiBanner online={online} checando={checando} onRetry={verificar} />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
