import { View, Text, Image, ScrollView, Alert, Pressable, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.banner} />

      <Image
        source={{ uri: 'data:image/png;base64,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' }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Devaansh Kathuria</Text>
      <Text style={styles.role}>CS Student • GDG Member</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>8</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>240</Text>
          <Text style={styles.statLabel}>Commits</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>∞</Text>
          <Text style={styles.statLabel}>Coffee</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Me</Text>
        <Text style={styles.bio}>
          Hey! I'm learning React Native at the GDG workshop.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Skills</Text>
        <View style={styles.skillsRow}>
          <Text style={styles.skill}>JavaScript</Text>
          <Text style={styles.skill}>React</Text>
          <Text style={styles.skill}>React Native</Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
        onPress={() => Alert.alert('Hello!', 'Welcome to my profile!')}
      >
        <Text style={styles.buttonText}>Say Hello</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  banner: {
    height: 130,
    backgroundColor: '#6366f1',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    alignSelf: 'center',
    marginTop: -50,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    color: '#1e293b',
  },
  role: {
    fontSize: 14,
    color: '#6366f1',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
    fontWeight: '500',
  },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9',
  },
  statNum: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
  },

  skillsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#eef2ff',
    color: '#6366f1',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#6366f1',
    marginHorizontal: 24,
    marginBottom: 40,
    marginTop: 4,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});