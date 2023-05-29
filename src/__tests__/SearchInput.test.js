import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SearchInput from '../components/SearchInput';

test('renders SearchInput component', () => {
  render(
    <SearchInput
      htmlFor="test-input"
      label="Test Input"
      name="test-input"
      onChange={() => {}}
      placeholder="Enter value"
      type="text"
      value=""
    />
  );

  const inputElement = screen.getByLabelText('Test Input');

  expect(inputElement).toBeInTheDocument();
});

test('handles input change', () => {
  const handleChange = jest.fn();

  render(
    <SearchInput
      htmlFor="test-input"
      label="Test Input"
      name="test-input"
      onChange={handleChange}
      placeholder="Enter value"
      type="text"
      value=""
    />
  );

  const inputElement = screen.getByLabelText('Test Input');

  fireEvent.change(inputElement, { target: { value: 'test' } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
});