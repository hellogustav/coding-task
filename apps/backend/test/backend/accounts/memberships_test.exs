defmodule Enroll.Accounts.MembershipsTest do
  use Enroll.ModelCase

  alias Enroll.Accounts.{Membership, Memberships}

  describe "get_first_user_membership/2" do
    test "when user belongs to a company, return their membership" do
      user = insert(:user)
      %{id: membership_id} = insert(:membership, member: user)
      assert {:ok, %Membership{id: ^membership_id}} = Memberships.get_first_user_membership(user)
    end

    test "allow filtering by company_id" do
      user = insert(:user)
      insert(:membership, member: user)

      assert Memberships.get_first_user_membership(user,
               filters: %{company_id: Enroll.EctoShortUUID.generate()}
             ) == {:error, {:membership, :not_found}}
    end

    test "when user doesn't have any memberships, return error tuple" do
      user = insert(:user)

      assert {:error, {:membership, :not_found}} = Memberships.get_first_user_membership(user)
    end
  end
end
