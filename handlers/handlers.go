package handlers

import (
	"embed"
	"net/http"
)

type Mux interface {
	Handle(pattern string, handler http.Handler)
	HandleFunc(pattern string, handler http.HandlerFunc)
}

func Apply(mux Mux) {
	//mux.HandleFunc("/", index)
	mux.HandleFunc("/", play)
	mux.HandleFunc("/play", play)
}

func Assets(mux Mux, path string) {
	mux.Handle("GET /assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir(path))))
}

func AssetsFS(mux Mux, fs embed.FS) {
	mux.Handle("GET /assets/", http.StripPrefix("/assets/", http.FileServer(http.FS(fs))))
}
