import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetailScreen() {
  const { name, role } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name?.[0]}</Text>
      </View>

      {/* Info */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>

      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>GDG Member</Text>
        <Text style={styles.cardText}>
          Learning App Development at GDG Workshop.
        </Text>
      </View>

      {/* Buttons */}
      <Pressable
        style={styles.button}
        onPress={() => Alert.alert('Hello!', `You connected with ${name}!`)}
      >
        <Text style={styles.buttonText}>Connect</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Go Back</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#6366f1',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  role: {
    fontSize: 15,
    color: '#6366f1',
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#6366f1',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  backText: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: '600',
  },
});
