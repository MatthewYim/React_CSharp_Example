using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Think of DTOs as a filtered version of something submitted or retrieved, rather than the whole object
// we return a more filtered object --> Here we don't want comments, so we remove that

namespace api.Dtos.Stock
{
    public class StockDto
    {
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public decimal Purchase { get; set; }
        public decimal LastDiv { get; set; }
        public string Industry { get; set; } = string.Empty;
        public long MarketCap { get; set; }
    }
}