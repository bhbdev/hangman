package page

import (
	"context"
	"fmt"
	"html/template"
	"io"
	"log/slog"

	"github.com/bhbdev/hangman/modules/middleware"
)

type Page struct {
	Data map[string]interface{}
	errs map[string]string
	tpl  *template.Template
	wrap bool
}

func New(ctx context.Context) *Page {
	p := &Page{
		Data: make(map[string]interface{}),
		errs: make(map[string]string),
	}

	p.wrap = true // default

	p.tpl = ctx.Value(middleware.ContextTemplate).(*template.Template)

	return p
}

func (p *Page) AddError(key, err string) {
	p.errs[key] = err
}

func (p *Page) HasErrors() bool {
	return len(p.errs) > 0
}

func (p *Page) SetAutoWrap(wrap bool) {
	p.wrap = wrap
}

func (p *Page) Render(w io.Writer, templateName string) {
	p.Data["Errors"] = p.errs
	p.Data["RenderedTemplate"] = templateName

	render := make([]string, 1, 3)
	render[0] = templateName

	if p.wrap {
		render[0] = "page/header"
		render = append(render, templateName, "page/footer")
	}

	for _, name := range render {
		slog.Debug("rendering template", "name", name)
		if err := p.tpl.ExecuteTemplate(w, name, p.Data); err != nil {
			fmt.Fprintf(w, "Error during execution: %v", err)
			slog.Error("template execution failed", "error", err)
		}
	}
}
