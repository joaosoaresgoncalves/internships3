import psycopg2

# Connection parameters
conn_string = "postgresql://neondb_owner:npg_hAGtSXb3l7Zs@ep-weathered-haze-a80c3gqt-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"

# Connect to the database
conn = psycopg2.connect(conn_string)
conn.autocommit = True
cursor = conn.cursor()

# Execute the rename operation
try:
    cursor.execute('ALTER TABLE "jobs" RENAME TO "Internships";')
    print("Table renamed successfully from 'jobs' to 'Internships'")
except Exception as e:
    print(f"Error renaming table: {e}")
finally:
    cursor.close()
    conn.close() 