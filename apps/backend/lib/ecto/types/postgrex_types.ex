Postgrex.Types.define(
  Enroll.PostgrexTypes,
  [] ++ Ecto.Adapters.Postgres.extensions(),
  json: Jason
)
