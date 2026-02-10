package com.autoflex.dto;

import java.util.List;

public class ProductionSuggestionDTO {
    public List<ProductProduction> suggestedProducts;
    public Double totalValue;

    public static class ProductProduction {
        public String productName;
        public Integer quantity;
        public Double unitPrice;
        public Double subtotal;

        public ProductProduction(String productName, Integer quantity, Double unitPrice) {
            this.productName = productName;
            this.quantity = quantity;
            this.unitPrice = unitPrice;
            this.subtotal = quantity * unitPrice;
        }
    }
}
