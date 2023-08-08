defmodule Enroll.Accounts.Queries.MembershipBy do
  import Ecto.Query

  def by_company_id(query, company_id) do
    where(query, [m], m.company_id == ^company_id)
  end

  def by_users_ids(query, users_ids) do
    where(query, [m], m.member_id in ^users_ids)
  end
end
