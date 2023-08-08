defmodule Enroll.Accounts.UserTest do
  use Enroll.ModelCase

  alias Enroll.Accounts
  alias Accounts.User

  @valid_attrs %{
    encrypted_password: "some content",
    email: email_address(),
    first_name: "some content",
    last_name: "some content",
    password: "$t40ng p@$$€£łćÜü"
  }

  @invalid_attrs %{}

  describe "changeset/2" do
    test "with valid attributes" do
      changeset = User.changeset(%User{}, @valid_attrs)
      assert changeset.valid?
    end

    test "with invalid attributes" do
      changeset = User.changeset(%User{}, @invalid_attrs)
      refute changeset.valid?
    end
  end

  describe "Emails are lowercased before being persisted" do
    test "changeset with valid attributes" do
      params = Map.update!(@valid_attrs, :email, &String.upcase/1)

      changeset = User.changeset(%User{}, params)
      assert changeset.valid?
      assert changeset.changes.email == String.downcase(@valid_attrs.email)
    end

    test "invite_changeset with valid attributes" do
      params = Map.update!(@valid_attrs, :email, &String.upcase/1)

      changeset = User.changeset(%User{}, params)
      assert changeset.valid?
      assert changeset.changes.email == String.downcase(@valid_attrs.email)
    end

    test "lead_changeset with valid attributes" do
      params = Map.update!(@valid_attrs, :email, &String.upcase/1)

      changeset = User.changeset(%User{}, params)
      assert changeset.valid?
      assert changeset.changes.email == String.downcase(@valid_attrs.email)
    end
  end

  describe "#exists?" do
    test "returns true when user with given email exists" do
      %{email: email} = insert(:user)
      assert User.exists?(email)
    end

    test "returns false when user with given email does not exists" do
      refute User.exists?(email_address())
    end
  end
end
