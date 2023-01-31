/* eslint-disable no-undef */

'use strict';

const request = require('supertest');
const app = require('./app');

describe('Exoplanets list testing', () => {
    test('GET /exoplanets succeeds', () => {
        return request(app)
	    .get('/exoplanets')
	    .expect(200);
    });

    test('GET /exoplanets returns JSON', () => {
        return request(app)
	    .get('/exoplanets')
	    .expect('Content-type', /json/);
    });

    test('GET /exoplanets includes Kepler 22b', () => {
        return request(app)
	    .get('/exoplanets')
	    .expect(/Kepler 22b/);
    });

    test('GET /exoplanet/Kepler 22b succeeds', () => {
        return request(app)
	    .get('/exoplanet/Kepler 22b')
	    .expect(200);
    });

    test('POST /exoplanet/new', () => {
        const params = { name: "HD 189733b", category: "Gas Giant", distance: "64.5 ly", desc: "It rains molten glass, sideways"};
        return request(app)
        .post('/exoplanet/new')
        .send(params)
	    .expect(200);
    });
});