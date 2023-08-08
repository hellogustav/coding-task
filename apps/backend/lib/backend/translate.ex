defmodule Enroll.Translate do
  use Gettext, otp_app: :backend, default_locale: "en"

  @doc "Dynamically get translation"
  def dynamic(string, bindings \\ %{}) do
    Gettext.gettext(__MODULE__, string, bindings)
  end

  @doc "Get translations from the `location` domain"
  def location(nil), do: ""

  def location(string) do
    Gettext.dgettext(__MODULE__, "locations", string)
  end

  @doc "Get translations from `industries` domain"
  def industry(string) do
    Gettext.dgettext(__MODULE__, "industries", string)
  end

  # Locale Helpers

  def get_locale, do: Gettext.get_locale(__MODULE__)
  def put_locale(locale), do: Gettext.put_locale(__MODULE__, locale || "en")
end
