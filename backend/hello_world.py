import psycopg2
from dotenv import load_dotenv
from os import getenv
from persistencias import DAO

load_dotenv()

connection = psycopg2.connect(getenv("DB_URL"))

userDAO = DAO(table='usuario')

records = userDAO.select_all(connection)

for record in records: print(f'{record[0]} - Nome: {record[2]}')