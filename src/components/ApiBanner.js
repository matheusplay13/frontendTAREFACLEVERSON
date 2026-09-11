import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

export default function ApiBanner({ online, checando, onRetry }) {
  const slideAnim = useRef(new Animated.Value(-60)).current;

  useEffect(() => {
    if (!checando) {
      Animated.spring(slideAnim, {
        toValue: online ? -60 : 0,
        useNativeDriver: true,
        speed: 14,
        bounciness: 4,
      }).start();
    }
  }, [online, checando]);

  return (
    <Animated.View
      style={[styles.banner, { transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.icone}>⚠️</Text>
      <Text style={styles.texto}>Servidor offline — sem conexão com a API</Text>
      <TouchableOpacity onPress={onRetry} activeOpacity={0.7} style={styles.botao}>
        <Text style={styles.botaoTexto}>Tentar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  icone: { fontSize: 16 },
  texto: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  botao: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
