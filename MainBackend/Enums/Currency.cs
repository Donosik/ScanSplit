namespace MainBackend.Enums;

    public enum Currency
    {
        USD,
        EUR,
        GBP,
        PLN,
        JPY
    }

    public static class CurrencyExtensions
    {
        private static readonly Dictionary<Currency, string> CurrencyNames = new Dictionary<Currency, string>
        {
            { Currency.USD, "USD" },
            { Currency.EUR, "EUR" },
            { Currency.GBP, "GBP" },
            { Currency.PLN, "PLN" },
            { Currency.JPY, "JPY" }
        };

        public static string ToStringValue(this Currency currency)
        {
            return CurrencyNames[currency];
        }

        public static List<KeyValuePair<string, string>> GetAllCurrencies()
        {
            return CurrencyNames.Select(c => new KeyValuePair<string, string>(c.Key.ToString(), c.Value)).ToList();
        }
    }
