import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { auth, db } from '../firebase';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'expenses'),
            where('uid', '==', user.uid),
            orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date.toDate(),
            }));
            setExpenses(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const groupedData = expenses.reduce((groups, item) => {
        const date = format(item.date, 'dd/MM/yyyy');
        const group = groups.find(g => g.title === date);
        if (group) {
            group.data.push(item);
        } else {
            groups.push({ title: date, data: [item] });
        }
        return groups;
    }, []);

    const totalValue = expenses.reduce((sum, item) => sum + item.value, 0).toFixed(2);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.value}>R$ {item.value.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Total de Gastos</Text>
                <Text style={styles.total}>R$ {totalValue}</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#b31217" />
            ) : (
                <SectionList
                    sections={groupedData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            )}

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddExpense')}>
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b31217',
        paddingHorizontal: 16,
        paddingTop: 48,
    },
    header: {
        marginBottom: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: '#7a0000',
        fontWeight: '600',
    },
    total: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginTop: 8,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '700',
        backgroundColor: '#fff',
        color: '#b31217',
        paddingVertical: 6,
        paddingHorizontal: 8,
        marginTop: 12,
    },
    item: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#f0dede',
        borderBottomWidth: 1,
    },
    description: {
        fontSize: 16,
        color: '#7a0000',
    },
    value: {
        fontSize: 16,
        fontWeight: '700',
        color: '#b31217',
    },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 32,
        backgroundColor: '#7a0000',
        width: 56,
        height: 56,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    fabText: {
        fontSize: 28,
        color: '#fff',
        marginBottom: 2,
    },
});
