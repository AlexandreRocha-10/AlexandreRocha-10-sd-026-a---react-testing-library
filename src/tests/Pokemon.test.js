import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../utils/RenderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img', {
      name: /Pikachu sprite/i,
    });
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonLink = screen.getByRole('link', { name: /More details/i });
    expect(pokemonLink).toBeInTheDocument();
    userEvent.click(pokemonLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const summary = screen.getByRole(
      'heading',
      { name: 'Summary',
        level: 2 },
    );

    expect(summary).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const favoritePokemon = screen.getByText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);

    const imageFavoritePokemon = screen.getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });
    expect(imageFavoritePokemon).toBeInTheDocument();
    expect(imageFavoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
