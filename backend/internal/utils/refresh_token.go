package utils

import (
	"crypto/rand"
	"encoding/hex"
	"time"

	"github.com/BenH9999/DevCollab/backend/internal/db"
)

// GenerateRefreshToken creates a new refresh token for a user
func GenerateRefreshToken(userID int) (string, error) {
	// Generate a random token
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	token := hex.EncodeToString(bytes)

	// Set expiration (e.g., 30 days)
	expiresAt := time.Now().Add(30 * 24 * time.Hour)

	// Store in database using a SQL function if it exists, otherwise use raw SQL
	_, err := db.DB.Exec(
		"INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
		userID, token, expiresAt)
	if err != nil {
		return "", err
	}

	return token, nil
}

// ValidateRefreshToken checks if a refresh token is valid and returns the user ID
func ValidateRefreshToken(token string) (int, error) {
	var userID int

	// Check if token exists, is not expired, and is not revoked
	err := db.DB.QueryRow(
		"SELECT user_id FROM refresh_tokens WHERE token = $1 AND expires_at > NOW() AND revoked = false",
		token).Scan(&userID)
	if err != nil {
		return 0, err
	}

	return userID, nil
}

// RevokeRefreshToken invalidates a refresh token
func RevokeRefreshToken(token string) error {
	_, err := db.DB.Exec(
		"UPDATE refresh_tokens SET revoked = true WHERE token = $1",
		token)
	return err
}

// RevokeAllUserRefreshTokens invalidates all refresh tokens for a user
func RevokeAllUserRefreshTokens(userID int) error {
	_, err := db.DB.Exec(
		"UPDATE refresh_tokens SET revoked = true WHERE user_id = $1",
		userID)
	return err
}
