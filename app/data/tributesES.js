'use strict';

const data = [
  {
    name: 'Abraham Castro',
    age: 12,
    date: '2018-06-08',
    category: 'niño',
    city: 'Jinotega',
    gender: 'M',
  },
  {
    name: 'Álvaro Manuel Conrado Dávila',
    age: 15,
    date: '2018-04-20',
    category: 'niño',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Jesner Jose Rivas',
    age: 16,
    date: '2018-04-22',
    category: 'niño',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Richard Antonio Pavón Bermúdez',
    age: 17,
    date: '2018-04-19',
    category: 'jóven',
    city: 'Tipitapa',
    gender: 'M',
  },
  {
    name: 'Carlos Alberto Bonilla López',
    age: 17,
    date: '2018-04-20',
    category: 'jóven',
    city: 'Ciudad Sandino',
    gender: 'M',
  },
  {
    name: 'Jose Abraham Amador',
    age: 16,
    date: '2018-04-22',
    category: 'niño',
    city: 'Masaya',
    gender: 'M',
  },
  {
    name: 'Ángel Eduardo Gahona',
    age: 42,
    date: '2018-04-21',
    category: 'hombre',
    city: 'Bluefields',
    gender: 'M',
  },
  {
    name: 'Harlinton Raul López García',
    age: 18,
    date: '2018-04-20',
    category: 'jóven',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Marlon Manases Martínez Ramirez',
    age: 20,
    date: '2018-04-20',
    category: 'jóven',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Michael Humberto Cruz Sanchez',
    age: 30,
    date: '2018-04-27',
    category: 'hombre',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Moroni Jacob López García',
    age: 22,
    date: '2018-04-20',
    category: 'jóven',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Orlando Francisco Perez Corrales',
    age: 24,
    date: '2018-04-20',
    category: 'jóven',
    city: 'Estelí',
    gender: 'M',
  },
  {
    name: 'Franco Alexander Valdivia Machado',
    age: 24,
    date: '2018-04-20',
    category: 'jóven',
    city: 'Estelí',
    gender: 'M',
  },
  {
    name: 'Cristhiam Emilio Cadenas',
    age: 23,
    date: '2018-04-21',
    category: 'jóven',
    city: 'León',
    gender: 'M',
  },
  {
    name: 'Darwin Manuel Urbina Urbina',
    age: 28,
    date: '2018-04-20',
    category: 'jóven',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Izmael Jose Perez Vilchez',
    age: 32,
    date: '2018-04-22',
    category: 'hombre',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Juan Carlos López Martínez',
    age: 24,
    date: '2018-04-22',
    category: 'jóven',
    city: 'Ciudad Sandino',
    gender: 'M',
  },
  {
    name: 'Marcos Antonio Samorio Anderson',
    age: 30,
    date: '2018-04-21',
    category: 'hombre',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Carlos Manuel Sandino Hernández',
    age: 39,
    date: '2018-04-21',
    category: 'hombre',
    city: 'Masaya',
    gender: 'M',
  },
  {
    name: 'Erick Andres Cubillo Solís',
    age: 36,
    date: '2018-04-21',
    category: 'hombre',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Alvis Yamil Molina Hodgson',
    age: 35,
    date: '2018-04-21',
    category: 'hombre',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Lester Adan Vindell Picado',
    age: 37,
    date: '2018-04-21',
    category: 'hombre',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Danny Stanley Rivas',
    age: 0,
    date: '2018-04-24',
    category: '',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Roberto Carlos García Polanco',
    age: 40,
    date: '2018-04-24',
    category: 'hombre',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Edwin Bismarck Gómez',
    age: 33,
    date: '2018-04-22',
    category: 'hombre',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Jonathan Steven Valerio López',
    age: 20,
    date: '2018-04-22',
    category: 'jóven',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Hammer Joel García Salinas',
    age: 19,
    date: '2018-04-21',
    category: 'jóven',
    city: 'Tipitapa',
    gender: 'M',
  },
  {
    name: 'Jasson Antonio Chavarría Urbina',
    age: 21,
    date: '2018-04-21',
    category: 'jóven',
    city: 'Ticuantepe',
    gender: 'M',
  },
  {
    name: 'Nesken Eliezer Velásquez',
    age: 28,
    date: '2018-04-22',
    category: 'jóven',
    city: 'Mateare',
    gender: 'M',
  },
  {
    name: 'Geovani Sobalvarro Altamirano',
    age: 24,
    date: '2018-04-19',
    category: '',
    city: 'Sébaco',
    gender: 'M',
  },
  {
    name: 'Álvaro Gómez Navarro',
    age: 23,
    date: '2018-04-20',
    category: 'jóven',
    city: 'Monimbo',
    gender: 'M',
  },
  {
    name: 'Sándor Dolmus',
    age: 15,
    date: '2018-06-14',
    category: 'niño',
    city: 'León',
    gender: 'M',
  },
];

module.exports = data;
