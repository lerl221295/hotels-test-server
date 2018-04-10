import express from 'express'
import hotels from '../controllers/hotels'

export default function(app) {
	// Hoteles
	app.route('/hotels')
		.get(hotels.list)
		.post(hotels.create);

	app.route('/hotels/:id')
		.get(hotels.get)
		.put(hotels.update)
		.delete(hotels.delete);

	if(process.env.DEV == "true" || process.env.DEV == "TRUE")
		app.use(express.static('hotels-img'));
};

