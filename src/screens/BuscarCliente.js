import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import API_BASE_URL from '../config/api';
import ClienteCard from '../components/ClienteCard';

export default function BuscarCliente() {
  const [busca, setBusca] = useState('');
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscaFeita, setBuscaFeita] = useState(false);

  const handleBuscar = async () => {
    if (!busca.trim()) {
      Alert.alert('Atenção', 'Digite um nome ou ID para buscar.');
      return;
    }

    setLoading(true);
    setBuscaFeita(false);
    try {
      const response = await fetch(
        `${API_BASE_URL}/clientes?busca=${encodeURIComponent(busca.trim())}`
      );
      const data = await response.json();

      if (response.ok) {
        setClientes(Array.isArray(data) ? data : []);
        setBuscaFeita(true);
      } else {
        Alert.alert('Erro', data.message || 'Erro ao buscar clientes.');
      }
    } catch (error) {
      Alert.alert(
        'Erro de conexão',
        'Não foi possível conectar ao servidor.\nVerifique o IP do backend em src/config/api.js'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderEmpty = () => {
    if (!buscaFeita) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyText}>Nenhum cliente encontrado</Text>
        <Text style={styles.emptySubtext}>Tente buscar por outro nome ou ID</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Buscar Cliente</Text>
          <Text style={styles.subtitulo}>Pesquise por nome ou ID</Text>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Nome ou ID do cliente..."
            placeholderTextColor="#94a3b8"
            value={busca}
            onChangeText={setBusca}
            onSubmitEditing={handleBuscar}
            returnKeyType="search"
            autoCapitalize="words"
          />
          <TouchableOpacity
            style={[styles.botaoBuscar, loading && styles.botaoDesabilitado]}
            onPress={handleBuscar}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.botaoBuscarTexto}>Buscar</Text>
            )}
          </TouchableOpacity>
        </View>

        <FlatList
          data={clientes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ClienteCard cliente={item} />}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={clientes.length === 0 ? styles.listEmpty : styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#0f172a' },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
    marginTop: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f1f5f9',
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#334155',
  },
  botaoBuscar: {
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    minWidth: 80,
  },
  botaoDesabilitado: { opacity: 0.6 },
  botaoBuscarTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  listEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    gap: 8,
  },
  emptyIcon: { fontSize: 48, marginBottom: 8 },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#94a3b8',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#475569',
  },
});
