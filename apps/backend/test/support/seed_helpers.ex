defmodule SeedHelpers do
  import Enroll.Factory

  alias Enroll.Asset
  alias Enroll.Accounts
  alias Enroll.Repo.Color
  alias Enroll.Clients

  alias Enroll.Resources.Industry
  import Enroll.Factory

  def atom_to_name(atom) do
    atom
    |> Atom.to_string()
    |> String.capitalize()
    |> String.replace("_", " ")
  end

  def name_to_email(name, email_suffix) do
    name
    |> Enum.join(".")
    |> String.replace(" ", "_")
    |> Kernel.<>(email_suffix)
    |> String.downcase()
    |> Kernel.<>("@candidate.ly")
  end

  def atom_to_password(role) do
    "#{Atom.to_string(role)}!1234"
  end

  def seed_company(company_args \\ []) do
    :company_with_settings
    |> insert(company_args)
  end

  def seed_user(company, params) do
    role = params[:role]

    first_name =
      unless params[:first_name] do
        atom_to_name(company.company_type)
      else
        params[:first_name]
      end

    last_name =
      unless params[:last_name] do
        atom_to_name(role)
      else
        params[:last_name]
      end

    email_suffix =
      unless params[:email_suffix] do
        ""
      else
        params[:email_suffix]
      end

    email =
      unless params[:email] do
        name_to_email([company.name, last_name], email_suffix)
      else
        params[:email]
      end

    user =
      Accounts.User.insert!(%{
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: atom_to_password(role)
      })

    user
  end

  def seed_company_user(company, params) do
    role =
      unless params[:role] do
        raise "A user role must be defined"
      else
        params[:role]
      end

    user = seed_user(company, params)

    membership =
      Accounts.Membership.insert!(%{
        member_id: user.id,
        company_id: company.id,
        role: role
      })

    {user, membership}
  end
end
