import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../utils/RenderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favLink).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole(
      'heading',
      { name: 'Encountered Pokémon' },
    );

    expect(homeTitle).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole(
      'heading',
      { name: 'About Pokédex' },
    );

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const favLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favLink).toBeInTheDocument();
    userEvent.click(favLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');

    const favTitle = screen.getByRole(
      'heading',
      { name: 'Favorite Pokémon' },
    );

    expect(favTitle).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    const INVALID_URL = '/xablau';
    act(() => {
      history.push(INVALID_URL);
    });

    const notFoundTitle = screen.getByRole(
      'heading',
      { name: 'Page requested not found' },
    );
    expect(notFoundTitle).toBeInTheDocument();
  });
});
