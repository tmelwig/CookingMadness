# Cooking Madness

Cooking Madness is a web application designed to manage a list of recipes. It provides an intuitive interface for users to explore, favorite, and manage recipes, leveraging a REST API for backend operations.

## Features

- **Home Page (`/`)**: Displays a list of available recipes.
- **Recipe Details (`/recettes/{recetteID}`)**: View detailed information about a specific recipe.
- **User Authentication**:
    - Login with a provided username and password.
    - Logout functionality.
- **Favorites Management**:
    Once you are connected:
    - Add recipes to your favorites.
    - Remove recipes from your favorites.
    - View your favorite recipes on the `/favorites` page.

## Technical Stack

- **Frontend**: Built with [React](https://reactjs.org) and [Next.js](https://nextjs.org).
- **Backend API**: Interacts with the [Gourmet API](https://gourmet.cours.quimerch.com). API documentation is available via [OpenAPI](https://gourmet.cours.quimerch.com/swagger/index.html).
- **State Management**: Utilizes [Zustand](https://zustand-demo.pmnd.rs/) for managing application state.
- **Styling**: Tailwind CSS for responsive and modern UI design.

## Deployment

- **Docker**: The application is containerized using Docker for easy deployment.
- **Git**: Version control is managed with Git.

## Setup and Development

1. Clone the repository:
     ```bash
     git clone <repository-url>
     cd CookingMadness
     ```

2. Navigate to the frontend directory and install dependencies:
     ```bash
     cd frontend
     npm install
     ```

3. Run the development server:
     ```bash
     npm run dev
     ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment with Docker

1. Build the Docker image:
     ```bash
     docker build -f frontend/dockerfile -t cooking-madness:latest ./frontend
     ```

2. Run the Docker container:
     ```bash
     docker run -p 3000:80 cooking-madness:latest
     ```

3. Access the application at [http://localhost:3000](http://localhost:3000).

## CI/CD

- **GitHub Actions**: Automated workflows for linting, formatting, building, and publishing Docker images are configured in `.github/workflows`.

## Links

- **Application**: [Cooking Madness](https://omega.cours.quimerch.com/)
- **API Documentation**: [Gourmet API Swagger](https://gourmet.cours.quimerch.com/swagger/index.html)
