import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function MotivationalQuotesScreen() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const apiUrl = 'https://type.fit/api/quotes';
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
      const data = await response.json();
      const shuffled = data.sort(() => 0.5 - Math.random());
      setQuotes(shuffled.slice(0, 10));
    } catch (err) {
      console.log('Error fetching quotes:', err);
      setQuotes([{ text: 'Unable to load quotes.', author: '' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Motivational Quotes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {quotes.map((quote, index) => (
            <View key={index} style={styles.quoteCard}>
              <Text style={styles.quoteText}>"{quote.text}"</Text>
              <Text style={styles.authorText}>- {quote.author || 'Unknown'}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={fetchQuotes}>
            <Text style={styles.buttonText}> Refresh Quotes</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F3F6FC' },
  header: { fontSize: 28, fontWeight: '800', color: '#1E3A8A', textAlign: 'center', marginBottom: 20 },
  scroll: { paddingBottom: 40 },
  quoteCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  quoteText: { fontSize: 16, color: '#334155', marginBottom: 6, fontStyle: 'italic' },
  authorText: { fontSize: 14, color: '#475569', textAlign: 'right' },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 }
});
