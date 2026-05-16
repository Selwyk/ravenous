import React from 'react';
import ReactDOM from 'react-dom';

import Business from './Business';

const testBusiness = {
  imageSrc: 'https://example.com/pizza.jpg',
  name: 'Test Pizzeria',
  address: '123 Main St',
  city: 'Testville',
  state: 'CA',
  zipCode: '90210',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 42
};

function renderBusiness(businessProps = testBusiness) {
  const div = document.createElement('div');
  ReactDOM.render(<Business business={businessProps} />, div);
  return div;
}

it('renders without crashing', () => {
  const div = renderBusiness();
  ReactDOM.unmountComponentAtNode(div);
});

it('displays the business name', () => {
  const div = renderBusiness();
  expect(div.querySelector('h2').textContent).toBe(testBusiness.name);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays the business address', () => {
  const div = renderBusiness();
  const addressParagraphs = div.querySelectorAll('.Business-address p');
  expect(addressParagraphs[0].textContent).toBe(testBusiness.address);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays the business city', () => {
  const div = renderBusiness();
  const addressParagraphs = div.querySelectorAll('.Business-address p');
  expect(addressParagraphs[1].textContent).toBe(testBusiness.city);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays the business state and zip code', () => {
  const div = renderBusiness();
  const addressParagraphs = div.querySelectorAll('.Business-address p');
  expect(addressParagraphs[2].textContent).toBe(`${testBusiness.state} ${testBusiness.zipCode}`);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays the business category', () => {
  const div = renderBusiness();
  const reviewHeadings = div.querySelectorAll('.Business-reviews h3');
  expect(reviewHeadings[0].textContent).toBe(testBusiness.category);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays the business rating with "stars" label', () => {
  const div = renderBusiness();
  const ratingHeading = div.querySelector('.Business-reviews h3.rating');
  expect(ratingHeading.textContent).toBe(`${testBusiness.rating} stars`);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays the review count', () => {
  const div = renderBusiness();
  const reviewParagraph = div.querySelector('.Business-reviews p');
  expect(reviewParagraph.textContent).toBe(`${testBusiness.reviewCount} reviews`);
  ReactDOM.unmountComponentAtNode(div);
});


it('renders the business image with the correct src', () => {
  const div = renderBusiness();
  const img = div.querySelector('.image-container img');
  expect(img.src).toBe(testBusiness.imageSrc);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly with different business data', () => {
  const anotherBusiness = {
    imageSrc: 'https://example.com/sushi.jpg',
    name: 'Sushi Palace',
    address: '456 Ocean Ave',
    city: 'Beach City',
    state: 'FL',
    zipCode: '33139',
    category: 'Japanese',
    rating: 5,
    reviewCount: 200
  };
  const div = renderBusiness(anotherBusiness);
  expect(div.querySelector('h2').textContent).toBe('Sushi Palace');
  const ratingHeading = div.querySelector('.Business-reviews h3.rating');
  expect(ratingHeading.textContent).toBe('5 stars');
  ReactDOM.unmountComponentAtNode(div);
});
