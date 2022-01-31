import { set } from 'date-fns';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { JSONFile, Low } from 'lowdb';
import { rand, randBetweenDate, randNumber, randUuid } from '@ngneat/falso';

import { ConditionDescriptions, Data, WeatherDetails, WeatherSummary } from './initialize-db.types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile<Data>(file);
export const db = new Low<Data>(adapter);

export async function initializeDatabase(): Promise<void> {
    await db.read();

    const cities: [city: string, state: string][] = [
        ['Indianapolis', 'IN'],
        ['Chicago', 'IL'],
        ['Nashville', 'TN'],
        ['New York', 'NY'],
        ['Los Angeles', 'CA'],
        ['Seattle', 'WA'],
        ['Dallas', 'TX'],
        ['Miami', 'FL'],
        ['Atlanta', 'GA'],
    ];

    const weatherDescriptions: ConditionDescriptions[] = [
        'sunny',
        'partly sunny',
        'mostly sunny',
        'partly cloudy',
        'mostly cloudy',
        'cloudy',
        'overcast',
        'mist',
        'rain',
        'drizzle',
        'stormy',
        'scattered thunderstorms',
        'thunderstorms',
        'heavy thunderstorms',
        'fog',
        'hazy',
    ];

    const daysOfForecast: number[] = [1, 2, 3, 4, 5, 6, 7];

    const weatherSummary: WeatherSummary[] = cities.map(([city, state]) => ({
        guid: randUuid(),
        city,
        state,
        currentTemperature: randNumber({ min: 55, max: 75 }),
        currentWindSpeed: randNumber({ min: 0, max: 25 }),
        currentHumidity: randNumber({ min: 25, max: 75 }),
        description: rand(weatherDescriptions),
    }));

    const weatherDetails: WeatherDetails[] = weatherSummary.map((summary) => {
        const now = new Date();

        return {
            ...summary,
            sunrise: randBetweenDate({
                from: set(now, { hours: 6, minutes: 0 }),
                to: set(now, { hours: 8, minutes: 0 }),
            }),
            sunset: randBetweenDate({
                from: set(now, { hours: 19, minutes: 0 }),
                to: set(now, { hours: 21, minutes: 0 }),
            }),
            forecast: daysOfForecast.map((day) => ({
                day,
                description: rand(weatherDescriptions),
                windSpeed: randNumber({ min: 0, max: 25 }),
                maxTemperature: randNumber({ min: 70, max: 80 }),
                avgTemperature: randNumber({ min: 60, max: 70 }),
                minTemperature: randNumber({ min: 50, max: 60 }),
            })),
        };
    });

    db.data = { weatherSummary, weatherDetails };

    await db.write();
}
