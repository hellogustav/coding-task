defmodule Enroll.Repo.Migrations.CreateMembership do
  use Ecto.Migration

  def change do
    create table(:memberships, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:role, :integer, null: false)

      add(:member_id, references(:users, type: :uuid, on_delete: :nothing), null: false)
      add(:company_id, references(:companies, type: :uuid, on_delete: :nothing), null: false)

      timestamps()
    end

    create(
      index(:memberships, [:member_id, :company_id], unique: true, name: :unique_company_members)
    )
  end
end
