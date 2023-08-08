defmodule Enroll.Repo.Enums do
  import EctoEnum

  # Preferred Locale / Language for a resource
  # Used By: User (and maybe Country in the future)
  defenum(Locale,
    en: 0,
    de: 1
  )
end
