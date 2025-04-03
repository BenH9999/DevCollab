package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/BenH9999/DevCollab/backend/internal/db"
	"github.com/BenH9999/DevCollab/backend/internal/utils"
	"github.com/BenH9999/DevCollab/backend/internal/utils/crypto"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Success      bool   `json:"success"`
	Error        string `json:"error,omitempty"`
	Token        string `json:"token,omitempty"`
	RefreshToken string `json:"refresh_token,omitempty"`
	ID           int    `json:"id,omitempty"`
	Email        string `json:"email,omitempty"`
	Name         string `json:"name,omitempty"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var loginReq LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginReq)
	if err != nil {
		json.NewEncoder(w).Encode(LoginResponse{
			Success: false,
			Error:   "Invalid request format",
		})
		return
	}

	// Validate email and password
	if loginReq.Email == "" || loginReq.Password == "" {
		json.NewEncoder(w).Encode(LoginResponse{
			Success: false,
			Error:   "Email and password are required",
		})
		return
	}

	// Find user by email using the stored procedure
	var userID int
	var hashedPassword string
	err = db.DB.QueryRow("SELECT * FROM find_user_for_auth($1)", loginReq.Email).Scan(&userID, &hashedPassword)
	if err != nil {
		log.Printf("Login error: %v", err)
		json.NewEncoder(w).Encode(LoginResponse{
			Success: false,
			Error:   "Invalid email or password",
		})
		return
	}

	// Verify password using the crypto package
	match, err := crypto.VerifyPassword(loginReq.Password, hashedPassword)
	if err != nil || !match {
		json.NewEncoder(w).Encode(LoginResponse{
			Success: false,
			Error:   "Invalid email or password",
		})
		return
	}

	// Get user details for the token
	var name, email string
	err = db.DB.QueryRow("SELECT name, email FROM find_user_by_id($1)", userID).Scan(
		&name,
		&email,
	)
	if err != nil {
		log.Printf("Error fetching user details: %v", err)
		json.NewEncoder(w).Encode(LoginResponse{
			Success: false,
			Error:   "Server error",
		})
		return
	}

	// Generate JWT token
	token, err := utils.GenerateToken(userID, email, name)
	if err != nil {
		log.Printf("Token generation error: %v", err)
		json.NewEncoder(w).Encode(LoginResponse{
			Success: false,
			Error:   "Failed to generate authentication token",
		})
		return
	}

	// Generate refresh token
	refreshToken, err := utils.GenerateRefreshToken(userID)
	if err != nil {
		log.Printf("Refresh token generation error: %v", err)
		json.NewEncoder(w).Encode(LoginResponse{
			Success: false,
			Error:   "Failed to generate refresh token",
		})
		return
	}

	// Return successful response with token and user data
	json.NewEncoder(w).Encode(LoginResponse{
		Success:      true,
		Token:        token,
		RefreshToken: refreshToken,
		ID:           userID,
		Email:        email,
		Name:         name,
	})
}

type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterResponse struct {
	Success      bool   `json:"success"`
	Error        string `json:"error,omitempty"`
	Token        string `json:"token,omitempty"`
	RefreshToken string `json:"refresh_token,omitempty"`
	ID           int    `json:"id,omitempty"`
	Email        string `json:"email,omitempty"`
	Name         string `json:"name,omitempty"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var registerReq RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&registerReq)
	if err != nil {
		json.NewEncoder(w).Encode(RegisterResponse{
			Success: false,
			Error:   "Invalid request format",
		})
		return
	}

	// Validate inputs
	if registerReq.Name == "" || registerReq.Email == "" || registerReq.Password == "" {
		json.NewEncoder(w).Encode(RegisterResponse{
			Success: false,
			Error:   "Name, email, and password are required",
		})
		return
	}

	// Hash the password using the crypto package
	hashedPassword, err := crypto.GeneratePassword(registerReq.Password)
	if err != nil {
		log.Printf("Password hashing error: %v", err)
		json.NewEncoder(w).Encode(RegisterResponse{
			Success: false,
			Error:   "Server error",
		})
		return
	}

	// Insert user using the stored procedure
	var userID int
	var name, email string
	err = db.DB.QueryRow("SELECT id, name, email FROM create_user($1, $2, $3)",
		registerReq.Name, registerReq.Email, hashedPassword).Scan(&userID, &name, &email)

	if err != nil {
		// Check for duplicate email
		if err.Error() != "" && (err.Error() == "pq: duplicate key value violates unique constraint \"users_email_key\"" ||
			err.Error() == "ERROR: duplicate key value violates unique constraint \"users_email_key\" (SQLSTATE 23505)") {
			json.NewEncoder(w).Encode(RegisterResponse{
				Success: false,
				Error:   "Email already in use",
			})
			return
		}

		log.Printf("Database error: %v", err)
		json.NewEncoder(w).Encode(RegisterResponse{
			Success: false,
			Error:   "Failed to create user",
		})
		return
	}

	// Generate JWT token
	token, err := utils.GenerateToken(userID, email, name)
	if err != nil {
		log.Printf("Token generation error: %v", err)
		json.NewEncoder(w).Encode(RegisterResponse{
			Success: false,
			Error:   "Failed to generate authentication token",
		})
		return
	}

	// Generate refresh token
	refreshToken, err := utils.GenerateRefreshToken(userID)
	if err != nil {
		log.Printf("Refresh token generation error: %v", err)
		json.NewEncoder(w).Encode(RegisterResponse{
			Success: false,
			Error:   "Failed to generate refresh token",
		})
		return
	}

	// Return successful response with token and user data
	json.NewEncoder(w).Encode(RegisterResponse{
		Success:      true,
		Token:        token,
		RefreshToken: refreshToken,
		ID:           userID,
		Email:        email,
		Name:         name,
	})
}

type RefreshRequest struct {
	RefreshToken string `json:"refresh_token"`
}

type RefreshResponse struct {
	Success bool   `json:"success"`
	Error   string `json:"error,omitempty"`
	Token   string `json:"token,omitempty"`
}

func RefreshToken(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var refreshReq RefreshRequest
	err := json.NewDecoder(r.Body).Decode(&refreshReq)
	if err != nil {
		json.NewEncoder(w).Encode(RefreshResponse{
			Success: false,
			Error:   "Invalid request format",
		})
		return
	}

	// Validate refresh token
	if refreshReq.RefreshToken == "" {
		json.NewEncoder(w).Encode(RefreshResponse{
			Success: false,
			Error:   "Refresh token is required",
		})
		return
	}

	// Validate the refresh token and get the user ID
	userID, err := utils.ValidateRefreshToken(refreshReq.RefreshToken)
	if err != nil {
		json.NewEncoder(w).Encode(RefreshResponse{
			Success: false,
			Error:   "Invalid or expired refresh token",
		})
		return
	}

	// Get user details for the token
	var name, email string
	err = db.DB.QueryRow("SELECT name, email FROM find_user_by_id($1)", userID).Scan(
		&name,
		&email,
	)
	if err != nil {
		log.Printf("Error fetching user details: %v", err)
		json.NewEncoder(w).Encode(RefreshResponse{
			Success: false,
			Error:   "Server error",
		})
		return
	}

	// Generate a new JWT token
	newToken, err := utils.GenerateToken(userID, email, name)
	if err != nil {
		log.Printf("Token generation error: %v", err)
		json.NewEncoder(w).Encode(RefreshResponse{
			Success: false,
			Error:   "Failed to generate authentication token",
		})
		return
	}

	// Return the new token
	json.NewEncoder(w).Encode(RefreshResponse{
		Success: true,
		Token:   newToken,
	})
}

func Logout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Get the refresh token from the request
	var logoutReq RefreshRequest
	err := json.NewDecoder(r.Body).Decode(&logoutReq)

	// If there's a refresh token, revoke it
	if err == nil && logoutReq.RefreshToken != "" {
		utils.RevokeRefreshToken(logoutReq.RefreshToken)
	}

	// Return success regardless of whether we revoked a token or not
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}
