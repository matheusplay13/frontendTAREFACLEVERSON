import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ClienteCard({ cliente }) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {cliente.nome ? cliente.nome.charAt(0).toUpperCase() : '?'}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>{cliente.nome || 'Sem nome'}</Text>
        {cliente.email ? (
          <Text style={styles.detalhe}>✉️ {cliente.email}</Text>
        ) : null}
        {cliente.telefone ? (
          <Text style={styles.detalhe}>📞 {cliente.telefone}</Text>
        ) : null}
        {cliente.id ? (
          <Text style={styles.id}>ID: #{cliente.id}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nome: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  detalhe: {
    fontSize: 13,
    color: '#94a3b8',
  },
  id: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
    fontWeight: '600',
  },
});
