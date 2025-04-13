import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './page';
import { getRecipesAction } from '@/app/lib/actions/getRecipesAction';

// --- Mocks ---
jest.mock('@/app/lib/actions/getRecipesAction');
jest.mock('next/image', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockNextImage = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, fill, ...rest } = props;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...rest} alt={props.alt || 'mocked image'} />
    );
  };
  MockNextImage.displayName = 'MockNextImage';
  return MockNextImage;
});

// --- Tests ---
describe('HomePage', () => {
  test('renders homepage with recipes when fetch is successful', async () => {
    const dummyRecipes = [
      { id: '1', name: 'Test Recipe', description: 'Test Description' },
    ];
    (getRecipesAction as jest.Mock).mockResolvedValue(dummyRecipes);

    const pageElement = await HomePage();
    render(pageElement);

    expect(screen.getByText('Cooking Madness')).toBeInTheDocument();
    expect(screen.getByText('Recettes')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    });
  });

  test('renders error message when recipe fetch fails', async () => {
    (getRecipesAction as jest.Mock).mockRejectedValue(new Error('API Error'));

    const pageElement = await HomePage();
    render(pageElement);

    await waitFor(() => {
      expect(
        screen.getByText('Erreur lors de la récupération des recettes')
      ).toBeInTheDocument();
    });
  });
});

test('renders no recipes message when no recipes are available', async () => {
  (getRecipesAction as jest.Mock).mockResolvedValue([]);

  const pageElement = await HomePage();
  render(pageElement);

  await waitFor(() => {
    expect(screen.getByText('Pas de recettes disponibles')).toBeInTheDocument();
  });
});
