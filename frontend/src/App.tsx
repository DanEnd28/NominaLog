import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import NominaForm from './components/NominaForm';

function App() {
	return (
		<NextUIProvider>
			<div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
				<NominaForm />
			</div>
		</NextUIProvider>
	);
}

export default App;
