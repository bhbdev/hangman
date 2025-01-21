package handlers

import (
	"net/http"

	"github.com/bhbdev/hangman/modules/page"
)

func play(w http.ResponseWriter, r *http.Request) {
	p := page.New(r.Context())
	p.Data["Title"] = "Play"
	p.Render(w, "play")
}
