from typing import Optional
from sqlalchemy import String, Date, Text, Boolean, Integer, ForeignKey
from sqlalchemy.orm import (
    Mapped, 
    DeclarativeBase, 
    mapped_column,
    relationship, 
    declared_attr,
    
    )
class Base(DeclarativeBase): 

    @declared_attr
    def __tablename__(cls):
        return cls.__name__

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

# classes for Survey
class Surveys(Base):
    title: Mapped[str] = mapped_column(Text)
    text: Mapped[str]  = mapped_column(Text)

    questions = relationship("Questions", back_populates="survey")

class Questions(Base):
    survey_id: Mapped[str] = mapped_column("Survey_id", Integer, ForeignKey("Surveys.id"))
    text: Mapped[str] = mapped_column("Text", Text)
    order: Mapped[str] = mapped_column("Order")
    q_type: Mapped[str] = mapped_column("Type")

    survey = relationship("Surveys", back_populates="questions")

class AnswerOptions(Base):
    text: Mapped[str] = mapped_column("Text")
    question_id: Mapped[int] = mapped_column("Question_id", Integer,  ForeignKey("Questions.id"))


class Responses(Base):
    answer_id: Mapped[int] = mapped_column("Answer_id", Integer, ForeignKey("AnswerOptions.id"))
    patientresponses_id: Mapped[int] = mapped_column("PatientResponses_id", Integer, ForeignKey("PatientsResponses.id"))


class PatientsResponses(Base):
    patient_id: Mapped[int] = mapped_column("Patient_id", Integer, ForeignKey("Patients.id"))
    surveys_id: Mapped[int] = mapped_column("Surveys_id", Integer, ForeignKey("Surveys.id"))
    date: Mapped[str] = mapped_column("Date", Date)


class Patients(Base):
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("Users.id"))
    address: Mapped[str] = mapped_column("Address", Text)
    education: Mapped[str] = mapped_column("Education", Text)
    working: Mapped[bool] = mapped_column("Working", Boolean )
    position: Mapped[str] = mapped_column("Position", Text)
    image: Mapped[str] = mapped_column("Image",)

    user: Mapped["Users"] = relationship(back_populates="patients")


# classes for Users and others
class Users(Base):
    name: Mapped[str] = mapped_column("Name", String)
    surname: Mapped[str] = mapped_column("Surname", String)
    patronymic: Mapped[str] = mapped_column("Patronymic", Text)
    born_date: Mapped[str] = mapped_column("Born Date", Text)
    sex: Mapped[str] = mapped_column("Sex", String)
    phone: Mapped[str] = mapped_column("Phone", Text)
    email: Mapped[str] = mapped_column("Email", Text)
    verified: Mapped[str] = mapped_column("Verified", Text)
    
    patients: Mapped["Patients"] = relationship(back_populates="user")
    consultants: Mapped["Consultants"] = relationship(back_populates="user")

class Consultants(Base):
    user_id: Mapped[int] = mapped_column("User", Integer, ForeignKey("Users.id"))
    speciality: Mapped[list] = mapped_column("Speciality", Text)
    experience : Mapped[str]= mapped_column("Experience", Text)
    grade: Mapped[str] = mapped_column("grade", Text)
    institution: Mapped[str] = mapped_column("Institution", Text)
    current_work: Mapped[str] = mapped_column("Сurrent work", Text)

    user: Mapped["Users"] = relationship(back_populates="consultants")


class Records(Base):
    date: Mapped[str] = mapped_column("Date", Date)
    consultants_id: Mapped[int] = mapped_column("Consultant", Integer, ForeignKey('Consultants.id'))
    patient_id: Mapped[int] = mapped_column("Patient", Integer, )
    service_id: Mapped[int] = mapped_column("Service", Integer, ForeignKey("Services.id"))

    consultants = relationship("Consultants", foreign_keys=[consultants_id])
    service = relationship("Services", foreign_keys=[service_id])


class Services(Base):
    name: Mapped[str] = mapped_column("Name", Text)
    price: Mapped[int] = mapped_column("Price", Integer)
    description: Mapped[Optional[str]] = mapped_column("Description", Text)
    consultant_id: Mapped[int] = mapped_column("Consultant_id", Integer, ForeignKey("Consultants.id"))

# Chat's classes
class Chats(Base):
    pass

class Messages(Base):
    chat_id: Mapped[int] = mapped_column("Chat_id", Integer, ForeignKey("Chats.id"))
    sender_id: Mapped[int] = mapped_column("Sender_id", Integer, ForeignKey("Users.id"))



    