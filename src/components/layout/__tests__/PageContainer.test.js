import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageContainer from '../PageContainer';

describe('PageContainer', () => {
  test('applies custom className and renders children', () => {
    const { container } = render(
      <PageContainer className="custom wrapper">
        <p>Child content</p>
      </PageContainer>
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom');
    expect(wrapper).toHaveClass('wrapper');
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
