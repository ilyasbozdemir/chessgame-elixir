import Config

# Configure your database
config :chess_realtime_server, ChessRealtimeServer.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "chess_realtime_server_dev",
  stacktrace: true,
  show_sensitive_data_on_connection_error: true,
  pool_size: 10

# ... (middle part remains same)

# ExAws configuration for MinIO
config :ex_aws,
  access_key_id: "minioadmin",
  secret_access_key: "minioadmin",
  region: "us-east-1",
  s3: [
    scheme: "http://",
    host: "localhost",
    port: 9000,
    region: "us-east-1"
  ]

# Joken configuration for GoTrue JWT verification
config :joken, default_signer: "super-secret-jwt-key-replace-me-in-prod"

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime

# Disable swoosh api client as it is only required for production adapters.
config :swoosh, :api_client, false
