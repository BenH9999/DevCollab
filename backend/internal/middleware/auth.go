package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/BenH9999/DevCollab/backend/internal/utils"
)

// Key for user data in request context
type contextKey string

const UserContextKey contextKey = "user"

// AuthMiddleware verifies JWT tokens in request headers
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Check for Bearer token format
		headerParts := strings.Split(authHeader, " ")
		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Get token from header
		tokenString := headerParts[1]

		// Validate token
		claims, err := utils.ValidateToken(tokenString)
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Add user claims to request context
		ctx := context.WithValue(r.Context(), UserContextKey, claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// GetUserFromContext extracts user claims from context
func GetUserFromContext(r *http.Request) (*utils.UserClaims, bool) {
	user, ok := r.Context().Value(UserContextKey).(*utils.UserClaims)
	return user, ok
}
