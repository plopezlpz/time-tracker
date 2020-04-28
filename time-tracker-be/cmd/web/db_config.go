package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
)

func configureDB(dsn, migrationDir *string) *sql.DB {
	db := openDB(*dsn)
	if *migrationDir != "" {
		migrateDB(db, migrationDir)
	}
	return db
}

func migrateDB(db *sql.DB, migrationDir *string) {
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		log.Fatalf("could not start sql migration.. %v", err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		fmt.Sprintf("file://%s", *migrationDir), "postgres", driver)

	if err != nil {
		log.Fatalf("migration failed... %v", err)
	}
	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatalf("An error occurred while syncing the database.. %v", err)
	}
}

func openDB(dsn string) *sql.DB {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Couldn not connect to DB %v", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatalf("Couldn not ping DB %v", err)
	}
	return db
}
