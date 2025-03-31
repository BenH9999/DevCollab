package routes

import (
	"net/http"
	"fmt"

	"github.com/BenH9999/DevCollab/backend/internal/handlers"
)

func SetupRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/login", handlers.Login)
	mux.HandleFunc("/api/register", handlers.Register)
	mux.HandleFunc("/api/logout", handlers.Logout)

	fmt.Println("Routes setup successfully")
	
	return mux
}