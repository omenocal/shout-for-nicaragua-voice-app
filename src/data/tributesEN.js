'use strict';

const data = [
  {
    name: 'Abraham Castro',
    age: 12,
    date: '2018-06-08',
    category: 'child',
    city: 'Jinotega',
    gender: 'M',
  },
  {
    name: 'Alvaro Manuel Conrado Davila',
    age: 15,
    date: '2018-04-20',
    category: 'child',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Jesner Jose Rivas',
    age: 16,
    date: '2018-04-22',
    category: 'child',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Richard Antonio Pavon Bermudez',
    age: 17,
    date: '2018-04-19',
    category: 'young',
    city: 'Tipitapa',
    gender: 'M',
  },
  {
    name: 'Carlos Alberto Bonilla Lopez',
    age: 17,
    date: '2018-04-20',
    category: 'young',
    city: 'Ciudad Sandino',
    gender: 'M',
  },
  {
    name: 'Jose Abraham Amador',
    age: 16,
    date: '2018-04-22',
    category: 'child',
    city: 'Masaya',
    gender: 'M',
  },
  {
    name: 'angel Eduardo Gahona',
    age: 42,
    date: '2018-04-21',
    category: 'man',
    city: 'Bluefields',
    gender: 'M',
  },
  {
    name: 'Harlinton Raul Lopez Garcia',
    age: 18,
    date: '2018-04-20',
    category: 'young',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Marlon Manases Martinez Ramirez',
    age: 20,
    date: '2018-04-20',
    category: 'young',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Michael Humberto Cruz Sanchez',
    age: 30,
    date: '2018-04-27',
    category: 'man',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Moroni Jacob Lopez Garcia',
    age: 22,
    date: '2018-04-20',
    category: 'young',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Orlando Francisco Perez Corrales',
    age: 24,
    date: '2018-04-20',
    category: 'young',
    city: 'Esteli',
    gender: 'M',
  },
  {
    name: 'Franco Alexander Valdivia Machado',
    age: 24,
    date: '2018-04-20',
    category: 'young',
    city: 'Esteli',
    gender: 'M',
  },
  {
    name: 'Cristhiam Emilio Cadenas',
    age: 23,
    date: '2018-04-21',
    category: 'young',
    city: 'Leon',
    gender: 'M',
  },
  {
    name: 'Darwin Manuel Urbina Urbina',
    age: 28,
    date: '2018-04-20',
    category: 'young',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Izmael Jose Perez Vilchez',
    age: 32,
    date: '2018-04-22',
    category: 'man',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Juan Carlos Lopez Martinez',
    age: 24,
    date: '2018-04-22',
    category: 'young',
    city: 'Ciudad Sandino',
    gender: 'M',
  },
  {
    name: 'Marcos Antonio Samorio Anderson',
    age: 30,
    date: '2018-04-21',
    category: 'man',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Carlos Manuel Sandino Hernandez',
    age: 39,
    date: '2018-04-21',
    category: 'man',
    city: 'Masaya',
    gender: 'M',
  },
  {
    name: 'Erick Andres Cubillo Solis',
    age: 36,
    date: '2018-04-21',
    category: 'man',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Alvis Yamil Molina Hodgson',
    age: 35,
    date: '2018-04-21',
    category: 'man',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Lester Adan Vindell Picado',
    age: 37,
    date: '2018-04-21',
    category: 'man',
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
    name: 'Roberto Carlos Garcia Polanco',
    age: 40,
    date: '2018-04-24',
    category: 'man',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Edwin Bismarck Gomez',
    age: 33,
    date: '2018-04-22',
    category: 'man',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Jonathan Steven Valerio Lopez',
    age: 20,
    date: '2018-04-22',
    category: 'young',
    city: 'Managua',
    gender: 'M',
  },
  {
    name: 'Hammer Joel Garcia Salinas',
    age: 19,
    date: '2018-04-21',
    category: 'young',
    city: 'Tipitapa',
    gender: 'M',
  },
  {
    name: 'Jasson Antonio Chavarria Urbina',
    age: 21,
    date: '2018-04-21',
    category: 'young',
    city: 'Ticuantepe',
    gender: 'M',
  },
  {
    name: 'Nesken Eliezer Velasquez',
    age: 28,
    date: '2018-04-22',
    category: 'young',
    city: 'Mateare',
    gender: 'M',
  },
  {
    name: 'Geovani Sobalvarro Altamirano',
    age: 24,
    date: '2018-04-19',
    category: '',
    city: 'Sebaco',
    gender: 'M',
  },
  {
    name: 'Alvaro Gomez Navarro',
    age: 23,
    date: '2018-04-20',
    category: 'young',
    city: 'Monimbo',
    gender: 'M',
  },
  {
    name: 'Sandor Dolmus',
    age: 15,
    date: '2018-06-14',
    category: 'child',
    city: 'Leon',
    gender: 'M',
  },
];

module.exports = data;
