defmodule Enroll.Company.MemberView do
  @moduledoc false
  use Enroll.Web, :view

  def render("created.json", %{member: member}) do
    %{id: member.id}
  end

  def render("index.json", %{members: members, total_counter: total_counter, paginate: paginate}) do
    %{
      data: render("index.json", %{members: members, total_counter: total_counter}),
      paginate: paginate
    }
  end

  def render("index.json", %{users: users, paginate: paginate}) do
    %{
      data: render_many(users, __MODULE__, "user.json", as: :user),
      paginate: paginate
    }
  end

  def render("index.json", %{members: []}), do: %{}

  def render("index.json", %{members: members, total_counter: total_counter}) do
    %{
      members: render_many(members, __MODULE__, "member.json", as: :member),
      total_counter: total_counter
    }
  end

  def render("index.json", %{members: members}) do
    %{members: render_many(members, __MODULE__, "member.json", as: :member)}
  end

  def render("member.json", %{member: member}) do
    %{
      id: member.id,
      email: member.email,
      first_name: member.first_name,
      last_name: member.last_name,
      role: member.role,
      invite_pending: member.invite_pending
    }
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      name: "#{user.first_name} #{user.last_name}"
    }
  end

  def render("error.json", %{reason: reason}) do
    %{title: "Invite failed", code: 400, message: reason}
  end
end
