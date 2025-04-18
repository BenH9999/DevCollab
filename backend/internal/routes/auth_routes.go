package routes

import (
	"net/http"

	"github.com/BenH9999/DevCollab/backend/internal/handlers"
)

func registerAuthRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/auth/login", handlers.Login)
	mux.HandleFunc("/api/auth/register", handlers.Register)
	mux.HandleFunc("/api/auth/refresh", handlers.RefreshToken)
	mux.HandleFunc("/api/auth/logout", handlers.Logout)
}
