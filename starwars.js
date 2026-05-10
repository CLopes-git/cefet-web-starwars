// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.info/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { play } from './music.js';

const API_ENDPOINT = 'https://swapi.info/api'

function decimalToRoman(num) {
  const romanMap = {
    1000: 'M',
    900: 'CM',
    500: 'D',
    400: 'CD',
    100: 'C',
    90: 'XC',
    50: 'L',
    40: 'XL',
    10: 'X',
    9: 'IX',
    5: 'V',
    4: 'IV',
    1: 'I'
  };

  let roman = '';
  const valores = Object.keys(romanMap).sort((a, b) => b - a);
  
  for (let valor of valores) {
    while (num >= valor) {
      roman += romanMap[valor];
      num -= valor;
    }
  }
  return roman;
}

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
    return data.sort((a, b) => a.episode_id - b.episode_id);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
}

function fillMoviesList(movies) {
  const filmesList = document.querySelector('#filmes ul');
  filmesList.innerHTML = '';

  movies.forEach(movie => {
    const roman = decimalToRoman(movie.episode_id).padEnd(3, ' ');
    const li = document.createElement('li');
    li.textContent = `Episode ${roman} - ${movie.title}`;
    filmesList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const movies = await fetchMovies();
  if (movies && movies.length > 0) {
    fillMoviesList(movies);
  }
});