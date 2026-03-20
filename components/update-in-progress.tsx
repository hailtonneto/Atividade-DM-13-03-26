import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {
  darkMode?: boolean;
};

type FeedItem = {
  id: string;
  source: string;
  headline: string;
  description: string;
  timestamp: string;
};

const FEED: FeedItem[] = [
  {
    id: 'a1',
    source: 'Deploy Center',
    headline: 'Patch 1.0.2 liberado',
    description: 'Ajuste no fluxo de autenticação em redes instáveis.',
    timestamp: 'Agora',
  },
  {
    id: 'a2',
    source: 'Infra Mobile',
    headline: 'Melhoria de performance',
    description: 'Cache otimizado para reduzir tempo de abertura.',
    timestamp: '3 min',
  },
  {
    id: 'a3',
    source: 'QA Monitor',
    headline: 'Hotfix em testes',
    description: 'Equipe validando correção de push notifications no iOS.',
    timestamp: '7 min',
  },
  {
    id: 'a4',
    source: 'Build Tracker',
    headline: 'Pacote OTA pronto',
    description: 'Atualização incremental disponível sem necessidade de loja.',
    timestamp: '15 min',
  },
];

const lightTheme = {
  accent: '#4A75F0',
  bg: '#F0F4FF',
  border: 'rgba(120,140,210,0.3)',
  card: 'rgba(255,255,255,0.7)',
  text: '#0D1935',
  textMuted: '#506090',
  textSoft: '#6A7AA5',
};

const darkTheme = {
  accent: '#7A92FF',
  bg: '#121C30',
  border: 'rgba(130,150,230,0.35)',
  card: 'rgba(25,35,55,0.7)',
  text: '#F5F8FF',
  textMuted: '#B0C2ED',
  textSoft: '#9AAAD8',
};

export function UpdateInProgress({ darkMode = false }: Props) {
  const [otaStatus] = useState('OTA disponível para correções rápidas.');
  const [loadingFeed, setLoadingFeed] = useState(true);

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingFeed(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const refreshFeed = () => {
    if (loadingFeed) return;

    setLoadingFeed(true);
    setTimeout(() => {
      setLoadingFeed(false);
    }, 1800);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>Processo de Atualização</Text>

      <View style={[styles.otaPanel, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.otaTitle, { color: theme.textMuted }]}>Status OTA</Text>
        <Text style={[styles.otaMessage, { color: theme.text }]}>{otaStatus}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.feedContent}
        onScrollBeginDrag={refreshFeed}
        showsVerticalScrollIndicator={false}
        style={styles.feedScroll}>
        {FEED.map((item) => (
          <View
            key={item.id}
            style={[
              styles.feedCard,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}>
            <View style={styles.feedTopRow}>
              <Text style={[styles.feedSource, { color: theme.textMuted }]}>{item.source}</Text>
              <Text style={[styles.feedTime, { color: theme.textMuted }]}>{item.timestamp}</Text>
            </View>
            <Text style={[styles.feedHeadline, { color: theme.text }]}>{item.headline}</Text>
            <Text style={[styles.feedDescription, { color: theme.textSoft }]}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.loadingRow}>
        <ActivityIndicator color={theme.accent} size="small" />
        <Text style={[styles.loadingLabel, { color: theme.textMuted }]}>
          {loadingFeed ? 'Carregando novidades...' : 'Feed atualizado.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    gap: 12,
    padding: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  otaPanel: {
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    padding: 10,
  },
  otaTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  otaMessage: {
    fontSize: 13,
    lineHeight: 18,
  },
  feedScroll: {
    borderRadius: 16,
    flex: 1,
  },
  feedContent: {
    gap: 8,
    paddingBottom: 6,
    paddingTop: 2,
  },
  feedCard: {
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 88,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
  },
  feedTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  feedSource: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  feedTime: {
    fontSize: 11,
    fontWeight: '600',
  },
  feedHeadline: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  feedDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  loadingRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    minHeight: 26,
  },
  loadingLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
