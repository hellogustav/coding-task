defmodule Enroll.Repo.Migrations.ChangeSubTypeInGuardianTokens do
  use Ecto.Migration

  def up do
    alter table(:guardian_tokens) do
      modify(:sub, :text)
    end
  end

  def down do
    alter table(:guardian_tokens) do
      modify(:sub, :string)
    end
  end
end
