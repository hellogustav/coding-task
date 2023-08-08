defmodule Enroll.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use Enroll.Web, :controller
      use Enroll.Web, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def model do
    quote do
      use Ecto.Schema
      use Ecto.Rut, repo: Enroll.Repo
      @foreign_key_type Enroll.EctoShortUUID
      @primary_key {:id, Enroll.EctoShortUUID, autogenerate: true}

      import Ecto
      import Ecto.Changeset
      import Ecto.Query, only: [from: 1, from: 2]

      alias Enroll.Repo
    end
  end

  def context do
    quote do
      use Ecto.Schema

      import Ecto
      import Ecto.Query
      import Ecto.Changeset

      alias Enroll.Repo
      alias Ecto.Multi
    end
  end

  def controller do
    quote do
      use Phoenix.Controller

      alias Enroll.Repo
      alias Enroll.Router.Helpers, as: Routes

      import Ecto
      import Ecto.Query, only: [from: 1, from: 2, first: 1]
      import Bodyguard
      import Plug.Conn
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "lib/web/templates"

      alias Enroll.Router.Helpers, as: Routes

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import Enroll.Translate
    end
  end

  def router do
    quote do
      use Phoenix.Router
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
