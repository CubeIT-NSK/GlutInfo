import { Route, Routes } from 'react-router-dom';
import { Context } from '../context';
import ErrorPage from '../pages/ErrorPage';
import FillConsultantProfilePage from '../pages/FillPages/FillConsultantProfilePage';
import SuccessPage from '../pages/FillPages/FillConsultantProfilePage/SuccessPage';
import FillPatientProfilePage from '../pages/FillPages/FillPatientProfilePage';
import HomePage from '../pages/HomePage';
import ConsultantProfilePage from '../pages/Profiles/ConsultantProfilePage';
import EditConsultantProfilePage from '../pages/EditPages/EditConsultantProfilePage';
import PatternPage from '../pages/PatternPage';
import PatientProfilePage from '../pages/Profiles/PatientProfilePage';
import RegistrationPage from '../pages/RegistrationPage';


function App() {
	return (
		<Context.Provider value={{}}>
			<Routes>
				<Route path="/" element={<HomePage />}/>

				<Route path="/registration" element={<RegistrationPage />}/>
				<Route path="/fill-patient" element={<FillPatientProfilePage />}/>
				<Route path="/fill-consultant" element={<FillConsultantProfilePage />}/>
				<Route path="/success" element={<SuccessPage  />}/>

				<Route path="/profile-patient" element={<PatientProfilePage  />}/>
				<Route path="/profile-consultant" element={<ConsultantProfilePage  />}/>
				<Route path="/edit-profile-consultant" element={<EditConsultantProfilePage  />}/>


				<Route path="/404" element={<ErrorPage  />}/>
				<Route path="/pattern" element={<PatternPage  />}/>
			</Routes>
		</Context.Provider>
	);
}

export default App
