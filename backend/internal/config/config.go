package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func init() {
	// Load .env file if it exists (development environment)
	err := godotenv.Load()
	if err != nil {
		// Just log the error but don't fail - we might be in Docker with env vars
		log.Printf("Warning: .env file not found, using environment variables")
	}
}

func GetDatabaseURL() string {
	if url := os.Getenv("DATABASE_URL"); url != "" {
		return url
	}

	host := getEnvWithDefault("DB_HOST", "localhost")
	port := getEnvWithDefault("DB_PORT", "5432")
	user := getEnvWithDefault("DB_USER", "postgres")
	password := getEnvWithDefault("DB_PASSWORD", "postgres")
	dbName := getEnvWithDefault("DB_NAME", "DevCollab")

	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		user, password, host, port, dbName)
}

func GetJWTSecretKey() string {
	return getEnvWithDefault("JWT_SECRET_KEY", "default_jwt_secret_key_for_development_only")
}

func getEnvWithDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
