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

import WhoqolPage from '../pages/Questionnaires/WHOQOL';
import GsrsPage from '../pages/Questionnaires/GSRS';
import HadsPage from '../pages/Questionnaires/HADS';
import ScreeningPage from '../pages/Questionnaires/Screening';
import FatiquePage from '../pages/Questionnaires/FATIQUE';


function App() {
	return (
		<Context.Provider value={{}}>
			<Routes>
				<Route path="/" element={<HomePage />}/>

				<Route path="/registration" element={<RegistrationPage />}/>
				<Route path="/fill-patient" element={<FillPatientProfilePage />}/>
				<Route path="/fill-consultant" element={<FillConsultantProfilePage />}/>
				<Route path="/success" element={<SuccessPage  />}/>

				<Route path="/profile-patient" element={<PatientProfilePage />}/>
					<Route path="/quality-of-life-questionnaire" element={<WhoqolPage />}/>
					<Route path="/gastro-questionnaire" element={<GsrsPage />}/>
					<Route path="/anxiety-questionnaire" element={<HadsPage />}/>
					<Route path="/screening-questionnaire" element={<ScreeningPage />}/>
					<Route path="/weakness-questionnaire" element={<FatiquePage />}/>

				<Route path="/profile-consultant" element={<ConsultantProfilePage />}/>
				    <Route path="edit-profile-consultant" element={<EditConsultantProfilePage />}/>


				<Route path="/404" element={<ErrorPage  />}/>
				<Route path="/pattern" element={<PatternPage  />}/>
			</Routes>
		</Context.Provider>
	);
}

export default App;
