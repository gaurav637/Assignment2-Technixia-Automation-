import axios from "axios";
import Weather from '../models/weather.js';


const API_KEY = "e47564435d19480b9e344956240807";

export const weatherController = async (req, res) => {
    const city = req.params.city;
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
        const response = await axios.get(url);
        const weather = response.data;
        const weatherData = {
            location: weather.location.name,
            temperature: weather.current.temp_c,
            condition: weather.current.condition.text,
            updatedAt: new Date()
        };

        // Save the weather data to the database
        await Weather.findOneAndUpdate(
            { location: weatherData.location },
            weatherData,
            { upsert: true, new: true } 
        );
        // Send the weather data as a response
        res.status(200).json({
            city: weather.location.name,
            temperature: weather.current.temp_c,
            description: weather.current.condition.text
        });

    } catch (error) {
        console.log('Failed to get weather data:', error.message);
        res.status(500).json({ message: error.message });
    }
};


export const updateWeatherEachTenSecond = async (req,res)=> {
    try{
        const allCityData = await Weather.find().distinct('location');
        for(const city of allCityData){
            const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
            try{
                const response = await axios.get(url);
                const weather = response.data;
                const weatherData = {
                    location: weather.location.name,
                    temperature: weather.current.temp_c,
                    condition: weather.current.condition.text
                };
                await Weather.findOneAndUpdate(
                    { location: weatherData.location },
                    weatherData,
                    {upsert: true}
                );
                console.log('city weather updateddd');

            }catch(error){
                console.log(`failed to update city weather data ${city}`);
            }
        }

    }catch(error){
        console.log("failed to get city data",error.message);
    }
}