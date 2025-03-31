package main

import (
	"log"
	"net/http"
	"os"

	"github.com/BenH9999/DevCollab/backend/internal/db"
	"github.com/BenH9999/DevCollab/backend/internal/routes"
)

func main() {
	db.Connect()
	defer db.Close()

	router := routes.SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting server on port %s", port)

	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
	
}