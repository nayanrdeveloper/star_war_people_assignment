import { screen , renderHook} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import useStarWarPeoples from '../hooks/useStarWarPeoples';

jest.mock('axios');

describe('useStarWarPeoples', () => {
  test('should fetch data and update state correctly', async () => {
    const mockPeopleResponse = {
      data: {
        results: [
          { name: 'Luke Skywalker' },
          { name: 'Leia Organa' },
          { name: 'Han Solo' },
        ],
        count: 3,
      },
    };

    axios.get.mockResolvedValue(mockPeopleResponse);

    renderHook(() => useStarWarPeoples());

    // Verify initial state
    expect(screen.getByText('No results found.')).toBeInTheDocument();
    expect(screen.queryByRole('row')).toBeNull();

    // Simulate search
    const searchInput = screen.getByLabelText('Search');
    userEvent.type(searchInput, 'Skywalker');

    // Verify loading state
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for data to be fetched
    await screen.findByRole('row');

    // Verify fetched data and updated state
    expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(4); // Including table header row

    const tableRows = screen.getAllByRole('row');
    expect(tableRows[1]).toHaveTextContent('Luke Skywalker');
    expect(tableRows[2]).toHaveTextContent('Leia Organa');
    expect(tableRows[3]).toHaveTextContent('Han Solo');

    // Verify pagination
    const nextPageButton = screen.getByLabelText('Next Page');
    userEvent.click(nextPageButton);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    await screen.findByText('Luke Skywalker'); // Wait for data to be fetched for the next page

    expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(4); // Including table header row

  });

});