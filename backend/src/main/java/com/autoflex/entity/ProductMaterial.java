package com.autoflex.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "product_materials")
public class ProductMaterial extends PanacheEntity {
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    public Product product;

    @ManyToOne
    @JoinColumn(name = "raw_material_id")
    public RawMaterial rawMaterial;

    public Double quantityNeeded;
}
