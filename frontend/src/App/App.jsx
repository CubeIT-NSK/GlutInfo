import { Route, Routes } from 'react-router-dom';
import { Context } from '../context';

import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/RegistrationPage';
import RegistrationEmailMessage from '../shared/components/Messages/Registration/RegistrationEmailMessage';
import RegistrationSuccessMessage from '../shared/components/Messages/Registration/RegistrationSuccessMessage';
import AccountErrorMessage from '../shared/components/Messages/Account/AccountErrorMessage';
import AccountEmailConfirmationMessage from '../shared/components/Messages/Account/AccountEmailConfirmationMessage';
import ErrorPage from '../pages/ErrorPage';
import SuccessPage from '../pages/FillPages/FillConsultantProfilePage/SuccessPage';
import ConsultantsListPage from '../pages/Consultants/ConsultantsListPage';
import ConsultantListProfilePage from '../pages/Consultants/ConsultantListProfilePage';


import PatientProfilePage from '../pages/Profiles/PatientProfilePage';
import FillPatientProfilePage from '../pages/FillPages/FillPatientProfilePage';
import EditPatientProfilePage from '../pages/EditPages/EditPatientProfilePage';
import DocumentsPage from '../pages/Documents';
import AppointmentPage from '../pages/AppointmentPage';

import ConsultantProfilePage from '../pages/Profiles/ConsultantProfilePage';
import FillConsultantProfilePage from '../pages/FillPages/FillConsultantProfilePage';
import EditConsultantProfilePage from '../pages/EditPages/EditConsultantProfilePage';

import WhoqolPage from '../pages/Questionnaires/WHOQOL';
import GsrsPage from '../pages/Questionnaires/GSRS';
import HadsPage from '../pages/Questionnaires/HADS';
import ScreeningPage from '../pages/Questionnaires/Screening';
import FatiquePage from '../pages/Questionnaires/FATIQUE';
import TessqPage from '../pages/Questionnaires/Tessq';

import AboutUs from '../pages/AboutUs';
import PhotoGallery from '../pages/AboutUs/PhotoGalleryPage';

import EducationalPage from '../pages/OurProjects/EducationalSchools';
import OnlinePage from '../pages/OurProjects/OnlineProjects';
import ResearchesPage from '../pages/OurProjects/Researches';
import SocialProjectsPage from '../pages/OurProjects/SocialProjects';
import SpefsPage from '../pages/OurProjects/SPEFS';

import OnlineSchoolPage from '../pages/CalendarEvents/OnlineSchool';
import PastEventsPage from '../pages/CalendarEvents/PastEvents';
import WinterSchoolPage from '../pages/CalendarEvents/WinterSchool';
import PeterSpringPage from '../pages/CalendarEvents/PeterSpring';
import EmeraldCityPage from '../pages/CalendarEvents/EmeraldCity';
import GlutenFocusPage from '../pages/CalendarEvents/GlutenFocus';
import HomaEventPage from '../pages/CalendarEvents/HomaEvent';
import AboutGluten from '../pages/CalendarEvents/AboutGluten';

import GlutenAssociatedPage from '../pages/AboutIllness/GlutenAssociated';
import CeliacPage from '../pages/AboutIllness/Celiac';

import GlutenDietPage from '../pages/AboutDiet/GlutenDiet';

import ClinicalRecommendationsPage from '../pages/InformationForSpecialists/ClinicalRecommendations';

import RestaurantsPage from '../pages/GlutenFreeDietPages/RestaurantsPage';
import ShopsWithPage from '../pages/GlutenFreeDietPages/ShopsWithPage';
import ShopsWithoutPage from '../pages/GlutenFreeDietPages/ShopsWithoutPage';

import EventsSpecialistsPage from '../pages/EventsSpecialists';

import ChatPage from '../pages/ChatPage';
import MyConsultsPage from '../pages/MyConsults';

import { Layout } from '../shared/components/Layout';


function App() {
	return (
		<Context.Provider value={{}}>
			<Routes>
				<Route path="/" element={<Layout />}>

					{/* ROUTES */}
					<Route index element={<HomePage />}/>
					<Route path="*" element={<ErrorPage  />}/>
					<Route path="success" element={<SuccessPage  />}/>

					{/* PROFILE PATIENT */}
					<Route path="consultants-list/*">
						<Route index element={<ConsultantsListPage />}/>
						<Route path="prof" element={<ConsultantListProfilePage />}/>
					</Route>

					{/* PROFILE PATIENT */}
					<Route path="profile-patient/*">
						<Route index element={<PatientProfilePage />}/>
						<Route path="fill" element={<FillPatientProfilePage />}/>
						<Route path="edit" element={<EditPatientProfilePage />}/>
						<Route path="my-consults" element={<MyConsultsPage />} />
						<Route path="make-appointment" element={<AppointmentPage />}/>
						<Route path="my-documents" element={<DocumentsPage />}/>
						<Route path="messages" element={<ChatPage  />}/>
					</Route>

					{/* REGISTRATION */}
					<Route path="registration/*">
						<Route index element={<RegistrationPage />}/>
						<Route path="email-confirmation" element={<RegistrationEmailMessage />}/>
						<Route path="confirmation-success" element={<RegistrationSuccessMessage />}/>
						<Route path="account-confirmation-error" element={<AccountErrorMessage />}/>
						<Route path="account-confirmation" element={<AccountEmailConfirmationMessage />}/>
					</Route>

					{/* PROFILE CONSULTANT */}
					<Route path="profile-consultant/*">
						<Route index element={<ConsultantProfilePage />}/>
						<Route path="fill" element={<FillConsultantProfilePage />}/>
						<Route path="edit" element={<EditConsultantProfilePage />}/>
						<Route path="my-consults" element={<MyConsultsPage />} />
						<Route path="messages" element={<ChatPage  />}/>
					</Route>

					{/* QUESTIONARIES */}
					<Route path="questionnairies/*">
					  <Route path="quality-of-life" element={<WhoqolPage />} />
					  <Route path="gastro" element={<GsrsPage />} />
					  <Route path="anxiety" element={<HadsPage />} />
					  <Route path="screening" element={<ScreeningPage />} />
					  <Route path="weakness" element={<FatiquePage />} />
					  <Route path="tesq" element={<TessqPage />} />
					</Route>

					{/* ABOUTS US */}
					<Route path="about-us/*">
						<Route index element={<AboutUs />}/>
						<Route path="photo-gallery" element={<PhotoGallery  />}/>
					</Route>

					{/*OUR PROJECTS */}
					<Route path="our-projects/*">
						<Route path="educational-projects" element={<EducationalPage  />}/>
						<Route path="online-projects" element={<OnlinePage  />}/>
						<Route path="researches-projects" element={<ResearchesPage  />}/>
						<Route path="social-projects" element={<SocialProjectsPage  />}/>
						<Route path="spefs-projects" element={<SpefsPage  />}/>
					</Route>


					{/* CALENDAR OF EVENTS */}
					<Route path="calendar-events/*">
						<Route path="online-school-patient" element={<OnlineSchoolPage />}/>
						<Route path="past-events/*">
							<Route index element={<PastEventsPage />}/>
							<Route path="winter-school" element={<WinterSchoolPage />}/>
							<Route path="peter-spring" element={<PeterSpringPage />}/>
							<Route path="emerald-city" element={<EmeraldCityPage />}/>
						</Route>
						<Route path="held-events/*">
							<Route path="gluten-focus" element={<GlutenFocusPage />}/>
							<Route path="homa-event" element={<HomaEventPage />}/>
							<Route path="about-gluten" element={<AboutGluten />}/>
						</Route>
					</Route>

					{/* ABOUT ILLNESS */}
					<Route path="about-illness">
						<Route path="gluten-associated" element={<GlutenAssociatedPage />} />
						<Route path="celiac" element={<CeliacPage />} />
					</Route>

					{/* ABOUT DIET */}
					<Route path="about-diet">
						<Route path="gluten-diet" element={<GlutenDietPage />} />
					</Route>

					{/* INFORMATION FOR SPECIALISTS */}
					<Route path="information-for-specialists">
						<Route path="clinical-recommendations" element={<ClinicalRecommendationsPage />} />
					</Route>

					{/* GLUTEN FREE DIET */}
					<Route path="gluten-free-diet">
						<Route path="restaurants" element={<RestaurantsPage />} />
						<Route path="shops-with" element={<ShopsWithPage />} />
						<Route path="shops-without" element={<ShopsWithoutPage />} />
					</Route>

					{/* EVENTS FOR SPECIALISTS */}
					<Route path="events-for-specialists" element={<EventsSpecialistsPage  />}/>

				</Route>
			</Routes>
		</Context.Provider>
	);
}

export default App;
