import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewAssessmentScreen from '../NewAssessmentScreen';

jest.mock('../../../services/api', () => ({
  references: {
    getLocations: jest.fn().mockResolvedValue([]),
    getCultivars: jest.fn().mockResolvedValue([]),
  },
}));

describe('NewAssessmentScreen', () => {
  beforeEach(() => {
    // JSDOM doesn't implement scrollTo
    window.scrollTo = jest.fn();
  });

  test('navigates between steps', async () => {
    render(<NewAssessmentScreen />);
    expect(screen.getAllByText(/Crop Details/i)[0]).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Field Setup' })
      ).toBeInTheDocument();
    });
  });
});
