defmodule Enroll.AccountsFactory do
  @moduledoc """
  This is the factory for accounts context
  """

  alias Enroll.Repo
  alias Enroll.Accounts.{User, Company, Membership, Token}

  defmacro __using__(_opts) do
    quote do
      def user_factory do
        %User{
          first_name: sequence(:first_name, &"First #{&1}"),
          last_name: sequence(:last_name, &"Last #{&1}"),
          email: "testing+#{short_uuid() |> String.downcase()}@candidate.ly",
          password: "12345678",
          encrypted_password: "to_be_set_with_set_password"
        }
      end

      def inactive_user_factory do
        %User{
          first_name: sequence(:first_name, &"First #{&1}"),
          last_name: sequence(:last_name, &"Last #{&1}"),
          email: "testing+#{short_uuid() |> String.downcase()}@candidate.ly"
        }
      end

      def set_encrypted_password(%{password: password} = user) do
        hashed_password = Bcrypt.hash_pwd_salt(password)
        %{user | encrypted_password: hashed_password}
      end

      def company_factory do
        %Company{
          name: "Company #{short_uuid()}"
        }
      end

      def membership_factory do
        %Membership{
          member: build(:user),
          company: build(:company_with_settings),
          role: RoleEnum.__enum_map__()[:member]
        }
      end

      def company_with_settings_factory do
        %Company{
          name: sequence(:name, &"Company #{&1}")
        }
      end
    end
  end
end
