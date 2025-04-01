package db

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

var migrationFolders = []string{
	"tables",
	"indexes",
	"constraints",
	"operations",
}

func RunMigrations() error {
	migrationsRoot := "./internal/db/migrations"

	//Process each folder in order
	for _, folder := range migrationFolders {
		folderPath := filepath.Join(migrationsRoot, folder)

		if _, err := os.Stat(folderPath); os.IsNotExist(err) {
			log.Printf("Skipping non-existent folder: %s", folderPath)
			continue
		}
		log.Printf("Running migrations for folder: %s", folderPath)

		//Get all files in the folder
		files, err := os.ReadDir(folderPath)
		if err != nil {
			return fmt.Errorf("failed to read migration folder: %w", err)
		}

		//Filter and sort SQL files
		var sqlFiles []string
		for _, file := range files {
			if !file.IsDir() && strings.HasSuffix(file.Name(), ".sql") {
				sqlFiles = append(sqlFiles, file.Name())
			}
		}
		sort.Strings(sqlFiles)

		//Execute migrations in order
		for _, fileName := range sqlFiles {
			filePath := filepath.Join(folderPath, fileName)
			log.Printf("Running migration: %s", filePath)

			content, err := os.ReadFile(filePath)
			if err != nil {
				return fmt.Errorf("failed to read migration file: %w", err)
			}

			_, err = DB.Exec(string(content))
			if err != nil {
				return fmt.Errorf("failed to execute migration %s: %w", fileName, err)
			}

			log.Printf("Migration %s executed successfully", fileName)
		}
	}

	log.Println("All migrations completed successfully")
	return nil
}