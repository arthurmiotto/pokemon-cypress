import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0033A0',
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
  },
  picker: {
    height: 50,
    borderRadius: 25, 
    backgroundColor: '#FFD700', 
    color: '#0033A0', 
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#0033A0',
    textAlign: 'center', 
  },
  imageContainer: {
    alignItems: 'center', 
    justifyContent: 'center',
    flex: 1,
  },
  loader: {
    marginTop: 20,
  },
  pickerWrapper: {
    width: '80%',
    justifyContent: 'center', 
  },
});

export default function Pokemon() {
  const [pokemon, setPokemon] = useState('');
  const [Type, setType] = useState('');
  const [lista_pokemons, setListaPokemons] = useState([]);
  const [Type_pokemons, setTypePokemons] = useState([]);
  const [pokemonFiltrado, setPokemonFiltrado] = useState([]);
  const [sprite, setSprite] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setListaPokemons(dados.results);
        setLoading(false);
      })
      .catch(() => {
        console.log('Aconteceu um erro ao buscar os pokémons.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('https://pokeapi.co/api/v2/type?limit=2000')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setTypePokemons(dados.results);
        setLoading(false);
      })
      .catch(() => {
        console.log('Aconteceu um erro ao buscar os tipos.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (Type) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/type/${Type}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          const pokemonsFiltrados = dados.pokemon.map((p) => p.pokemon);
          setPokemonFiltrado(pokemonsFiltrados);
          setLoading(false);
        })
        .catch(() => {
          console.log('Ocorreu um erro ao buscar os pokémons por tipo.');
          setLoading(false);
        });
    } else {
      setPokemonFiltrado(lista_pokemons);
    }
  }, [Type, lista_pokemons]);

  useEffect(() => {
    if (pokemon) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setSprite(dados.sprites.front_default);
          setLoading(false);
        })
        .catch(() => {
          console.log('Ocorreu um erro ao buscar a sprite do pokémon.');
          setLoading(false);
        });
    } else {
      setSprite('');
    }
  }, [pokemon]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pokédex</Text>
      <View style={styles.pickerWrapper}>
        <Text style={styles.text}>Tipos:</Text>
        <Picker
          selectedValue={Type}
          style={styles.picker}
          onValueChange={(item) => setType(item)}
        >
          <Picker.Item label="Selecione um tipo" value="" />
          {Type_pokemons.map((item, index) => (
            <Picker.Item key={index} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>
      {Type ? (
        <View style={styles.pickerWrapper}>
          <Text style={styles.text}>Você selecionou {Type}</Text>
          <Text style={styles.text}>Pokémons</Text>
          <Picker
            selectedValue={pokemon}
            style={styles.picker}
            onValueChange={(item) => setPokemon(item)}
          >
            <Picker.Item label="Selecione um Pokémon" value="" />
            {pokemonFiltrado.map((item, index) => (
              <Picker.Item key={index} label={item.name} value={item.name} />
            ))}
          </Picker>
          {pokemon ? <Text style={styles.text}>Você selecionou {pokemon}</Text> : null}
          <View style={styles.imageContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0033A0" style={styles.loader} />
            ) : sprite ? (
              <Image source={{ uri: sprite }} style={styles.pokemonImage} />
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
}
