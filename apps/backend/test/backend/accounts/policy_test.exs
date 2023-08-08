defmodule Enroll.Accounts.PolicyTest do
  @moduledoc """
  This module tests the authorization policies of Accounts
  """

  use Enroll.ModelCase, async: true

  alias Enroll.Accounts

  @owner_session %{role: :owner}
  @admin_session %{role: :admin}
  @member_session %{role: :member}

  @all_roles [:member, :admin, :owner, "member", "admin", "owner"]
  @admins_roles @all_roles -- [:owner, "owner"]

  describe "authorize/3 :list_members" do
    test "owner can list members" do
      assert_permit(@owner_session, :list_members, %{})
    end

    test "admin can list members" do
      assert_permit(@admin_session, :list_members, %{})
    end

    test "member cannot list members" do
      refute_permit(@member_session, :list_members, %{})
    end
  end

  describe "authorize/3 :invite_member" do
    test "owner can invite any role" do
      assert_permit(@owner_session, :invite_member, @all_roles)
    end

    test "admin can invite :member and :admin" do
      assert_permit(@admin_session, :invite_member, @admins_roles)
    end

    test "admin cannot invite :owner" do
      refute_permit(@admin_session, :invite_member, @all_roles -- @admins_roles)
    end

    test "member cannot invite anyone" do
      refute_permit(@member_session, :invite_member, @all_roles)
    end
  end

  describe "authorize/3 :update_member" do
    test "owner can update any roles to any roles" do
      possible_updates = gen_permutations(@all_roles, @all_roles)

      assert_permit(@owner_session, :update_member, possible_updates)
    end

    test "owner can update any roles other than owners, to any roles other than owners" do
      possible_updates = gen_permutations(@admins_roles, @admins_roles)
      assert_permit(@admin_session, :update_member, possible_updates)
    end

    test "owner cannot update any owner roles" do
      impossible_updates = gen_permutations([:owner, "owner"], @admins_roles)
      refute_permit(@admin_session, :update_member, impossible_updates)
    end

    test "owner cannot set any roles to owner" do
      impossible_updates = gen_permutations(@admins_roles, [:owner, "owner"])
      refute_permit(@admin_session, :update_member, impossible_updates)
    end

    test "member cannot update anyone" do
      impossible_updates = gen_permutations(@all_roles, @all_roles)
      refute_permit(@member_session, :update_member, impossible_updates)
    end
  end

  describe "authorize/3, :remove_membership" do
    test "owner can delete any roles" do
      assert_permit(@owner_session, :remove_member, @all_roles)
    end

    test "admins can delete members and admins" do
      assert_permit(@admin_session, :remove_member, @admins_roles)
    end

    test "admins cannot delete owners" do
      refute_permit(@admin_session, :remove_member, @all_roles -- @admins_roles)
    end

    test "members cannot delete anyone" do
      refute_permit(@member_session, :remove_member, @all_roles)
    end
  end

  defp gen_permutations(from_roles, to_roles) do
    for from <- from_roles, to <- to_roles, do: {from, to}
  end

  defp assert_permit(session, action, roles_or_transitions) do
    Enum.each(roles_or_transitions, fn resource ->
      result = Bodyguard.permit(Accounts, action, resource, session)
      assert :ok = result
    end)
  end

  defp refute_permit(session, action, roles_or_transitions) do
    Enum.each(roles_or_transitions, fn resource ->
      result = Bodyguard.permit(Accounts, action, resource, session)
      assert {:error, :unauthorized} == result
    end)
  end
end
