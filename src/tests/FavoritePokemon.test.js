import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/RenderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const noFav = screen.getByText(/No favorite Pokémon found/i);

    expect(noFav).toBeInTheDocument();
  });
});
