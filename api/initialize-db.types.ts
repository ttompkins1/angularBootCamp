export interface DailyForecast {
    day: number;
    description: ConditionDescriptions;
    windSpeed: number;
    maxTemperature: number;
    avgTemperature: number;
    minTemperature: number;
}

export interface WeatherLocation {
    guid: string;
    city: string;
    state: string;
}

export interface WeatherSummary extends WeatherLocation {
    currentTemperature: number;
    currentWindSpeed: number;
    currentHumidity: number;
    description: ConditionDescriptions;
}

export interface WeatherDetails extends WeatherSummary {
    sunrise: Date;
    sunset: Date;
    forecast: DailyForecast[];
}

export interface Data {
    weatherSummary: WeatherSummary[];
    weatherDetails: WeatherDetails[];
}

export type ConditionDescriptions =
    | 'sunny'
    | 'partly sunny'
    | 'mostly sunny'
    | 'partly cloudy'
    | 'mostly cloudy'
    | 'cloudy'
    | 'overcast'
    | 'mist'
    | 'rain'
    | 'drizzle'
    | 'stormy'
    | 'scattered thunderstorms'
    | 'thunderstorms'
    | 'heavy thunderstorms'
    | 'fog'
    | 'hazy';
