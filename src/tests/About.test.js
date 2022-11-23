import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/RenderWithRouter';
import { About } from '../pages';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole(
      'heading',
      { name: 'About Pokédex',
        level: 2 },
    );

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const subTitle1 = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const subTitle2 = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);

    expect(subTitle1).toBeInTheDocument();
    expect(subTitle2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole(
      'img',
      { name: /pokédex/i },
    );
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
