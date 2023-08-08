defmodule Enroll.CurrentCompanyView do
  use Enroll.Web, :view

  def render("show.json", %{company: company}) do
    render_company(company)
  end

  def render_company(company) do
    %{
      id: company.id,
      name: company.name,
      inserted_at: company.inserted_at
    }
  end
end
