import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconsenha from 'react-native-vector-icons/Ionicons';

export default function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [showSenha, setShowSenha] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.password) {
            Alert.alert("Todos os campos devem ser preenchidos");
            return;
        }
        try {
            const response = await fetch('https://taskhub-s37f.onrender.com/auth/signup', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro na solicitação: ' + response.statusText);
            }

            const data = await response.json();
            setMensagem("Cadastro realizado com sucesso!");
            setFormData({
                name: '',
                email: '',
                password: '',
            });
        } catch (error) {
            console.error(error);
            setMensagem("Houve um erro ao realizar o cadastro.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tituloContainer}>
                <Text style={styles.titulo}>Cadastro</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#666"
                    value={formData.name}
                    onChangeText={(text) => handleChange('name', text)}
                />
                <Icon style={styles.icone} name='user' size={20} color="#333" />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="E-mail"
                    placeholderTextColor="#666"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                />
                <Icon style={styles.icone} name='mail' size={20} color="#333" />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#666"
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry={showSenha}
                />
                <TouchableOpacity style={styles.iconeSenha} onPress={() => setShowSenha(!showSenha)}>
                    <Iconsenha name={showSenha ? 'eye' : 'eye-off'} color="#333" size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.botoesContainer}>
                <Pressable style={styles.botaoCadastro} onPress={handleSubmit}>
                    <Text style={styles.textoBotao}>Cadastrar</Text>
                </Pressable>
            </View>
            {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    tituloContainer: {
        marginBottom: 20,
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0033A0', // Azul escuro
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333', // Preto
        borderRadius: 20, // Borda arredondada
        backgroundColor: '#f0f0f0', // Cinza claro
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 15,
        color: '#333',
    },
    icone: {
        marginLeft: 10,
    },
    iconeSenha: {
        marginLeft: 10,
    },
    botoesContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    botaoCadastro: {
        width: '100%',
        height: 50,
        backgroundColor: '#0033A0', // Azul escuro
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    textoBotao: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    mensagem: {
        fontSize: 16,
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});
