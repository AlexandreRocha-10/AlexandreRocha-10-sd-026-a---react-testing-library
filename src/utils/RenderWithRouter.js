import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component, initialRoute = '/') => {
  const history = createMemoryHistory({
    initialEntries: [initialRoute],
  });
  const renderResult = render(
    <Router history={ history }>{component}</Router>,
  );

  return {
    ...renderResult,
    history,
  };
};

export default renderWithRouter;
