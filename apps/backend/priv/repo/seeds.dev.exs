{:ok, _} = Application.ensure_all_started(:ex_machina)
{:ok, _} = Application.ensure_all_started(:timex)
Faker.start()
Code.eval_file(__DIR__ <> "/seeds.samples.exs")
