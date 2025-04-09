package routes

import (
	"net/http"

	"github.com/BenH9999/DevCollab/backend/internal/handlers"
	"github.com/BenH9999/DevCollab/backend/internal/middleware"
)

func registerProjectRoutes(mux *http.ServeMux) {
	mux.Handle("/api/projects/create", middleware.AuthMiddleware(http.HandlerFunc(handlers.CreateProject)))
	mux.Handle("/api/projects/user", middleware.AuthMiddleware(http.HandlerFunc(handlers.GetUserProjects)))
}