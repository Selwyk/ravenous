import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';

import SearchBar from './SearchBar';

function renderSearchBar(searchYelp = jest.fn()) {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBar searchYelp={searchYelp} />, div);
  return div;
}

it('renders without crashing', () => {
  const div = renderSearchBar();
  ReactDOM.unmountComponentAtNode(div);
});

it('renders all three sort-by options', () => {
  const div = renderSearchBar();
  const options = div.querySelectorAll('.SearchBar-sort-options li');
  expect(options.length).toBe(3);
  const texts = Array.from(options).map(o => o.textContent.trim());
  expect(texts).toContain('Best Match');
  expect(texts).toContain('Highest Rated');
  expect(texts).toContain('Most reviewed');
  ReactDOM.unmountComponentAtNode(div);
});

it('marks "Best Match" as active by default', () => {
  const div = renderSearchBar();
  const options = div.querySelectorAll('.SearchBar-sort-options li');
  const bestMatch = Array.from(options).find(o => o.textContent.trim() === 'Best Match');
  expect(bestMatch.className).toBe('active');
  ReactDOM.unmountComponentAtNode(div);
});

it('non-default sort options do not have the active class on initial render', () => {
  const div = renderSearchBar();
  const options = div.querySelectorAll('.SearchBar-sort-options li');
  const nonDefault = Array.from(options).filter(o => o.textContent.trim() !== 'Best Match');
  nonDefault.forEach(option => {
    expect(option.className).not.toBe('active');
  });
  ReactDOM.unmountComponentAtNode(div);
});

it('changes the active sort option when a different option is clicked', () => {
  const div = renderSearchBar();
  const options = div.querySelectorAll('.SearchBar-sort-options li');
  const highestRated = Array.from(options).find(o => o.textContent.trim() === 'Highest Rated');
  Simulate.click(highestRated);
  expect(highestRated.className).toBe('active');
  ReactDOM.unmountComponentAtNode(div);
});

it('removes the active class from the previous sort option when a new one is clicked', () => {
  const div = renderSearchBar();
  const options = div.querySelectorAll('.SearchBar-sort-options li');
  const bestMatch = Array.from(options).find(o => o.textContent.trim() === 'Best Match');
  const highestRated = Array.from(options).find(o => o.textContent.trim() === 'Highest Rated');
  Simulate.click(highestRated);
  expect(bestMatch.className).not.toBe('active');
  ReactDOM.unmountComponentAtNode(div);
});

it('renders two input fields (search term and location)', () => {
  const div = renderSearchBar();
  const inputs = div.querySelectorAll('.SearchBar-fields input');
  expect(inputs.length).toBe(2);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a submit button inside .SearchBar-submit', () => {
  const div = renderSearchBar();
  expect(div.querySelector('.SearchBar-submit button')).not.toBeNull();
  ReactDOM.unmountComponentAtNode(div);
});

it('calls searchYelp with term, location, and default sortBy when search is submitted', () => {
  const mockSearchYelp = jest.fn();
  const div = renderSearchBar(mockSearchYelp);

  const inputs = div.querySelectorAll('.SearchBar-fields input');
  Simulate.change(inputs[0], { target: { value: 'pizza' } });
  Simulate.change(inputs[1], { target: { value: 'New York' } });

  const submitButton = div.querySelector('.SearchBar-submit button');
  Simulate.click(submitButton);

  expect(mockSearchYelp).toHaveBeenCalledTimes(1);
  expect(mockSearchYelp).toHaveBeenCalledWith('pizza', 'New York', 'best_match');
  ReactDOM.unmountComponentAtNode(div);
});

it('calls searchYelp with the selected sortBy option', () => {
  const mockSearchYelp = jest.fn();
  const div = renderSearchBar(mockSearchYelp);

  const sortOptions = div.querySelectorAll('.SearchBar-sort-options li');
  const highestRated = Array.from(sortOptions).find(o => o.textContent.trim() === 'Highest Rated');
  Simulate.click(highestRated);

  const inputs = div.querySelectorAll('.SearchBar-fields input');
  Simulate.change(inputs[0], { target: { value: 'burgers' } });
  Simulate.change(inputs[1], { target: { value: 'Chicago' } });

  const submitButton = div.querySelector('.SearchBar-submit button');
  Simulate.click(submitButton);

  expect(mockSearchYelp).toHaveBeenCalledWith('burgers', 'Chicago', 'rating');
  ReactDOM.unmountComponentAtNode(div);
});

it('has the correct placeholder for the term input', () => {
  const div = renderSearchBar();
  const termInput = div.querySelectorAll('.SearchBar-fields input')[0];
  expect(termInput.placeholder).toBe('Search Businesses');
  ReactDOM.unmountComponentAtNode(div);
});

it('has the correct placeholder for the location input', () => {
  const div = renderSearchBar();
  const locationInput = div.querySelectorAll('.SearchBar-fields input')[1];
  expect(locationInput.placeholder).toBe('Where?');
  ReactDOM.unmountComponentAtNode(div);
});
