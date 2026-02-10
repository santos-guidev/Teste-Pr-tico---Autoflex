package com.autoflex.resource;

import com.autoflex.entity.Product;
import com.autoflex.entity.ProductMaterial;
import com.autoflex.entity.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @GET
    public List<Product> listAll() {
        return Product.listAll();
    }

    @GET
    @Path("/{id}")
    public Product get(@PathParam("id") Long id) {
        return Product.findById(id);
    }

    @POST
    @Transactional
    public Response create(Product product) {
        product.persist();
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Product update(@PathParam("id") Long id, Product product) {
        Product entity = Product.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }
        entity.name = product.name;
        entity.price = product.price;
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        Product entity = Product.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }
        entity.delete();
    }

    @POST
    @Path("/{productId}/materials")
    @Transactional
    public Response addMaterial(@PathParam("productId") Long productId, ProductMaterial association) {
        Product product = Product.findById(productId);
        RawMaterial material = RawMaterial.findById(association.rawMaterial.id);
        
        if (product == null || material == null) {
            throw new NotFoundException("Product or Material not found");
        }

        association.product = product;
        association.rawMaterial = material;
        association.persist();
        
        return Response.status(Response.Status.CREATED).entity(association).build();
    }
}
