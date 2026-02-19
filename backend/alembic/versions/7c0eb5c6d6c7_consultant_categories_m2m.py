"""convert consultant categories to m2m

Revision ID: 7c0eb5c6d6c7
Revises: b852c106d752
Create Date: 2024-10-03 00:00:00.000000
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c0eb5c6d6c7'
down_revision = 'b852c106d752'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'consultantextended_categories',
        sa.Column('consultant_id', sa.Integer(), nullable=False),
        sa.Column('category_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['consultant_id'], ['consultantextended.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['category_id'], ['consultantcategory.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('consultant_id', 'category_id')
    )

    op.execute(
        """
        INSERT INTO consultantextended_categories (consultant_id, category_id)
        SELECT id, category_id FROM consultantextended WHERE category_id IS NOT NULL
        """
    )

    with op.batch_alter_table('consultantextended') as batch_op:
        batch_op.drop_column('category_id')


def downgrade() -> None:
    with op.batch_alter_table('consultantextended') as batch_op:
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            'consultantextended_category_id_fkey',
            'consultantcategory',
            ['category_id'],
            ['id'],
            ondelete='SET NULL'
        )

    op.execute(
        """
        UPDATE consultantextended
        SET category_id = sub.category_id
        FROM (
            SELECT consultant_id,
                   category_id,
                   ROW_NUMBER() OVER (PARTITION BY consultant_id ORDER BY category_id) AS rn
            FROM consultantextended_categories
        ) AS sub
        WHERE consultantextended.id = sub.consultant_id
          AND sub.rn = 1
        """
    )

    op.drop_table('consultantextended_categories')
