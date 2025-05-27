import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeScreen from '../HomeScreen';
import AuthContext from '../../../context/AuthContext';

describe('HomeScreen', () => {
  test('shows user name and navigates to new assessment', () => {
    const onNavigate = jest.fn();
    const contextValue = { user: { name: 'Jane' } };
    render(
      <AuthContext.Provider value={{ ...contextValue }}>
        <HomeScreen onNavigate={onNavigate} />
      </AuthContext.Provider>
    );
    expect(screen.getByText('Welcome, Jane')).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /New Assessment/i });
    fireEvent.click(btn);
    expect(onNavigate).toHaveBeenCalledWith('new-assessment');
  });

  test('mobile variant uses short button label', () => {
    render(
      <AuthContext.Provider value={{ user: { name: 'Test' } }}>
        <HomeScreen isMobile onNavigate={() => {}} />
      </AuthContext.Provider>
    );
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });
});
