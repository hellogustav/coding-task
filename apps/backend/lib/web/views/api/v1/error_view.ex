defmodule Enroll.API.V1.ErrorView do
  use Enroll.Web, :view

  def render("401.json", _assigns) do
    %{title: "Unauthorized", code: 401}
  end

  def render("403.json", _assigns) do
    %{title: "Forbidden", code: 403}
  end

  def render("404.json", _assigns) do
    %{title: "Not Found", code: 404}
  end

  def render("500.json", _assigns) do
    %{title: "Internal Server Error", code: 500}
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render("500.html", assigns)
  end
end
