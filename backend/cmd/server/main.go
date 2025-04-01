package main

import (
	"log"
	"net/http"
	"os"

	"github.com/BenH9999/DevCollab/backend/internal/db"
	"github.com/BenH9999/DevCollab/backend/internal/routes"
)

func main() {
	err := db.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	err = db.RunMigrations()
	if err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	router, err := routes.SetupRouter()
	if err != nil {
		log.Fatalf("Failed to setup router: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting server on port %s", port)

	err = http.ListenAndServe(":"+port, router)
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}	
}