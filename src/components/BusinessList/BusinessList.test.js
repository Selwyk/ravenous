import React from 'react';
import ReactDOM from 'react-dom';

import BusinessList from './BusinessList';

const makeBusiness = (overrides = {}) => ({
  imageSrc: 'https://example.com/image.jpg',
  name: 'Sample Business',
  address: '1 Test Lane',
  city: 'Testtown',
  state: 'TX',
  zipCode: '75001',
  category: 'American',
  rating: 3.5,
  reviewCount: 10,
  ...overrides
});

it('renders without crashing with an empty list', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusinessList businesses={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders no Business items when businesses array is empty', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusinessList businesses={[]} />, div);
  const businesses = div.querySelectorAll('.Business');
  expect(businesses.length).toBe(0);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a single Business component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusinessList businesses={[makeBusiness()]} />, div);
  const businesses = div.querySelectorAll('.Business');
  expect(businesses.length).toBe(1);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the correct number of Business components for multiple businesses', () => {
  const list = [makeBusiness({ name: 'A' }), makeBusiness({ name: 'B' }), makeBusiness({ name: 'C' })];
  const div = document.createElement('div');
  ReactDOM.render(<BusinessList businesses={list} />, div);
  const businesses = div.querySelectorAll('.Business');
  expect(businesses.length).toBe(3);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders each business name from the list', () => {
  const list = [
    makeBusiness({ name: 'First Place' }),
    makeBusiness({ name: 'Second Spot' })
  ];
  const div = document.createElement('div');
  ReactDOM.render(<BusinessList businesses={list} />, div);
  const names = Array.from(div.querySelectorAll('.Business h2')).map(el => el.textContent);
  expect(names).toContain('First Place');
  expect(names).toContain('Second Spot');
  ReactDOM.unmountComponentAtNode(div);
});

it('wraps everything in a .BusinessList container', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusinessList businesses={[makeBusiness()]} />, div);
  expect(div.querySelector('.BusinessList')).not.toBeNull();
  ReactDOM.unmountComponentAtNode(div);
});
