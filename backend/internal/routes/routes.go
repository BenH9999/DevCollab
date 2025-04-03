package routes

import (
	"fmt"
	"net/http"

	_ "github.com/BenH9999/DevCollab/backend/internal/handlers"
	"github.com/BenH9999/DevCollab/backend/internal/middleware"
)

func SetupRouter() (http.Handler, error) {
	mux := http.NewServeMux()

	registerAuthRoutes(mux)

	fmt.Println("Routes setup successfully")

	// Wrap the router with CORS middleware
	handler := middleware.CORSMiddleware(mux)

	return handler, nil
}
