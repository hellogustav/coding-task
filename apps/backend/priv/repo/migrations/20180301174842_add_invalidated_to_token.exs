defmodule Enroll.Repo.Migrations.AddInvalidatedToToken do
  use Ecto.Migration

  def change do
    alter table(:tokens) do
      add(:invalidated, :boolean, null: false, default: false)
    end
  end
end
