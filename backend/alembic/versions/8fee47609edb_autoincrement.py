"""Autoincrement

Revision ID: 8fee47609edb
Revises: a9f6d0b1a3dd
Create Date: 2024-10-22 00:20:41.467045

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8fee47609edb'
down_revision: Union[str, None] = 'a9f6d0b1a3dd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###