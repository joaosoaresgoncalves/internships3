import sqlite3
import pandas as pd
from sqlalchemy import create_engine

# Connection strings
sqlite_file = r"C:\Users\joaog\OneDrive\Ambiente de Trabalho\uni\mestrado\2semestre\egd\internship3\my_database.db"
pg_connection_string = "postgresql://neondb_owner:npg_hAGtSXb3l7Zs@ep-weathered-haze-a80c3gqt-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"

# Connect to SQLite
sqlite_conn = sqlite3.connect(sqlite_file)

# Get list of tables
tables = pd.read_sql_query("SELECT name FROM sqlite_master WHERE type='table'", sqlite_conn)
table_names = tables['name'].tolist()

print(f"Found {len(table_names)} tables: {', '.join(table_names)}")

# Connect to PostgreSQL
pg_engine = create_engine(pg_connection_string)

# Migrate each table
for table in table_names:
    print(f"Migrating table: {table}")
    
    # Read data from SQLite
    df = pd.read_sql_query(f"SELECT * FROM {table}", sqlite_conn)
    
    # Write to PostgreSQL
    df.to_sql(table, pg_engine, if_exists='replace', index=False)
    
    print(f"Successfully migrated {len(df)} rows from table {table}")

print("Migration completed successfully")
sqlite_conn.close() 