import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase';

export default function AddExpenseScreen() {
    const navigation = useNavigation();

    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (!description || !value) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        const numericValue = parseFloat(value.replace(',', '.'));
        if (isNaN(numericValue) || numericValue <= 0) {
            Alert.alert('Erro', 'Valor inválido');
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Erro', 'Usuário não autenticado');
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, 'expenses'), {
                uid: user.uid,
                description,
                value: numericValue,
                date,
            });

            navigation.navigate('Home');
        } catch (error) {
            console.log('Erro ao salvar gasto:', error);
            Alert.alert('Erro ao salvar gasto', error.message);
        }
    };

    const showDatePicker = () => setShowPicker(true);
    const onChangeDate = (_, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Novo Gasto</Text>

            <TextInput
                style={styles.input}
                placeholder="Descrição"
                placeholderTextColor="#7d0000"
                value={description}
                onChangeText={setDescription}
            />

            <View style={styles.inputWithSymbol}>
                <Text style={styles.symbol}>R$</Text>
                <TextInput
                    style={styles.valueInput}
                    placeholder="0,00"
                    placeholderTextColor="#7d0000"
                    value={value}
                    onChangeText={setValue}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                <Text style={{ color: '#7d0000' }}>{date.toLocaleDateString('pt-BR')}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar Gasto'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 48,
        backgroundColor: '#b31217',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 24,
    },
    input: {
        height: 48,
        borderColor: '#7d0000',
        borderWidth: 1,
        borderRadius: 0,
        paddingHorizontal: 12,
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: '#fff',
        color: '#b31217',
    },
    inputWithSymbol: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#7d0000',
        borderRadius: 0,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    symbol: {
        fontSize: 16,
        color: '#b31217',
        marginRight: 4,
    },
    valueInput: {
        flex: 1,
        fontSize: 16,
        color: '#b31217',
    },
    button: {
        backgroundColor: '#b31217',
        paddingVertical: 14,
        borderRadius: 0,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});
