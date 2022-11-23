import React from 'react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../utils/RenderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole(
      'heading',
      { name: 'Encountered Pokémon',
        level: 2 },
    );

    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const pokedexNextBtn = screen.getByRole(
      'button',
      { name: 'Próximo Pokémon' },
    );

    expect(pokedexNextBtn).toBeInTheDocument();

    userEvent.click(pokedexNextBtn);

    const nextPokemon = screen.getByText(/Charmander/i);

    expect(nextPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokedexNextBtn = screen.getByRole(
      'button',
      { name: 'Próximo Pokémon' },
    );

    expect(pokedexNextBtn).toBeInTheDocument();

    userEvent.click(pokedexNextBtn);

    const nextPokemon = screen.getAllByText(/Charmander/i);

    expect(nextPokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const pokemonTypeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonTypeBtn).toHaveLength(7);

    const electricBtn = screen.getByRole('button', { name: /Electric/i });
    expect(electricBtn).toBeInTheDocument();
    const fireBtn = screen.getByRole('button', { name: /Fire/i });
    expect(fireBtn).toBeInTheDocument();
    const bugBtn = screen.getByRole('button', { name: /Bug/i });
    expect(bugBtn).toBeInTheDocument();
    const poisonBtn = screen.getByRole('button', { name: /Poison/i });
    expect(poisonBtn).toBeInTheDocument();
    const psychicBtn = screen.getByRole('button', { name: /Psychic/i });
    expect(psychicBtn).toBeInTheDocument();
    const normalBtn = screen.getByRole('button', { name: /Normal/i });
    expect(normalBtn).toBeInTheDocument();
    const dragonBtn = screen.getByRole('button', { name: /Dragon/i });
    expect(dragonBtn).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /All/i });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
