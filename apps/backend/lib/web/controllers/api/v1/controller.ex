defmodule Enroll.Authenticated.Controller do
  alias Enroll.Authenticated.Controller

  defmacro __using__(_) do
    quote do
      def action(conn, _), do: Controller.__action__(__MODULE__, conn)
      defoverridable action: 2
    end
  end

  def __action__(controller, %{params: params} = conn) do
    args = [conn, params, Guardian.Plug.current_resource(conn, key: :access)]
    apply(controller, Phoenix.Controller.action_name(conn), args)
  end
end
