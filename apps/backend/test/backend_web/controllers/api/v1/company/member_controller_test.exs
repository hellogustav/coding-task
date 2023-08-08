defmodule Enroll.Company.MemberControllerTest do
  use Enroll.ApiCase

  import Mox

  alias Enroll.Accounts
  alias Accounts.{User, Membership}
  alias Enroll.EctoShortUUID

  describe "GET company_member_path" do
    # TODO: Should also test rendering

    @tag authenticated: :owner
    test "succeed with 200, when requester is owner",
         %{conn: conn} do
      conn
      |> get(Routes.company_member_path(conn, :index))
      |> json_response(200)
    end

    @tag authenticated: :admin
    test "succeed with 200, when requester is admin",
         %{conn: conn} do
      conn
      |> get(Routes.company_member_path(conn, :index))
      |> json_response(200)
    end

    @tag authenticated: :member
    test "errors with 403, when requester is member",
         %{conn: conn} do
      conn
      |> get(Routes.company_member_path(conn, :index))
      |> json_response(200)
    end
  end

  describe "POST company_member_path, when inviting a new user" do
    @tag authenticated: :admin
    test "creates an user, a membership, sends an email",
         %{conn: conn, membership: %{company_id: requester_company_id}} do
      params = valid_member_params(:admin)

      response =
        conn
        |> post(Routes.company_member_path(conn, :create), params)
        |> json_response(201)

      assert %User{} = Repo.get(User, response["id"])

      assert %Membership{} =
               Repo.get_by(Membership, %{
                 member_id: response["id"],
                 company_id: requester_company_id
               })
    end
  end

  describe "POST company_member_path, when inviting an existing user" do
    setup [:with_user]

    @tag authenticated: :admin
    test "creates a membership, sends an email",
         %{conn: conn, membership: %{company_id: dst_company_id}, user: user} do
      params = valid_member_params(:admin, user)

      response =
        conn
        |> post(Routes.company_member_path(conn, :create), params)
        |> json_response(201)

      assert %Membership{} =
               Repo.get_by(Membership, %{
                 member_id: response["id"],
                 company_id: dst_company_id
               })
    end

    @tag authenticated: :admin
    test "does not create membership, neither sends an email when user already a member",
         %{conn: conn, membership: %{company_id: dst_company_id}, user: user} do
      insert(:membership, member: user)

      params = valid_member_params(:admin, user)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(:unprocessable_entity)

      refute Repo.get_by(Membership, %{
               member_id: user.id,
               company_id: dst_company_id
             })
    end
  end

  describe "POST company_member_path when requester is an owner" do
    @tag authenticated: :owner
    test "can create member role", %{conn: conn} do
      params = valid_member_params(:member)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(201)
    end

    @tag authenticated: :owner
    test "can create member admin", %{conn: conn} do
      params = valid_member_params(:member)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(201)
    end

    @tag authenticated: :owner
    test "can create owner role", %{conn: conn} do
      params = valid_member_params(:owner)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(201)
    end
  end

  describe "POST company_member_path when requester is an admin" do
    @tag authenticated: :admin
    test "can create member role", %{conn: conn} do
      params = valid_member_params(:member)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(201)
    end

    @tag authenticated: :admin
    test "can create member admin", %{conn: conn} do
      params = valid_member_params(:member)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(201)
    end

    @tag authenticated: :admin
    test "cannot create owner role", %{conn: conn} do
      params = valid_member_params(:owner)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(403)
    end
  end

  describe "POST company_member_path when requester is a member" do
    @tag authenticated: :member
    test "cannot create member role", %{conn: conn} do
      params = valid_member_params(:member)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(403)
    end

    @tag authenticated: :member
    test "cannot create admin role", %{conn: conn} do
      params = valid_member_params(:admin)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(403)
    end

    @tag authenticated: :member
    test "cannot create owner role", %{conn: conn} do
      params = valid_member_params(:owner)

      conn
      |> post(Routes.company_member_path(conn, :create), params)
      |> json_response(403)
    end
  end

  describe "PUT company_member_path" do
    @tag authenticated: :owner
    test "change a user role from :member to :admin", %{conn: conn, company: company} do
      membership = insert(:membership, company: company, role: :member)
      params = %{role: :admin}

      conn
      |> patch(Routes.company_member_path(conn, :update, membership.member_id), params)
      |> json_response(200)

      assert %{role: :admin} = Repo.get(Membership, membership.id)
    end

    @tag authenticated: :owner
    test "returns 404 if membership can't be found", %{conn: conn} do
      params = %{role: :admin}

      conn
      |> patch(Routes.company_member_path(conn, :update, EctoShortUUID.generate()), params)
      |> json_response(404)
    end
  end

  describe "DELETE company_member_path" do
    @tag authenticated: :owner
    test "deletes a membership", %{conn: conn, company: company} do
      membership = insert(:membership, company: company, role: :member)

      conn
      |> delete(Routes.company_member_path(conn, :delete, membership.member_id))
      |> json_response(200)

      refute Repo.get(Membership, membership.id)
    end

    @tag authenticated: :owner
    test "returns 404 if membership can't be found", %{conn: conn} do
      params = %{role: :admin}

      conn
      |> delete(Routes.company_member_path(conn, :delete, EctoShortUUID.generate()), params)
      |> json_response(404)
    end
  end

  defp with_user(%{} = context) do
    Map.put(context, :user, insert(:user))
  end

  defp valid_member_params(role),
    do: %{
      "user" => %{"email" => Map.get(params_for(:user), :email)},
      "role" => Atom.to_string(role)
    }

  defp valid_member_params(role, user),
    do: %{"user" => %{"email" => user.email}, "role" => Atom.to_string(role)}
end
