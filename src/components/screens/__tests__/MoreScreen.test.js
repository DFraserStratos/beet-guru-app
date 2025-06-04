import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoreScreen from '../MoreScreen';

describe('MoreScreen', () => {
  test('farmer sees locations option', () => {
    render(
      <MoreScreen onNavigate={() => {}} onLogout={() => {}} user={{ accountType: 'farmer' }} />
    );
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.queryByText('Reports')).not.toBeInTheDocument();
  });

  test('admin sees management options', () => {
    render(
      <MoreScreen onNavigate={() => {}} onLogout={() => {}} user={{ isAdmin: true }} />
    );
    expect(screen.getByText('Cultivar Management')).toBeInTheDocument();
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.queryByText('Locations')).not.toBeInTheDocument();
  });
});
