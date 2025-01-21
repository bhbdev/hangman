package handlers

import (
	"net/http"

	"github.com/bhbdev/hangman/modules/page"
)

func base(w http.ResponseWriter, r *http.Request) {
	p := page.New(r.Context())

	p.Render(w, "base")
}
