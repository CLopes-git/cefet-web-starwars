// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.info/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { play } from './music.js';

const API_ENDPOINT = 'https://swapi.info/api'

play(
  {
    audioUrl: 'audio/tema-sw.mp3',
    coverImageUrl: 'imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams'
  },
  document.body
);

async function fetchMovies() {
  try {
    const response = await fetch(`${API_ENDPOINT}/films`);
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    const data = await response.json();
    console.log('Filmes:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const movies = await fetchMovies();
  console.log('Total de filmes:', movies.length);
});
