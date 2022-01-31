# Api

DMI Weather API utilizing ES Modules and TypeScript, requires Node.js ^12.20.0 || ^14.13.1 || >=16.0.0 or higher.

## Running the App

Run `npm run start` to start, navigate to `http://localhost:3000` to confirm the api is functional.

## Development Server with File Watching

Run `npm run dev` to start, the app will automatically reload if you change any of the source files.

## API Routes:

- `/`: HTML Welcome Page
- `/summary`: Current weather conditions for nine different US cities
- `/forecast/:guid`: Weather for one city along with a seven-day forecast

## Dependencies Explained

- `@ngneat/falso`: Generate many kinds of fake data
- `date-fns`: Date manipulation
- `express`: Minimal and flexible Node.js web application framework
- `lowdb`: Tiny local JSON database for small projects
- `nodemon`: Watch for file changes