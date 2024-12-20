import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';
import PatientProfilePage from '../../pages/Profiles/PatientProfilePage';
import FillPatientProfilePage from '../../pages/FillPages/FillPatientProfilePage';
import EditPatientProfilePage from '../../pages/EditPages/EditPatientProfilePage';

import AppointmentPage from '../../pages/AppointmentPage';
import DocumentsPage from '../../pages/Documents';
import ChatPage from '../../pages/ChatPage';

import ConsultantProfilePage from '../../pages/Profiles/ConsultantProfilePage';
import FillConsultantProfilePage from '../../pages/FillPages/FillConsultantProfilePage';
import EditConsultantProfilePage from '../../pages/EditPages/EditConsultantProfilePage';
import MyConsultsPage from '../../pages/MyConsults';

import WhoqolPage from '../../pages/Questionnaires/WHOQOL';
import GsrsPage from '../../pages/Questionnaires/GSRS';
import HadsPage from '../../pages/Questionnaires/HADS';
import ScreeningPage from '../../pages/Questionnaires/Screening';
import FatiquePage from '../../pages/Questionnaires/FATIQUE';
import TessqPage from '../../pages/Questionnaires/Tessq';

const AuthenticatedRoutes = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/access-denied');
    } else if (user && user.is_verified === false) {
        navigate(`/profile-${user.role}/${user.id}/fill`);
    }
}, [isAuthenticated, user, navigate]);


  return (
    <Routes>
      {/* PROFILE PATIENT */}
      <Route path="profile-patient/:id/*">
        <Route index element={<PatientProfilePage />} />
        <Route path="fill" element={<FillPatientProfilePage />} />
        <Route path="edit" element={<EditPatientProfilePage />} />
        <Route path="my-consults" element={<MyConsultsPage />} />
        <Route path="make-appointment" element={<AppointmentPage />} />
        <Route path="my-documents" element={<DocumentsPage />} />
        <Route path="messages" element={<ChatPage />} />
      </Route>

      {/* PROFILE CONSULTANT */}
      <Route path="profile-consultant/:id/*">
        <Route index element={<ConsultantProfilePage />} />
        <Route path="fill" element={<FillConsultantProfilePage />} />
        <Route path="edit" element={<EditConsultantProfilePage />} />
        <Route path="my-consults" element={<MyConsultsPage />} />
        <Route path="messages" element={<ChatPage />} />
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
    </Routes>
  );
};

export default AuthenticatedRoutes;
