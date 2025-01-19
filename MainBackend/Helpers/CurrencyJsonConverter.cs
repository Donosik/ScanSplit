using System.Text.Json;
using System.Text.Json.Serialization;
using MainBackend.Enums;

namespace MainBackend.Helpers;

public class CurrencyJsonConverter :JsonConverter<Currency>
{
    public override Currency Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (Enum.TryParse(typeof(Currency), reader.GetString(), true, out var result))
        {
            return (Currency)result;
        }
        throw new JsonException($"Unable to convert \"{reader.GetString()}\" to {nameof(Currency)}.");
    }

    public override void Write(Utf8JsonWriter writer, Currency value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}