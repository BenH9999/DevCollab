package routes

import (
	"net/http"
	"fmt"

	_"github.com/BenH9999/DevCollab/backend/internal/handlers"
)

func SetupRouter() (http.Handler, error) {
	mux := http.NewServeMux()

	registerAuthRoutes(mux)

	fmt.Println("Routes setup successfully")
	
	return mux, nil
}