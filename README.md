# Hangman Game

This is a simple Hangman game implemented in Go with a web interface.

## Getting Started

### Prerequisites

- Go 1.23.0 or later
- Node.js and npm (for managing frontend dependencies)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/bhbdev/hangman.git
    cd hangman
    ```

2. Install Go dependencies:
    ```sh
    go mod tidy
    ```

3. Install frontend dependencies (if any):
    ```sh
    npm install
    ```

### Running the Application

To start the application, run the following command:
```sh
go run main.go --server.address localhost:8080