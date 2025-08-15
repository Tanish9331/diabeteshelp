import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subtitle}>Manage your diabetes journey</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <MaterialCommunityIcons name="monitor-dashboard" size={32} color="#2D6A9D" />
                <Text style={styles.statValue}>120</Text>
                <Text style={styles.statLabel}>Glucose (mg/dL)</Text>
              </Card.Content>
            </Card>
            
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <MaterialCommunityIcons name="food-apple" size={32} color="#5CB85C" />
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Meals Logged</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => console.log('Log Meal')}
              style={[styles.actionButton, { backgroundColor: '#5CB85C' }]}
              contentStyle={styles.actionButtonContent}
              icon={() => <MaterialCommunityIcons name="food-apple" size={24} color="#ffffff" />}
            >
              Log Meal
            </Button>
            
            <Button
              mode="contained"
              onPress={() => console.log('Record Glucose')}
              style={[styles.actionButton, { backgroundColor: '#2D6A9D' }]}
              contentStyle={styles.actionButtonContent}
              icon={() => <MaterialCommunityIcons name="monitor-dashboard" size={24} color="#ffffff" />}
            >
              Record Glucose
            </Button>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card style={styles.activityCard}>
            <Card.Content>
              <View style={styles.activityItem}>
                <MaterialCommunityIcons name="food-apple" size={20} color="#5CB85C" />
                <Text style={styles.activityText}>Breakfast logged - 8:30 AM</Text>
              </View>
              <View style={styles.activityItem}>
                <MaterialCommunityIcons name="monitor-dashboard" size={20} color="#2D6A9D" />
                <Text style={styles.activityText}>Glucose reading - 125 mg/dL</Text>
              </View>
              <View style={styles.activityItem}>
                <MaterialCommunityIcons name="clipboard-text" size={20} color="#F39C12" />
                <Text style={styles.activityText}>Diet plan updated</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D6A9D', // Primary
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D', // Neutral
    lineHeight: 22,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D6A9D', // Primary
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
    padding: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D6A9D', // Primary
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D', // Neutral
    textAlign: 'center',
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionButtons: {
    gap: 16,
  },
  actionButton: {
    borderRadius: 12,
  },
  actionButtonContent: {
    height: 56,
  },
  activitySection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#2D6A9D', // Primary
    flex: 1,
  },
});
