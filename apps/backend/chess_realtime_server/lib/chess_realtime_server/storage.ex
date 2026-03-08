defmodule ChessRealtimeServer.Storage do
  @doc "Uploads a file to MinIO"
  def upload_avatar(user_id, binary_data, filename) do
    bucket = "avatars"
    path = "user_#{user_id}/#{filename}"
    
    ExAws.S3.put_object(bucket, path, binary_data)
    |> ExAws.request()
    
    # Return URL (MinIO public)
    "http://localhost:9000/#{bucket}/#{path}"
  end
end
