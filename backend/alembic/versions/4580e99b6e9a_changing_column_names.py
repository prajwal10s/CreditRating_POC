"""changing column names

Revision ID: 4580e99b6e9a
Revises: f0f269f707be
Create Date: 2025-03-30 20:50:32.476020

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '4580e99b6e9a'
down_revision: Union[str, None] = 'f0f269f707be'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('mortgages')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('mortgages',
    sa.Column('id', mysql.CHAR(length=36), nullable=False),
    sa.Column('creditScore', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('loanAmount', mysql.FLOAT(), nullable=False),
    sa.Column('propertValue', mysql.FLOAT(), nullable=False),
    sa.Column('annualIncome', mysql.FLOAT(), nullable=False),
    sa.Column('debtAmount', mysql.FLOAT(), nullable=False),
    sa.Column('loanType', mysql.VARCHAR(length=50), nullable=False),
    sa.Column('propertyType', mysql.VARCHAR(length=50), nullable=False),
    sa.Column('creditRating', mysql.VARCHAR(length=10), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###
