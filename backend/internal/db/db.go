package db

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"

	"github.com/BenH9999/DevCollab/backend/internal/config"
)

var DB *sql.DB

func Connect() error {
	var err error
	var retries int = 5
	var retryDelay time.Duration = 5 * time.Second

	for i := 0; i < retries; i++ {
		log.Printf("Attempting to connect to database... (attempt %d/%d)", i+1, retries)
		
		DB, err = sql.Open("pgx", config.GetDatabaseURL())
		if err == nil {
			err = DB.Ping()
			if err == nil {
				log.Println("Database connected successfully")
				return nil
			}
		}

		log.Printf("Failed to connect to database: %v", err)

		if i < retries - 1 {
			log.Printf("Retrying in %v...", retryDelay)
			time.Sleep(retryDelay)
		}
	}

	log.Fatalf("failed to connect to database after %d attempts", retries)
	return err
}

func Close() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}