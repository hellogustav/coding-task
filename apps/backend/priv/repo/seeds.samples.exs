import Enroll.Factory
import SeedHelpers
import Ecto.Query
alias Enroll.Repo


require Logger

Logger.info("Sample seeds starting...")

# Create Companies

companies =
  [
    sub_vendor:
      SeedHelpers.seed_company(
        name: "Sub Vendor"
      ),
    prime_vendor:
      SeedHelpers.seed_company(
        name: "Prime Vendor"
      )
  ]

# Build our user data for regular company types
user_roles = [:owner, :admin, :member]

# Build a list of users for each company
company_users =
  companies
  |> Enum.map(fn {company_key, company} ->
    Logger.info("Creating users for #{company_key}")

    users =
      Enum.map(user_roles, fn role ->
        {user, _membership} =
          SeedHelpers.seed_company_user(company,
            role: role,
            first_name: SeedHelpers.atom_to_name(company_key),
            last_name: Atom.to_string(role)
          )

        {role, user}
      end)

    {company_key, users}
  end)

Logger.info("Improved seeds done")
