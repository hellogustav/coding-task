defmodule Enroll.Accounts.Policy do
  @moduledoc """
  Accounts context's authorization rules

  Controls which user's role can do on another member.

  Actions are:

    * list members
    * invite members
    * update members
    * delete members

  # Policy

    * Owners and Admins only can see members
    * Owners can invite, update, delete any roles.
    * Admins can invite, update, delete other admins and members (not
      owners)
    * members has no rights.

  """

  @behaviour Bodyguard.Policy

  require Logger

  @all_roles [:member, :admin, :owner, "member", "admin", "owner"]
  @admins_roles @all_roles -- [:owner, "owner"]

  def authorize(:list_members, _, %{role: session_role})
      when session_role in @all_roles,
      do: :ok

  def authorize(:invite_member, _role, %{role: :owner}), do: :ok

  def authorize(:invite_member, role, %{role: :admin})
      when role in @admins_roles,
      do: :ok

  # NOTE Should we allow owner to change another owner's (or self's) role?
  def authorize(:update_member, {_from, _to}, %{role: :owner}), do: :ok

  def authorize(:update_member, {from, to}, %{role: :admin})
      when from in @admins_roles and
             to in @admins_roles,
      do: :ok

  def authorize(:remove_member, _role, %{role: :owner}), do: :ok

  def authorize(:remove_member, role, %{role: :admin})
      when role in @admins_roles,
      do: :ok

  def authorize(_, _, _), do: false
end
