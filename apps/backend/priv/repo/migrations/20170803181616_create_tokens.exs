defmodule Enroll.Repo.Migrations.CreateTokens do
  use Ecto.Migration

  def change do
    create table(:tokens, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:token, :string, null: false)
      add(:type, :integer, null: false)
      add(:expires_at, :naive_datetime)
      add(:consumed, :boolean, null: false)
      add(:metadata, :map)

      add(:user_id, references(:users, type: :uuid))

      timestamps()
    end
  end
end
