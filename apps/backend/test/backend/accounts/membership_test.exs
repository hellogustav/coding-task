defmodule Enroll.Accounts.MembershipTest do
  use Enroll.ModelCase
  alias Enroll.Accounts.Membership

  describe "#changeset" do
    @valid_attrs %{
      member_id: "justSomeBogusidjacuzzi",
      company_id: "justSomeBogusidjacuzzi",
      role: :owner
    }
    @invalid_attrs %{}

    test "changeset with valid attributes" do
      changeset = Membership.changeset(%Membership{}, @valid_attrs)
      assert changeset.valid?
    end

    test "changeset with invalid attributes" do
      changeset = Membership.changeset(%Membership{}, @invalid_attrs)
      refute changeset.valid?

      changeset |> assert_error_message(:role, "can't be blank")
    end

    test "changeset ensures member and company actually exist in db" do
      attrs = %{@valid_attrs | member_id: insert(:user).id}
      changeset = Membership.changeset(%Membership{}, attrs)

      assert {:error, changeset} = Repo.insert(changeset)
      assert_error_message(changeset, :company, "does not exist")

      attrs = %{@valid_attrs | company_id: insert(:company).id}
      changeset = Membership.changeset(%Membership{}, attrs)

      assert {:error, changeset} = Repo.insert(changeset)
      assert_error_message(changeset, :member, "does not exist")
    end
  end

  describe "#create" do
    setup(do: %{company: insert(:company), user: insert(:user)})

    test "it works for resource ids", %{company: company, user: user} do
      assert {:ok, membership} = Membership.create(company.id, user.id, :none)
      assert membership.role == :none
    end

    test "it works for resources", %{company: company, user: user} do
      assert {:ok, membership} = Membership.create(company, user, :none)
      assert membership.role == :none
    end

    test "it lets you specify membership role", %{company: company, user: user} do
      assert {:ok, membership} = Membership.create(company, user, :owner)
      assert membership.role == :owner
    end
  end
end
