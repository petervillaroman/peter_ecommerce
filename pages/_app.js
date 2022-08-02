/** @format */

import React from 'react';
import { Toaster } from 'react-hot-toast'

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';


function MyApp({ Component, pageProps }) {
	return (
		// wrapping our entire layout with the context provided inside of StateContext
		<StateContext>
		<Layout>
			<Toaster />
			<Component {...pageProps} />
		</Layout>
		</StateContext>
	);
}

export default MyApp;
