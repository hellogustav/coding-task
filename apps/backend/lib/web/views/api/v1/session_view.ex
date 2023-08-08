defmodule Enroll.SessionView do
  use Enroll.Web, :view
  alias Enroll.{CurrentSessionView, CurrentCompanyView}

  def render(
        "show.json",
        %{jwt: jwt, exp: exp, company: company, user: user, membership: membership} = values
      ) do
    %{
      jwt: jwt,
      exp: exp,
      role: membership.role,
      user: render_one(user, CurrentSessionView, "user.json", as: :user),
      company: CurrentCompanyView.render_company(company)
    }
  end

  def render("delete.json", %{source: %{} = source}) do
    %{
      ok: true
    }
  end

  def render("delete.json", _), do: %{ok: true}

  def render("error.json", %{reason: reason}), do: %{status: "error", error: reason}
  def render("error.json", _), do: %{status: "error", error: "Invalid Credentials"}
end
