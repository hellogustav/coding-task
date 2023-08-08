defmodule Enroll.CurrentSessionView do
  use Enroll.Web, :view

  alias Enroll.{SessionView, CurrentCompanyView}

  def render(
        "show.json",
        %{
          company: company,
          user: user,
          role: role
        } = params
      ) do
    %{
      role: role,
      user: render("user.json", %{user: user}),
      company: CurrentCompanyView.render_company(company)
    }
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      inserted_at: user.inserted_at
    }
  end
end
