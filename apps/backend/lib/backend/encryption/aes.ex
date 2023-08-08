defmodule Enroll.Encryption.AES do
  @mode "AES256GCM"
  @block_size 16

  def encrypt(plaintext) do
    iv = :crypto.strong_rand_bytes(16)
    key = get_key()

    {ciphertext, tag} =
      :crypto.crypto_one_time_aead(:aes_256_gcm, key, iv, pad(plaintext), @mode, 16, true)

    iv <> tag <> ciphertext
  end

  def decrypt(ciphertext) do
    <<iv::binary-16, tag::binary-16, ciphertext::binary>> = ciphertext

    padded_plaintext =
      :crypto.crypto_one_time_aead(:aes_256_gcm, get_key(), iv, ciphertext, @mode, tag, false)

    unpad(padded_plaintext)
  end

  defp pad(data) do
    to_add = @block_size - rem(byte_size(data), @block_size)
    data <> to_string(:string.chars(to_add, to_add))
  end

  defp unpad(data) do
    to_remove = :binary.last(data)
    :binary.part(data, 0, byte_size(data) - to_remove)
  end

  defp get_key do
    Application.get_env(:backend, __MODULE__)
    |> Keyword.get(:encryption_key)
    |> :base64.decode()
  end
end
