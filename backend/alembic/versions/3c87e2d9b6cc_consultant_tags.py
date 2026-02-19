"""Add tag-based linking for consultants

Revision ID: 3c87e2d9b6cc
Revises: 7c0eb5c6d6c7
Create Date: 2025-02-02 12:00:00.000000

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = '3c87e2d9b6cc'
down_revision = '7c0eb5c6d6c7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('consultantcategory', sa.Column('tag', sa.String(length=255), nullable=True))

    op.add_column('consultantextended', sa.Column('category_tags', postgresql.ARRAY(sa.Text()), nullable=True))
    op.add_column('consultantextended', sa.Column('service_tags', postgresql.ARRAY(sa.Text()), nullable=True))
    op.add_column('consultantextended', sa.Column('review_tags', postgresql.ARRAY(sa.Text()), nullable=True))

    op.add_column('consultantservice', sa.Column('tag', sa.String(length=255), nullable=True))
    op.alter_column('consultantservice', 'consultant_id', existing_type=sa.INTEGER(), nullable=True)

    op.add_column('consultantreview', sa.Column('tag', sa.String(length=255), nullable=True))
    op.alter_column('consultantreview', 'consultant_id', existing_type=sa.INTEGER(), nullable=True)

    op.drop_table('consultantextended_categories')


def downgrade() -> None:
    op.create_table(
        'consultantextended_categories',
        sa.Column('consultant_id', sa.INTEGER(), nullable=False),
        sa.Column('category_id', sa.INTEGER(), nullable=False),
        sa.ForeignKeyConstraint(['category_id'], ['consultantcategory.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['consultant_id'], ['consultantextended.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('consultant_id', 'category_id')
    )

    op.alter_column('consultantreview', 'consultant_id', existing_type=sa.INTEGER(), nullable=False)
    op.drop_column('consultantreview', 'tag')

    op.alter_column('consultantservice', 'consultant_id', existing_type=sa.INTEGER(), nullable=False)
    op.drop_column('consultantservice', 'tag')

    op.drop_column('consultantextended', 'review_tags')
    op.drop_column('consultantextended', 'service_tags')
    op.drop_column('consultantextended', 'category_tags')

    op.drop_column('consultantcategory', 'tag')
