package main

import (
	"flag"
	"log/slog"

	"github.com/bhbdev/hangman/handlers"
	"github.com/bhbdev/hangman/modules/middleware"
	"github.com/bhbdev/hangman/modules/web"
)

func main() {
	var address string

	flag.StringVar(&address, "server.address", ":8080", "address and port to listen on")
	flag.Parse()

	slog.SetLogLoggerLevel(slog.LevelDebug)

	app := web.NewApp(address)
	handlers.Apply(app)

	handlers.Assets(app, "assets")
	app.AddMiddleware(middleware.NewLiveTemplate("templates"))
	slog.Debug("using live templates")

	app.AddMiddleware(middleware.NewContentType())
	app.AddMiddleware(middleware.NewLogger(slog.Default()))
	slog.Debug("serving requests", "address", "http://"+address)
	app.ListenAndServe()
}
