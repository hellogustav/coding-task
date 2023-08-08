defmodule Enroll.FallbackController do
  use Enroll.Web, :controller

  def call(conn, {:error, _op, %Ecto.Changeset{} = changeset, _changes}) do
    call(conn, {:error, changeset})
  end

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(Enroll.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(Enroll.ErrorView)
    |> render(:error, reason: :not_found)
  end

  def call(conn, {:error, :forbidden}) do
    conn
    |> put_status(:forbidden)
    |> put_view(Enroll.ErrorView)
    |> render(:error, reason: :forbidden)
  end

  # NOTE This is mostly used for Bodyguard unauthorization. However
  # 401 should be used when authentication failed. Authorization fail
  # should use 403 (:forbidden)
  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:forbidden)
    |> put_view(Enroll.ErrorView)
    |> render(:error, reason: :forbidden)
  end

  def call(conn, {:error, :invalid_credentials}) do
    conn
    |> put_status(:unauthorized)
    |> put_view(Enroll.ErrorView)
    |> render(:error, reason: :invalid_credentials)
  end

  def call(conn, {:error, :invalid_token}) do
    conn
    |> put_status(:unauthorized)
    |> put_view(Enroll.ErrorView)
    |> render(:error, reason: :invalid_token)
  end

  def call(conn, {:error, {scope, :not_found}}) when is_atom(scope) do
    conn
    |> put_status(:not_found)
    |> put_view(Enroll.ErrorView)
    |> render(:error, not_found: scope)
  end

  def call(conn, {:error, {:redirect_url, error_key, redirect_url}}) do
    conn
    |> put_status(:found)
    |> put_view(Enroll.ErrorView)
    |> render(:error, error_key: error_key, redirect_url: redirect_url)
  end

  def call(conn, {:error, {_scope, status}}),
    do: call(conn, {:error, status})

  def call(conn, {:error, :invalid_platform, redirect_url}) do
    conn
    |> put_status(:unauthorized)
    |> render("show.json", redirect_url: redirect_url)
  end

  def call(conn, {:error, scope, :not_found}) when is_atom(scope) do
    conn
    |> put_status(:not_found)
    |> put_view(Enroll.ErrorView)
    |> render(:error, not_found: scope)
  end

  def call(conn, {:error, reason}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(Enroll.ErrorView)
    |> render(:error, reason: reason)
  end

  def call(conn, {:error, error_key, %{} = details}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(Enroll.ErrorView)
    |> render(:error, error_key: error_key, details: details)
  end

  def call(conn, {:error, error_key, _reason}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(Enroll.ErrorView)
    |> render(:error, reason: error_key)
  end

  def call(conn, _) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(Enroll.ErrorView)
    |> render(:error, reason: :unprocessable_entity)
  end
end
