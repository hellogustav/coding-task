defmodule Enroll.ErrorView do
  use Enroll.Web, :view

  def render("error.json", %{reason: reason}) do
    %{status: "error", error: reason}
  end

  def render("error.json", %{not_found: scope}) do
    %{status: "error", error: :not_found, message: Atom.to_string(scope) <> " not found"}
  end

  def render("error.json", %{error_key: error_key, details: details}) do
    %{status: "error", error: error_key, details: details}
  end

  def render("error.json", %{error_key: error_key, redirect_url: redirect_url}) do
    %{status: "error", error: error_key, redirect_url: redirect_url}
  end

  def render("404.html", _assigns) do
    "Page not found"
  end

  def render("403.json", _assigns) do
    %{errors: %{message: "Forbidden"}, error: "forbidden"}
  end

  def render("403.xml", _assigns) do
    %{errors: %{message: "Forbidden"}, error: "forbidden"} |> MapToXml.from_map()
  end

  def render("404.json", _assigns) do
    %{errors: %{message: "Not found"}}
  end

  def render("404.xml", _assigns) do
    %{errors: %{message: "Not found"}} |> MapToXml.from_map()
  end

  def render("500.html", _assigns) do
    "Server internal error"
  end

  def render("500.json", _assigns) do
    %{errors: %{message: "Server error"}}
  end

  def render("500.xml", _assigns) do
    %{errors: %{message: "Server error"}} |> MapToXml.from_map()
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render("500.html", assigns)
  end
end
