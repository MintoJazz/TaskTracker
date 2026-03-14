import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

conn = psycopg2.connect(os.getenv("DB_URL"))

cur = conn.cursor()

cur.execute("SELECT * FROM usuario")

records = cur.fetchall()

print(records)