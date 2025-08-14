import { Brand } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';

export default function HomeScreen() {
  const router = useRouter();
  const primary = Brand.primary;
  const secondary = Brand.secondary;
  const subtleColor = Brand.neutral;
  const statStyle = useMemo(() => [{ color: primary }], []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.header}>Dashboard</Text>

      <View style={styles.cardGrid}>
        <Card style={styles.card}>
          <Card.Title title="Current Glucose" titleVariant="titleMedium" />
          <Card.Content>
            <Text variant="displaySmall" style={statStyle}>112 mg/dL</Text>
            <Text style={[styles.subtle, { color: subtleColor }]}>Last updated: just now</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Last Meal" titleVariant="titleMedium" />
          <Card.Content>
            <Text variant="titleLarge">Oats & Eggs</Text>
            <Text style={[styles.subtle, { color: subtleColor }]}>Carbs: 45g • Protein: 20g</Text>
          </Card.Content>
        </Card>
      </View>

      <Divider style={{ marginVertical: 8 }} />
      <Text variant="titleMedium" style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        <Button mode="contained" style={[styles.actionBtn, { backgroundColor: primary }]} onPress={() => router.push('/(tabs)')}>
          Log Meal
        </Button>
        <Button mode="contained" style={[styles.actionBtn, { backgroundColor: secondary }]} onPress={() => router.push('/(tabs)')}>
          Record Glucose
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  header: {
    marginBottom: 4,
  },
  cardGrid: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'stretch',
  },
  card: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
  },
  subtle: {
    opacity: 0.7,
    marginTop: 6,
  },
});
