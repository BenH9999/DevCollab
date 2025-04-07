package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/BenH9999/DevCollab/backend/internal/db"
	"github.com/BenH9999/DevCollab/backend/internal/middleware"
	"github.com/BenH9999/DevCollab/backend/internal/models"
)

func CreateProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]any{
			"success": false,
			"error":   "Method not allowed",
		})
		return
	}

	user, ok := middleware.GetUserFromContext(r)
	if !ok {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]any{
			"success": false,
			"error":   "Unauthorized",
		})
		return
	}

	var projectData struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}
	err := json.NewDecoder(r.Body).Decode(&projectData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]any{
			"success": false,
			"error":   "Invalid request body",
		})
		return
	}

	if projectData.Name == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]any{
			"success": false,
			"error":   "Project name is required",
		})
		return
	}

	var projectID int
	err = db.DB.QueryRow("SELECT create_project($1, $2, $3)",
		projectData.Name, projectData.Description, user.ID).Scan(&projectID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]any{
			"success": false,
			"error":   "Failed to create project",
		})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]any{
		"success": true,
		"message": "Project created successfully",
		"project": map[string]any{
			"id":          projectID,
			"name":        projectData.Name,
			"description": projectData.Description,
			"owner_id":    user.ID,
			"status":      "active",
		},
	})
}

func GetUserProjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]any{
			"success": false,
			"error":   "Method not allowed",
		})
		return
	}

	user, ok := middleware.GetUserFromContext(r)
	if !ok {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]any{
			"success": false,
			"error":   "Unauthorized",
		})
		return
	}

	// Query the database using the stored procedure
	rows, err := db.DB.Query("SELECT * FROM get_user_projects($1)", user.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]any{
			"success": false,
			"error":   "Failed to fetch projects",
		})
		return
	}
	defer rows.Close()

	// Create a slice to store projects
	var projects []models.Project

	// Iterate through the rows and scan into Project structs
	for rows.Next() {
		var project models.Project
		err := rows.Scan(
			&project.ID,
			&project.Name,
			&project.Description,
			&project.OwnerID,
			&project.Status,
			&project.Role,
			&project.CreatedAt,
			&project.UpdatedAt,
		)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]any{
				"success": false,
				"error":   "Failed to process project data",
			})
			return
		}
		projects = append(projects, project)
	}

	// Check for errors from iterating over rows
	if err = rows.Err(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]any{
			"success": false,
			"error":   "Error processing project results",
		})
		return
	}

	// Return the projects
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]any{
		"success":  true,
		"projects": projects,
	})
}
