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
            { Currency.USD, "United States Dollar" },
            { Currency.EUR, "Euro" },
            { Currency.GBP, "British Pound" },
            { Currency.PLN, "Polish Zloty" },
            { Currency.JPY, "Japanese Yen" }
        };

        public static List<KeyValuePair<string, string>> GetAllCurrencies()
        {
            return CurrencyNames.Select(c => new KeyValuePair<string, string>(c.Key.ToString(), c.Value)).ToList();
        }
    }
