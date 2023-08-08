defmodule Enroll.Repo.Migrations.AddUniqueIndexToMemberIdOnMemberships do
  use Ecto.Migration

  def change do
    create(unique_index(:memberships, :member_id))
  end
end
