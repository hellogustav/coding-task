defmodule Enroll.Router do
  use Enroll.Web, :router

  # PIPELINES
  # ---------

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)

    plug(:put_secure_browser_headers, %{
      "strict-transport-security" => "max-age=31536000",
      "content-security-policy" => "default-src * data: 'unsafe-eval' 'unsafe-inline' blob:",
      "referrer-policy" => "strict-origin-when-cross-origin",
      "feature-policy" => "camera 'none', microphone 'none'"
    })
  end

  pipeline :api do
    plug(:accepts, ["json"])
    plug(Enroll.Web.Plugs.Locale)
  end

  pipeline :fetch_auth_token do
    plug(Enroll.Guardian.FetchAuthToken)
  end

  pipeline :authorization do
    plug(Enroll.Guardian.AuthPipeline)
  end

  # ROUTES
  # ------

  scope "/api/v1", Enroll do
    pipe_through(:api)

    # Non-Authenticated API Routes
    scope "/" do
      post("/sessions", SessionController, :create)
    end

    scope "/" do
      pipe_through(:fetch_auth_token)

      delete("/sessions", SessionController, :delete)
    end

    # Authenticated API Routes

    scope "/" do
      pipe_through(:authorization)

      get("/current_session", CurrentSessionController, :show)

      scope "/company", Company, as: :company do
        resources("/members", MemberController, only: [:create, :update, :index, :delete])

        scope "/members" do
          get("/:id/resend_invite", MemberController, :resend_invite)
        end
      end
    end
  end

  # Web App Routes

  scope "/", Enroll do
    # Use the default browser stack
    pipe_through(:browser)
    forward("/", Web.Plugs.StaticIndex)
  end
end
