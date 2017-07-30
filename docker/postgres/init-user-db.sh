#!/bin/bash

psql -c "CREATE DATABASE origami" -U postgres
psql -c "CREATE USER origamiuser WITH PASSWORD 'pass'" -U postgres
psql -c "ALTER ROLE origamiuser SET client_encoding TO 'utf8'" -U postgres
psql -c "ALTER ROLE origamiuser SET default_transaction_isolation TO 'read committed'" -U postgres
psql -c "ALTER ROLE origamiuser SET timezone TO 'UTC'" -U postgres
psql -c "ALTER USER origamiuser CREATEDB" -U postgres
