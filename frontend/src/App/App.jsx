import { Route, Routes } from 'react-router-dom';
import { Context } from '../context';
import HomePage from '../pages/HomePage';


function App() {
	return (
		<Context.Provider value={{}}>
			<Routes>
				<Route path="/" element={<HomePage />}/>
			</Routes>
		</Context.Provider>
	);
}

export default App
