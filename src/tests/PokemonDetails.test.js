import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/RenderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const pokemonName = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pokemonName).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();

    const summary = screen.getByRole(
      'heading',
      { name: 'Summary',
        level: 2 },
    );

    expect(summary).toBeInTheDocument();

    const summaryContent = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i);
    expect(summaryContent).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const pokemonLocations = screen.getByRole(
      'heading',
      { name: /Game Locations of Pikachu/i,
        level: 2 },
    );

    expect(pokemonLocations).toBeInTheDocument();

    const firstLocation = screen.getByText(/Kanto Viridian Forest/i);
    const secondLocation = screen.getByText(/Kanto Power Plant/i);

    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();

    const locationImg = screen.getAllByAltText(/Pikachu location/i);
    const locationSrc = locationImg.map((img) => img.src);
    expect(locationSrc).toEqual([
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ]);
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const favLabel = screen.queryByText(/Pokémon favoritado?/i);
    expect(favLabel).toBeInTheDocument();

    const favCheck = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favCheck).toBeInTheDocument();
    userEvent.click(favCheck);

    const imageFavoritePokemon = screen.getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });
    expect(imageFavoritePokemon).toBeInTheDocument();
    expect(imageFavoritePokemon).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(favCheck);

    expect(imageFavoritePokemon).not.toBeInTheDocument();
  });
});
