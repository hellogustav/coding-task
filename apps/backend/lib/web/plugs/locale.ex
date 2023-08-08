defmodule Enroll.Web.Plugs.Locale do
  alias Enroll.Translate

  @moduledoc """
  Sets the Gettext locale for the current request (process)
  by checking the `locale` param.

  TODO:
  We might eventually consider setting the locale using
  location headers instead of URL params.
  """

  def init(opts), do: opts

  def call(%{params: params} = conn, _) do
    Translate.put_locale(params["locale"])
    conn
  end
end
