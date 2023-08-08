IO.puts("~~~~~~~~~~~ Running test_helper.exs ~~~~~~~~~~~")

Faker.start()

{:ok, _} = Application.ensure_all_started(:ex_machina)

ExUnit.configure(assert_receive_timeout: 1000)

ExUnit.start()
