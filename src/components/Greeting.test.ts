import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';
import Greeting from './Greeting.astro?raw';

test('renders greeting', () => {
  document.body.innerHTML = Greeting;
  expect(screen.getByText('Hello World!')).toBeInTheDocument();
});
