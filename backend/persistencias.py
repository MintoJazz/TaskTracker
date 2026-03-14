from psycopg2 import sql

class DAO:

    def __init__(self, table):
        self.table = table

    def select_all(self, connection):

        with connection.cursor() as cursor:
            cursor.execute(sql.SQL("SELECT * FROM {table}").format(
                table=sql.Identifier(self.table)
            ))
        
            return cursor.fetchall()