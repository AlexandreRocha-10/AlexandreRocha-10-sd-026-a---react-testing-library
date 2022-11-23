import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/RenderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole(
      'heading',
      { name: 'Page requested not found',
        level: 2 },
    );

    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Teste se a página mostra a notFoundImg', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByRole(
      'img',
      { src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif' },
    );
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
