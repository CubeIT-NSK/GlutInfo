"""Chats

Revision ID: a9f6d0b1a3dd
Revises: 
Create Date: 2024-10-21 03:22:30.566406

"""
from typing import Sequence, Union

from alembic import op
import fastapi_storages
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a9f6d0b1a3dd'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chats',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cooperations',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('phone', sa.String(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('documents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('events',
    sa.Column('title', sa.Text(), nullable=True),
    sa.Column('date_event', sa.Date(), nullable=True),
    sa.Column('finished', sa.Boolean(), nullable=False),
    sa.Column('main_image', fastapi_storages.integrations.sqlalchemy.ImageType(storage=fastapi_storages.FileSystemStorage(path='')), nullable=False),
    sa.Column('link', sa.String(), nullable=True),
    sa.Column('event_format', sa.String(), nullable=True),
    sa.Column('place', sa.String(), nullable=False),
    sa.Column('text', sa.Text(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('histories',
    sa.Column('text', sa.Text(), nullable=True),
    sa.Column('name', sa.String(length=15), nullable=True),
    sa.Column('surname', sa.String(length=15), nullable=True),
    sa.Column('diagnosis', sa.Text(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('newsletters',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('organizators',
    sa.Column('fio', sa.String(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photogallery',
    sa.Column('image', fastapi_storages.integrations.sqlalchemy.ImageType(storage=fastapi_storages.FileSystemStorage(path='')), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('places',
    sa.Column('place_type', sa.Enum('Ресторан/Кафе', 'Магазин где представлена Б.П.', 'Магазин с Б.П.', name='placetype', create_constraint=True), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('rating', sa.Enum('0', '1', '2', '3', '4', '5', name='placeratingstatus', create_constraint=True), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('phone', sa.String(), nullable=True),
    sa.Column('website', sa.String(), nullable=True),
    sa.Column('image', fastapi_storages.integrations.sqlalchemy.ImageType(storage=fastapi_storages.FileSystemStorage(path='')), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('projects',
    sa.Column('title', sa.Text(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('surveys',
    sa.Column('title', sa.Text(), nullable=False),
    sa.Column('text', sa.Text(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('name', sa.String(length=15), nullable=True),
    sa.Column('surname', sa.String(length=15), nullable=True),
    sa.Column('patronymic', sa.String(length=15), nullable=True),
    sa.Column('born_date', sa.Date(), nullable=True),
    sa.Column('sex', sa.Enum('male', 'female', name='sexstatus', create_constraint=True), nullable=True),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('role', sa.Enum('patient', 'consultant', name='rolestatus', create_constraint=True), nullable=False),
    sa.Column('email', sa.String(length=320), nullable=False),
    sa.Column('hashed_password', sa.String(length=1024), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=False),
    sa.Column('is_verified', sa.Boolean(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_table('chatparticipant',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('chat_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['chat_id'], ['chats.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'chat_id', 'id')
    )
    op.create_table('consultants',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('speciality', sa.Text(), nullable=False),
    sa.Column('experience', sa.Text(), nullable=False),
    sa.Column('grade', sa.Integer(), nullable=False),
    sa.Column('institution', sa.Text(), nullable=False),
    sa.Column('current_work', sa.Text(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('eventorganizators',
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('organizator_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['organizator_id'], ['organizators.id'], ),
    sa.PrimaryKeyConstraint('event_id', 'organizator_id', 'id')
    )
    op.create_table('messages',
    sa.Column('chat_id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('message_date', sa.Date(), nullable=True),
    sa.Column('text', sa.Text(), nullable=False),
    sa.Column('read_status', sa.Boolean(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['chat_id'], ['chats.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patients',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('address', sa.Text(), nullable=False),
    sa.Column('education', sa.Text(), nullable=False),
    sa.Column('working', sa.Boolean(), nullable=False),
    sa.Column('position', sa.Text(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('projectsdocuments',
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.Column('document_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['document_id'], ['documents.id'], ),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('projectsorganizators',
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.Column('organizator_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['organizator_id'], ['organizators.id'], ),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('questions',
    sa.Column('survey_id', sa.Integer(), nullable=False),
    sa.Column('text', sa.Text(), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.Column('q_type', sa.String(length=50), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['survey_id'], ['surveys.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('readstatus',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('last_read_message_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('chat_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['chat_id'], ['chats.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('answeroptions',
    sa.Column('text', sa.Text(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patientsresponses',
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('surveys_id', sa.Integer(), nullable=False),
    sa.Column('pub_date', sa.Date(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.ForeignKeyConstraint(['surveys_id'], ['surveys.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('rating', sa.Enum('0', '1', '2', '3', '4', '5', name='ratingstatus', create_constraint=True), nullable=True),
    sa.Column('name', sa.String(length=15), nullable=True),
    sa.Column('surname', sa.String(length=15), nullable=True),
    sa.Column('review_event', sa.Date(), nullable=True),
    sa.Column('consultant', sa.Integer(), nullable=False),
    sa.Column('text', sa.Text(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['consultant'], ['consultants.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('services',
    sa.Column('name', sa.Text(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('consultant_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['consultant_id'], ['consultants.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('records',
    sa.Column('pub_date', sa.Date(), nullable=False),
    sa.Column('consultants_id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('service_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['consultants_id'], ['consultants.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], ),
    sa.ForeignKeyConstraint(['service_id'], ['services.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('responses',
    sa.Column('answer_id', sa.Integer(), nullable=False),
    sa.Column('patientresponses_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['answer_id'], ['answeroptions.id'], ),
    sa.ForeignKeyConstraint(['patientresponses_id'], ['patientsresponses.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('responses')
    op.drop_table('records')
    op.drop_table('services')
    op.drop_table('reviews')
    op.drop_table('patientsresponses')
    op.drop_table('answeroptions')
    op.drop_table('readstatus')
    op.drop_table('questions')
    op.drop_table('projectsorganizators')
    op.drop_table('projectsdocuments')
    op.drop_table('patients')
    op.drop_table('messages')
    op.drop_table('eventorganizators')
    op.drop_table('consultants')
    op.drop_table('chatparticipant')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('surveys')
    op.drop_table('projects')
    op.drop_table('places')
    op.drop_table('photogallery')
    op.drop_table('organizators')
    op.drop_table('newsletters')
    op.drop_table('histories')
    op.drop_table('events')
    op.drop_table('documents')
    op.drop_table('cooperations')
    op.drop_table('chats')
    # ### end Alembic commands ###