#!/bin/bash

psql -c "CREATE DATABASE $DB_NAME" -U postgres
psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS'" -U postgres
psql -c "ALTER ROLE $DB_USER SET client_encoding TO 'utf8'" -U postgres
psql -c "ALTER ROLE $DB_USER SET default_transaction_isolation TO 'read committed'" -U postgres
psql -c "ALTER ROLE $DB_USER SET timezone TO 'UTC'" -U postgres
psql -c "ALTER USER $DB_USER CREATEDB" -U postgres
