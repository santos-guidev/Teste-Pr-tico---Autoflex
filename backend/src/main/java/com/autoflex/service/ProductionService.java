package com.autoflex.service;

import com.autoflex.dto.ProductionSuggestionDTO;
import com.autoflex.entity.Product;
import com.autoflex.entity.ProductMaterial;
import com.autoflex.entity.RawMaterial;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductionService {

    public ProductionSuggestionDTO suggestProduction() {
        // Get all products sorted by price descending
        List<Product> products = Product.listAll();
        products.sort((p1, p2) -> p2.price.compareTo(p1.price));

        // Map to keep track of remaining stock during simulation
        Map<Long, Double> currentStock = RawMaterial.<RawMaterial>listAll().stream()
                .collect(Collectors.toMap(m -> m.id, m -> m.stockQuantity));

        List<ProductionSuggestionDTO.ProductProduction> suggested = new ArrayList<>();
        double totalValue = 0.0;

        for (Product product : products) {
            if (product.materials.isEmpty()) continue;

            int possibleQuantity = Integer.MAX_VALUE;
            
            // Check how many of this product can be produced
            for (ProductMaterial pm : product.materials) {
                double stock = currentStock.getOrDefault(pm.rawMaterial.id, 0.0);
                int canMake = (int) (stock / pm.quantityNeeded);
                if (canMake < possibleQuantity) {
                    possibleQuantity = canMake;
                }
            }

            if (possibleQuantity > 0) {
                // Deduct from stock
                for (ProductMaterial pm : product.materials) {
                    double used = possibleQuantity * pm.quantityNeeded;
                    currentStock.put(pm.rawMaterial.id, currentStock.get(pm.rawMaterial.id) - used);
                }
                
                ProductionSuggestionDTO.ProductProduction pp = new ProductionSuggestionDTO.ProductProduction(
                        product.name, possibleQuantity, product.price);
                suggested.add(pp);
                totalValue += pp.subtotal;
            }
        }

        ProductionSuggestionDTO dto = new ProductionSuggestionDTO();
        dto.suggestedProducts = suggested;
        dto.totalValue = totalValue;
        return dto;
    }
}
