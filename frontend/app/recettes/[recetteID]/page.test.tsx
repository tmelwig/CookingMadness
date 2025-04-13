import { render, screen, waitFor } from '@testing-library/react';
import RecipePage from './page';
import { gETRecipesId } from '@/api/gourmetAPI';

jest.mock('@/api/gourmetAPI');
jest.mock('@/app/lib/getFavorites', () => ({
  getFavorites: jest.fn().mockResolvedValue([]),
}));
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));
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
describe('RecipePage', () => {
  const mockParams = async (id: string) => ({ recetteID: id });

  test('renders recipe data when fetch is successful', async () => {
    const mockRecipe = {
      id: '123',
      name: 'Mocked Recipe',
      description: 'Delicious and testy',
      image_url: '/mock.jpg',
      category: 'Dessert',
      calories: 200,
      cook_time: 30,
      created_at: '2024-05-01T12:00:00Z',
      prep_time: 15,
      instructions: 'Mix and cook',
      when_to_eat: 'Dinner',
    };

    (gETRecipesId as jest.Mock).mockResolvedValue({
      status: 200,
      data: mockRecipe,
    });

    const pageElement = await RecipePage({ params: mockParams('123') });
    render(pageElement);

    await waitFor(() => {
      expect(screen.getByText('Mocked Recipe')).toBeInTheDocument();
    });

    expect(screen.getByText(/Delicious and testy/i)).toBeInTheDocument();
    const categoryLabel = screen.getByText(/Category:/i);
    expect(categoryLabel).toBeInTheDocument();
    expect(categoryLabel.parentElement).toHaveTextContent(/Dessert/);
    const caloriesLabel = screen.getByText(/Calories:/i);
    expect(caloriesLabel).toBeInTheDocument();
    expect(caloriesLabel.parentElement).toHaveTextContent('200');
    const cookTimeLabel = screen.getByText(/Cook Time:/i);
    expect(cookTimeLabel).toBeInTheDocument();
    expect(cookTimeLabel.parentElement).toHaveTextContent('30');
    const prepTimeLabel = screen.getByText(/Prep Time:/i);
    expect(prepTimeLabel).toBeInTheDocument();
    expect(prepTimeLabel.parentElement).toHaveTextContent('15');
    const whenToEatLabel = screen.getByText(/When to Eat:/i);
    expect(whenToEatLabel).toBeInTheDocument();
    expect(whenToEatLabel.parentElement).toHaveTextContent('Dinner');
    expect(screen.getByText(/Mix and cook/)).toBeInTheDocument();
  });

  test('calls notFound when fetch fails or recipe is missing', async () => {
    // const notFoundSpy = jest.spyOn(require('next/navigation'), 'notFound');

    (gETRecipesId as jest.Mock).mockResolvedValue({
      status: 404,
      data: null,
    });

    await RecipePage({ params: mockParams('invalid') });

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const notFoundSpy = require('next/navigation').notFound;
    expect(notFoundSpy).toHaveBeenCalled();
  });
});
