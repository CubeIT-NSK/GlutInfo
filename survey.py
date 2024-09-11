from sqlalchemy import Text, Integer, ForeignKey
from sqlalchemy.orm import (
    Mapped, 
    DeclarativeBase, 
    mapped_column, 
    declared_attr,
    )

class Base(DeclarativeBase): 

    @declared_attr
    def __tablename__(cls):
        return cls.__name__

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

class Surveys(Base):
    title: Mapped[str] = mapped_column(Text)
    text: Mapped[str]  = mapped_column(Text)


class Questions(Base):
    survey_id: Mapped[str] = mapped_column("Survey_id", Integer, ForeignKey("Surveys.id"))
    text: Mapped[str] = mapped_column("Text", Text)
    order: Mapped[str] = mapped_column("Order")
    q_type: Mapped[str] = mapped_column("Type")


class AnswerOptions(Base):
    text: Mapped[str] = mapped_column("Text")
    question_id: Mapped[int] = mapped_column("Question_id", Integer,  ForeignKey("Questions.id"))


class Responses(Base):
    answer_id: Mapped[str] = mapped_column("Answer_id", Integer, ForeignKey("AnswerOptions.id"))
    patientresponses_id: Mapped[str] = mapped_column("PatientResponses_id", Integer, ForeignKey("PatientsResponses.id"))


class PatientsResponses(Base):
    patient_id: Mapped[int] = mapped_column("Patient_id", Integer, ForeignKey("Patients.id"))
    surveys_id: Mapped[int] = mapped_column("Surveys_id", Integer, ForeignKey("Surveys.id"))
    date: Mapped[str] = mapped_column("Date", Text)


class Patients(Base):
    """"""

class User(Base):
    """"""


class Consultants(Base):
    user: Mapped[str] = mapped_column("User", Text, ForeignKey("User.id"))
    speciality: Mapped[str] = mapped_column("Speciality", Text)
    experience : Mapped[str]= mapped_column("Experience", Text)
    grade: Mapped[str] = mapped_column()
    institution: Mapped[str] = mapped_column("Institution", Text)
    grade: Mapped[str] = mapped_column()


class Records(Base):
    date: Mapped[str] = mapped_column("Date",)
    consultants: Mapped[str] = mapped_column("Consultant", Text, ForeignKey('Consultants.id'))
    fio: Mapped[str] = mapped_column("FIO", Text)
    phone: Mapped[str] = mapped_column("Phone")
    price: Mapped[str] = mapped_column("Price", Integer )


