defmodule Enroll.AccountsTest do
  use Enroll.ModelCase

  import Mox

  alias Enroll.{Accounts, Repo}
  alias Enroll.Accounts.{Company, User, Membership, Token, Tokens}

  @new_user_email "new@email.com"

  setup do
    company = insert(:company_with_settings)
    inviter = insert(:user, company: company)

    %{
      user: insert(:user),
      company: company,
      inviter: %{user_id: inviter.id, company_id: company.id}
    }
  end

  describe "get_company_members/2" do
    test "retrieve members", %{company: company} do
      insert_pair(:membership, company: company, role: :admin)

      {members, _, _} = Accounts.get_company_members(%{}, %{company_id: company.id})

      assert length(members) == 2
    end

    test "filter by name", %{company: company} do
      membership1 =
        insert(:membership,
          company: company,
          member: build(:user, first_name: "Lebron"),
          role: :admin
        )

      insert(:membership,
        company: company,
        member: build(:user, first_name: "Dwyane"),
        role: :admin
      )

      params = %{filters: %{name: "Lebron"}}
      {members, _, _} = Accounts.get_company_members(params, %{company_id: company.id})

      assert length(members) == 1
      assert List.first(members).id == membership1.member.id
    end
  end

  describe "get_company_members/1" do
    test "retrieve only active members", %{company: company} do
      insert(:membership, member: insert(:inactive_user), company: company)
      insert(:membership, member: insert(:user), company: company)

      {members, _} = Accounts.get_company_members(%{"company_id" => company.id})

      assert length(members) == 1
    end
  end

  describe "get_membership/1" do
    test "retrieve membership by id" do
      membership = insert(:membership)
      assert Accounts.get_membership(membership.id)
    end

    test "retrieve membership by company_id and user_id" do
      membership = insert(:membership)
      assert Accounts.get_membership({membership.company_id, membership.member_id})
    end
  end

  describe "invite_member/4" do
    test "creates a new user and associate it with the company_id", context do
      user_ids = User |> Repo.all() |> Enum.map(& &1.id)
      user_params = params_for(:user) |> Map.take([:first_name, :last_name, :email])

      assert {:ok, result} =
               Accounts.invite_member(
                 context.company.id,
                 context.inviter,
                 user_params,
                 :member,
                 nil
               )

      refute result.user.id in user_ids
    end

    test "creates a membership with existing user and company_id", context do
      user_ids = User |> Repo.all() |> Enum.map(& &1.id)
      email = context.user.email
      user_params = %{email: email}

      assert {:ok, result} =
               Accounts.invite_member(
                 context.company.id,
                 context.inviter,
                 user_params,
                 :member,
                 nil
               )

      assert result.user.id in user_ids
    end

    test "each user can only have one membership to one company", context do
      membership = insert(:membership)
      user_params = %{email: membership.member.email}

      assert {:error, :user_has_account} =
               Accounts.invite_member(
                 context.company.id,
                 context.inviter,
                 user_params,
                 :member,
                 nil
               )
    end

    test "creates signup token", context do
      user_params = params_for(:user) |> Map.take([:first_name, :last_name, :email])

      assert {:ok, result} =
               Accounts.invite_member(
                 context.company.id,
                 context.inviter,
                 user_params,
                 :member,
                 nil
               )

      assert Repo.get_by(Token, %{
               user_id: result.user.id,
               type: :signup
             })
    end
  end

  describe "update_membership/2" do
    test "update a membership by id", context do
      membership = insert(:membership, company: context.company, role: :member)

      assert {:ok, updated_membership} =
               Accounts.update_membership(membership.id, %{role: :admin})

      refute updated_membership.role == membership.role
    end

    test "update a membership by membership struct", context do
      membership = insert(:membership, company: context.company, role: :member)
      assert {:ok, updated_membership} = Accounts.update_membership(membership, %{role: :admin})
      refute updated_membership.role == membership.role
    end
  end

  describe "update_membership/3" do
    test "updates a membership by company_id and user_id", context do
      membership = insert(:membership, company: context.company, role: :member)

      assert {:ok, updated_membership} =
               Accounts.update_membership(membership.company_id, membership.member_id, %{
                 role: :admin
               })

      refute updated_membership.role == membership.role
    end
  end

  defp log_params(user_id, company_id) do
    %{
      user_id: user_id,
      company_id: company_id,
      message: "Validating what's wrong",
      user_agent: %{
        ip_address: "192.168.0.0",
        browser_version: "Chrome 83.0.4103.116",
        os_version: "macOS Catalina, 10.15.4",
        platform: "desktop",
        engine: "Blink 12.2"
      },
      location: %{
        city: "Poznań",
        country_code: "PL",
        country_name: "Poland",
        latitude: "52.41360092163086",
        longitude: "16.837390899658203",
        region_code: "WP",
        region_name: "Greater Poland",
        zip: "60-001"
      }
    }
  end
end
