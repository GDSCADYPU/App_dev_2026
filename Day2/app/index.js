import { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const MEMBERS = [
  { id: "1", name: 'A Krishna Srikar', role: "GDG Co-Lead", detail: "THE ONE ABOVE ALL"},
  { id: '2', name: 'Devaansh Kathuria', role: 'App Dev Lead', detail: "App Dev Lead at GDG" },
  { id: '3', name: 'Priyanshu Singh Panda', role: 'Web Dev Lead', detail: "Web Dev Lead at GDG" },
  { id: "4", name: 'Prem Sonar', role: "Creative Lead", detail: "Wait for it!"},
  { id: "5", name: 'Purvi Pandey', role: "Design Lead (Pehle wali)", detail: "Pehle wali Design Lead at GDG"},
  { id: "6", name: 'Karan Phadtare', role: "Design Lead (doosre wala)", detail: "Doosre wala Design Lead at GDG"},
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filtered = MEMBERS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search members..."
        placeholderTextColor="#94a3b8"
        value={search}
        onChangeText={setSearch}
      />

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/detail?id=${item.id}&name=${item.name}&role=${item.role}&detail=${item.detail}`)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <Text style={styles.empty}>Member not found.</Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    paddingTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  role: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  arrow: {
    fontSize: 22,
    color: '#cbd5e1',
    marginLeft: 'auto',
  },
  empty: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 40,
    fontSize: 15,
  },
});
